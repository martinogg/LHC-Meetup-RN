import React, { Component } from 'react'
import { Alert, Button, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'

import { AppStyles } from '../../AppStyles'

import LoginForm from '../../Components/LoginForm/LoginForm'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import LHCButton from '../../Components/LHCButton/LHCButton'

interface IProps {
    navigation: NavigationScreenProp<any, any>,
    screenProps: {
        firebaseConnection: FirebaseConnection
    }
}

export class LoginScreen extends Component<IProps> {

    componentDidMount() {
        // TODO TEST
        setTimeout(() => {
            
            this.proceedToLoginIfLoggedIn()
        }, 500);
        
    }

    static navigationOptions = {
        title: 'Lets Have Coffee',
    };

    public render() {
        //<Image resizeMode="contain" style={styles.logo} source={require('../../components/images/logo-dark-bg.png')} />
        return (
            <KeyboardAvoidingView behavior="padding" style={AppStyles.container}>

                <View style={styles.loginContainer}>
                    <Text style={[AppStyles.buttonText, { fontSize: 20 }]}>Lets Have Coffee aims to co-ordinate people so they can meet one-on-one in real life for informal discussions about their shared interests</Text>

                </View>
                <View style={styles.formContainer}>
                    <LoginForm onLoginCallback={(username, password) => this.login(username, password)} actionButtonText='LOGIN' />
                </View>
                <LHCButton onSelected={() => { this.props.navigation.navigate('Register') }}>
                    <Text style={AppStyles.buttonText}>CREATE NEW ACCOUNT</Text>
                </LHCButton>

            </KeyboardAvoidingView>
        );
    }

    private proceedToLoginIfLoggedIn() {
        // TODO TEST
        if (this.props.screenProps.firebaseConnection.isLoggedIn()) {

            this.goToHomeScreen()
        }
    }

    private login(username: string, password: string) {

        this.props.screenProps.firebaseConnection.login(username, password).then(() => {

            this.proceedToLoginIfLoggedIn()
        }, (fail) => {

            this.showAlert('Login Fail. ' + fail);
        })
    }

    private showAlert(message: string) {

        Alert.alert(message);
    }

    private goToHomeScreen() {

        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })]
            })
        )
    }

}

const styles = StyleSheet.create({
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    title: {
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    }
})