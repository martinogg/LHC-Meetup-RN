import React, { Component } from 'react';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'
import { Image, KeyboardAvoidingView } from 'react-native';

import { AppStyles } from '../../AppStyles'
import LoginForm from '../../Components/LoginForm/LoginForm';
import FirebaseConnection from '../../Helpers/FirebaseConnection'

interface Props {
    navigation: NavigationScreenProp<any, any>,
    screenProps: {
        firebaseConnection: FirebaseConnection
    }
}

export class RegisterScreen extends Component<Props> {
    public render() {
        //<Image resizeMode="contain" style={styles.logo} source={require('../../components/images/logo-dark-bg.png')} />
        return (
            <KeyboardAvoidingView behavior="padding" style={AppStyles.container}>
                <View style={styles.loginContainer}>

                </View>
                <View style={styles.formContainer}>
                    <LoginForm onLoginCallback={(username, password) => this.register(username, password)} actionButtonText='REGISTER' />
                </View>
                <Button title="Edit Screen"
                    onPress={() => this.goToEditScreen()}
                />
            </KeyboardAvoidingView>
        );
    }

    private register(username: string, password: string) {

        this.props.screenProps.firebaseConnection.register(username, password).then(() => {

            this.showAlert('Registration OK!');
            if (this.props.screenProps.firebaseConnection.isLoggedIn()) {

                this.goToHomeScreen()
            }
        }, (fail) => {

            this.showAlert('Registration Fail. Reason: ' + fail);
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