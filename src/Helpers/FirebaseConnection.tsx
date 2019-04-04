// TODO Refactor this mess and get some tests done

'use strict'
import React from 'react';
import {
  Alert,
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import BuildSettings from './BuildSettings';

import { IUser, User, IUserFromFirebase } from './UserStruct'

var instance: FirebaseConnection | null = null;

class FirebaseConnection {
  firebaseApp: firebase.app.App | null = null;

  static getInstance(): FirebaseConnection {
    if (instance) {
      return instance;
    } else {
      instance = new FirebaseConnection();
      instance.initApp();
      return instance;
    }
  }

  initApp() {
    var firebaseConfig = {
      apiKey: BuildSettings.get("FIREBASEapiKey"),
      authDomain: BuildSettings.get("FIREBASEauthDomain"),
      databaseURL: BuildSettings.get("FIREBASEdatabaseURL"),
      storageBucket: BuildSettings.get("FIREBASEstorageBucket"),
      projectId: BuildSettings.get("FIREBASEprojectId")
    };

    if (firebaseConfig.apiKey != "") {
      this.firebaseApp = firebase.initializeApp(firebaseConfig);
    }
  }

  getProperties(obj, count) {
    if (isNaN(count)) count = Infinity
    var keys = []
    for (var it in obj) {
      if (keys.length > count) break;
      keys.push(it);
    }
    return keys;
  }

  public logout(): Promise<void> {

    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(() => {

        resolve()
      }, (failReason) => {

        Alert.alert('Error: ' + failReason)
        resolve()
      })
    })
  }

  public saveUserDetails(user: IUser): Promise<string> {
    // TODO TEST
    return new Promise<string>((resolve, reject) => {

      if (firebase.auth().currentUser != null) {
        const currentUser = firebase.auth().currentUser as firebase.User

        firebase.firestore().collection("LHC-Users").doc(currentUser.uid).set({
          name: user.userName,
          location: user.userLocation,
          contact: user.userContact,
          interests: user.userInterests,
        })
          .then(() => {

            resolve()
          })
          .catch(function (error) {

            reject(error)
          });

      } else {

        reject('User Not Logged in')
      }
    })
  }

  public searchOtherUsers(): Promise<IUserFromFirebase[]> {
    // TODO TEST
    return new Promise<IUserFromFirebase[]>((resolve, reject) => {

      if (firebase.auth().currentUser != null) {
        const currentUser = firebase.auth().currentUser as firebase.User

        firebase.firestore().collection("LHC-Users").get()
          .then((snap) => {

            let ret: IUserFromFirebase[] = []

            snap.forEach(userInList => {

              const id = userInList.id
              const data = userInList.data()
              if (data != null && id != currentUser.uid) {
                
                const user = User.create(data.name, data.location, data.contact, data.interests)
                ret.push({id: id, user: user})                
              } 

            });

            resolve(ret)
          })
          .catch(function (error) {

            reject(error)
          });

      } else {

        reject('User Not Logged in')
      }
    })

  }

  public loadUserDetails(): Promise<IUser> {
    // TODO TEST
    return new Promise<IUser>((resolve, reject) => {

      if (firebase.auth().currentUser != null) {
        const currentUser = firebase.auth().currentUser as firebase.User

        firebase.firestore().collection("LHC-Users").doc(currentUser.uid).get()
          .then((snap) => {

            const data = snap.data()
            if (data != null) {
              const user = User.create(data.name, data.location, data.contact, data.interests)

              resolve(user)
            } else {
              reject('An Error Occurred')
            }
          })
          .catch(function (error) {

            reject(error)
          });

      } else {

        reject('User Not Logged in')
      }
    })
  }

  public login(username: string, password: string): Promise<string> {
    // TODO TEST

    return new Promise((resolve, reject) => {

      firebase.auth().signInWithEmailAndPassword(username, password).then(() => {

        resolve()
      }, (reason) => {

        reject(reason)
      })
    })
  }

  public register(username: string, password: string): Promise<string> {
    // TODO TEST

    return new Promise((resolve, reject) => {

      firebase.auth().createUserWithEmailAndPassword(username, password).then(() => {


        // TODO - Shift this out in to separate email verification
        /*
        if (this.isLoggedIn()) {
  
          firebase.auth().currentUser.sendEmailVerification()
        }
        */

        resolve()
      }, (reason) => {
        reject(reason)
      })
    })
  }

  public isLoggedIn(): boolean {
    // TODO TEST

    return firebase.auth().currentUser != null
  }

  loginAnon() {
    let strongThis = this;
    if (this.firebaseApp != null) {
      firebase.auth().signInAnonymously().catch((error) => { });
    }
  }

  // only allows callback if user is actually logged in
  _getCurrentUser(onGetCurrentUserFunc) {

    if (this.firebaseApp != null) {

      var currentUser = firebase.auth().currentUser;
      if (currentUser) {

        onGetCurrentUserFunc(currentUser);
      } else {

        // try again just in case user is back online
        this.loginAnon();
      }
    }
  }

  getLikeWithId(idStr, callback) {
    this._getCurrentUser((currentUser) => {
      var ref = this.firebaseApp.database().ref().child("users").child("" + currentUser.uid).child("actions").child("likes").child(idStr);
      ref.once('value', (snap) => {
        var isSet = snap.val() === true;
        callback(isSet);
      });
    });
  }

  toggleLikeWithId(idStr, callback) {
    this._getCurrentUser((currentUser) => {
      var ref = this.firebaseApp.database().ref().child("users").child("" + currentUser.uid).child("actions").child("likes").child(idStr);

      ref.once('value', (snap) => {
        var alreadySet = snap.val() === true;
        var newSet = alreadySet ? null : true;
        ref.set(newSet).then(() => {
          callback(newSet);
        });
      });
    });
  }

  setViewedWithId(idStr, onCompleteFunc) {
    this._getCurrentUser((currentUser) => {
      var ref = this.firebaseApp.database().ref().child("users").child("" + currentUser.uid).child("actions").child("views").child(idStr);

      ref.set(true).then(() => {
        onCompleteFunc();
      });
    });
  }

  setLikeWithId(idStr, liked, onCompleteFunc) {
    this._getCurrentUser((currentUser) => {
      var ref = this.firebaseApp.database().ref().child("users").child("" + currentUser.uid).child("actions").child("likes").child(idStr);

      ref.set(liked ? true : null).then(() => {
        onCompleteFunc();
      });
    });
  }

  setDownloadedWithId(idStr) {
    this._getCurrentUser((currentUser) => {
      this.firebaseApp.database().ref().child("users").child("" + currentUser.uid).child("actions").child("downloads").child(idStr).set(true);
    });
  }

  getDbDecks(onCompleteFunc) {

    if (this.firebaseApp != null) {

      const strongThis = this;

      var itemsRef = this.firebaseApp.database().ref().child("data");

      itemsRef.once('value', (snap) => {

        // get children as an array
        var items = [];
        snap.forEach((child) => {
          items.push(child);
        });
        onCompleteFunc(items);
      });
    }
  }

  getDbDictLikes(onCompleteFunc) {

    if (this.firebaseApp != null) {
      const strongThis = this;

      var itemsRef = this.firebaseApp.database().ref().child("data");

      itemsRef.once('value', (snap) => {

        // get children as an array
        var items = {};
        snap.forEach((child) => {
          var likesCount = 0 + child.val().likes;
          var viewsCount = 0 + child.val().views;
          items["" + child.key] = { likes: likesCount, views: viewsCount };
        });
        onCompleteFunc(items);
      });
    }
  }



  alert(message) {
    Alert.alert(
      'Error',
      'Error:' + message,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  }

}

export default FirebaseConnection;