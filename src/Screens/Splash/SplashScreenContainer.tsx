import React, { Component } from 'react';
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'

import SplashScreen from './SplashScreenComponent'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import {autoLogin} from '../../Store/Session/actions'

interface IProps {
    navigation: NavigationScreenProp<any, any>,
    screenProps: {
        firebaseConnection: FirebaseConnection
    }
}

class SplashScreenContainer extends Component<IProps> {

    componentDidMount() {
        // TODO TEST -- needs to wait a bit after app loads to let fb actually log in
        setTimeout(() => {

            this.props.autoLogin()
            
            //this.proceedToLoginIfLoggedIn()
        }, 1000);
    }

    render() {

        return (
            <SplashScreen />
        )
    }

    private proceedToLoginIfLoggedIn() {

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


    private goToScreen(screenName: string) {

        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: screenName })]
            })
        )
    }
}

const mapDispatchToProps = {
    autoLogin: autoLogin
}

export default connect(null, mapDispatchToProps)(SplashScreenContainer)