import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar } from 'react-native';
import LHCButton from '../LHCButton/LHCButton'
import { AppStyles } from '../../AppStyles'

interface IProps {
    onLoginCallback(username: string, password: string): void,
    actionButtonText: string
}

interface IState {
    username: string,
    password: string
}

class LoginForm extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    
    public render() {
        return (
            <View style={styles.container}>
                
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType="next"
                    placeholder='Email'
                    placeholderTextColor='rgba(225,225,225,0.7)'
                    onChangeText={(text) => this.handleUsernameChange(text)}
                />

                <TextInput style={styles.input}
                    returnKeyType="go" ref={(input) => this.passwordInput = input}
                    placeholder='Password'
                    placeholderTextColor='rgba(225,225,225,0.7)'
                    secureTextEntry
                    onSubmitEditing={() => this.loginButtonPress()}
                    onChangeText={(text) => this.handlePasswordChange(text)}
                />

                <LHCButton onSelected={() => this.loginButtonPress()}>
                    <Text style={AppStyles.buttonText}>{this.props.actionButtonText}</Text>
                </LHCButton>
            </View>
        );
    }

    private handleUsernameChange(text: string) {
        
        this.setState({ username: text })
    }

    private handlePasswordChange(text: string) {
        
        this.setState({ password: text })
    }

    private passwordInput: any

    private loginButtonPress() {

        this.props.onLoginCallback(this.state.username, this.state.password)
    };
}

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    loginButton: {
        backgroundColor: '#2980b6',
        color: '#fff'
    }

});

export default LoginForm;