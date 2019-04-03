import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

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

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.loginButtonPress()}>
                    <Text style={styles.buttonText}>{this.props.actionButtonText}</Text>
                </TouchableOpacity>
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
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    loginButton: {
        backgroundColor: '#2980b6',
        color: '#fff'
    }

});

export default LoginForm;