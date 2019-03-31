import React, { Component } from 'react'
import { Alert, Button, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'

import LoginForm from '../Register/LoginForm'
import FirebaseConnection from '../../Helpers/FirebaseConnection'


interface IProps {
    navigation: NavigationScreenProp<any, any>,
    screenProps: { 
        firebaseConnection: FirebaseConnection
    }
}

export class LoginScreen extends Component<IProps> {
    public render() {
        //<Image resizeMode="contain" style={styles.logo} source={require('../../components/images/logo-dark-bg.png')} />
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.loginContainer}>


                </View>
                <View style={styles.formContainer}>
                    <LoginForm onLoginCallback={(username, password) => this.login(username, password)} actionButtonText='LOGIN' />
                </View>
                <Button title="Register"
                    onPress={() => this.props.navigation.navigate('Register')}
                />
                <Button title="Home Screen"
                    onPress={() => this.goToHomeScreen()} 
                />
                <Button title="EditDetails Screen"
                    onPress={() => this.goToEditScreen()} 
                />


            </KeyboardAvoidingView>
        );
    }

    private login(username: string, password: string) {

        this.props.screenProps.firebaseConnection.login(username, password).then(() => {

            if (this.props.screenProps.firebaseConnection.isLoggedIn()) {

                this.goToHomeScreen()
            }
        }, (fail) => {

            this.showAlert('Login Fail. ' + fail);
        })
    }

    private showAlert(message: string) {

        Alert.alert(message);
    }

    private goToEditScreen() {

        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'EditDetails' })]
            })
        )
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
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
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