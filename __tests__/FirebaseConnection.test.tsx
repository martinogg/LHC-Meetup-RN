import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import { Alert, Button } from 'react-native'

import { HomeScreen } from '../src/Screens/Home/HomeScreen';
import FirebaseConnection from '../src/Helpers/FirebaseConnection'

import * as firebase from 'firebase';
import 'firebase/firestore';


test('FirebaseConnection Should initialise only one instance', () => {


    expect(FirebaseConnection.getInstance()).toBe(FirebaseConnection.getInstance())
})

test('Logout func Success', async () => {

    jest.resetAllMocks()

    firebase.auth = jest.fn().mockReturnValue({

        signOut: () => {

            return new Promise((resolve, reject) => {

                resolve()
            })
        }
    })

    const logoutSuccess = jest.fn()

    await FirebaseConnection.getInstance().logout().then(() => {

        logoutSuccess()
    }, (fail) => {

        expect(1).toEqual(2) //should not reach here
    })

    expect(logoutSuccess).toHaveBeenCalledTimes(1)
})

test('Logout func Fail', async () => {

    jest.resetAllMocks()

    jest.mock('Alert', () => {
        return {
            alert: jest.fn()
        }
    });

    firebase.auth = jest.fn().mockReturnValue({

        signOut: () => {

            return new Promise((resolve, reject) => {

                reject('aReason')
            })
        }
    })

    const logoutSuccess = jest.fn()

    await FirebaseConnection.getInstance().logout().then(() => {

        logoutSuccess()
    })

    expect(logoutSuccess).toHaveBeenCalledTimes(1)
    expect(Alert.alert).toHaveBeenCalledTimes(1)
    expect(Alert.alert).toHaveBeenCalledWith('Error: aReason')
})