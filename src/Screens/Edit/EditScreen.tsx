import React, { Component } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'
import FirebaseConnection from '../../Helpers/FirebaseConnection'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

interface Props { navigation: NavigationScreenProp<any, any>,
    screenProps: { 
        firebaseConnection: FirebaseConnection
    } }


export class EditScreen extends Component<Props> {

    saveButtonPressed() { 
        // TODO save should go to home screen, removing editscreen from stack
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })]
            })
        )    
    }

    cancelButtonPressed() { 
        // TODO cancel should go home, only if details were previously added
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })]
            })
        )
    }

    logoutButtonPressed() { 
        this.props.screenProps.firebaseConnection.logout().then(() => { 

            this.props.navigation.dispatch(
                StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Login' })]
                })
            )    
        })
    }

    private fbTestButtonPressed() {
        this.props.screenProps.firebaseConnection.fbTest()
    }

    public render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to EDIT DETIALS!</Text>
                <Text style={styles.instructions}>To get started, edit App.tsx</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                <Button title="Save"
                    onPress={() => this.saveButtonPressed()}
                />
                <Button title="Cancel"
                    onPress={() => this.cancelButtonPressed()}
                />
                <Button title="Logout"
                    onPress={() => this.logoutButtonPressed()}
                />
                <Button title="Write FB Data Test"
                    onPress={() => this.fbTestButtonPressed()}
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
