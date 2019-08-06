import * as types from './actionTypes'
import {firebaseService} from '../../Helpers/FirebaseConnection'

/*
export const restoreSession = () => {
  return (dispatch: any) => {
    dispatch(sessionRestoring())

    let unsubscribe = firebaseService.auth()
      .onAuthStateChanged(user => {
        if (user) {
          dispatch(sessionSuccess(user))
          unsubscribe()
        } else {
          dispatch(sessionLogout())
          unsubscribe()
        }
      })
  }
}
*/

export const autoLogin = () => {
    return (dispatch: any) => {

        console.log('dddd autoLogin Call')
        // dddd do autologin here
        
        dispatch( )
        
        return firebaseService.auth().currentUser != null

        if (this.props.screenProps.firebaseConnection.isLoggedIn()) {

            this.props.screenProps.firebaseConnection.checkFBVersion().then((succeeded) => {

                if (succeeded) {

                    this.goToScreen('Home')
                }
                else {

                    Alert.alert('App is out of date. Please update before logging in')
                }
            }, (error) => {

                this.goToScreen('Login')
            })

        } else {

            this.goToScreen('Login')
        }
    }
}