import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, Button} from 'react-native'
import {NavigationScreenProp} from 'react-navigation'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props {navigation: NavigationScreenProp<any,any>}
export class LoginScreen extends Component<Props, object> {
    public render() {
    
    const {navigate} = this.props.navigation;

    return (
        <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Login Screen!</Text>
        <Text style={styles.instructions}>To get started, edit App.tsx</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button
                    title="Go to Jane's profile"
                    onPress={() => navigate('Register', { name: 'Jane' })}
                />
        </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    },
    welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    },
    instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    },
});
