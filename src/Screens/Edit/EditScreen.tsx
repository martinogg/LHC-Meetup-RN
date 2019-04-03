import React, { Component } from 'react';
import { Button, Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Alert } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import { IUser, User } from '../../Helpers/UserStruct'

interface IProps {
    navigation: NavigationScreenProp<any, any>,
    screenProps: {
        firebaseConnection: FirebaseConnection
    }
}

interface IState {
    userName: string,
    userLocation: string,
    userContact: string,
    userInterests: string,
}

export class EditScreen extends Component<IProps, IState> {

    constructor(props: IProps) {
        
        super(props);
        this.state = {
            userName: '',
            userLocation: '',
            userContact: '',
            userInterests: ''
        };
    }

    componentDidMount() {

        this.props.screenProps.firebaseConnection.loadUserDetails().then((user) => {

            this.setState({
                userName: user.userName,
                userLocation: user.userLocation,
                userContact: user.userContact,
                userInterests: user.userInterests
            })
        }, (error) => {

            Alert.alert('error: ' + error)
        })
    }

    saveButtonPressed() {
        
        this.props.screenProps.firebaseConnection.saveUserDetails(User.create(this.state.userName, this.state.userLocation, this.state.userContact, this.state.userInterests)).then( ()=> {

            this.props.navigation.dispatch(
                StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })]
                })
            )
        }, (error) => { 

            Alert.alert('Save Error: '+error)
        })

        
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
        // TODO - Get rid of this
        this.props.screenProps.firebaseConnection.fbTest()
    }

    public render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.loginContainer}>


                </View>

                <View style={styles.entriesContainer}>
                    <TextInput style={styles.input}
                        ref={(name) => this.nameInput = name}
                        autoCapitalize="none"
                        onSubmitEditing={() => this.locationInput.focus()}
                        autoCorrect={false}
                        keyboardType='default'
                        returnKeyType="next"
                        placeholder='Name'
                        value={this.state.userName}
                        placeholderTextColor='rgba(225,225,225,0.7)'
                        onChangeText={(text) => this.handleNameChange(text)}
                    />

                    <TextInput style={styles.input}
                        ref={(location) => this.locationInput = location}
                        autoCapitalize="none"
                        onSubmitEditing={() => this.contactInput.focus()}
                        autoCorrect={false}
                        keyboardType='default'
                        returnKeyType="next"
                        placeholder='Location'
                        value={this.state.userLocation}
                        placeholderTextColor='rgba(225,225,225,0.7)'
                        onChangeText={(text) => this.handleLocationChange(text)}
                    />

                    <TextInput style={styles.input}
                        ref={(contact) => this.contactInput = contact}
                        autoCapitalize="none"
                        onSubmitEditing={() => this.interestsInput.focus()}
                        autoCorrect={false}
                        keyboardType='default'
                        returnKeyType="next"
                        value={this.state.userContact}
                        placeholder='Contact: Skype or phone number'
                        placeholderTextColor='rgba(225,225,225,0.7)'
                        onChangeText={(text) => this.handleContactChange(text)}
                    />

                    <TextInput style={styles.input}
                        ref={(interests) => this.interestsInput = interests}
                        autoCapitalize="none"
                        onSubmitEditing={Keyboard.dismiss}
                        autoCorrect={false}
                        keyboardType='default'
                        returnKeyType="next"
                        placeholder='Interests'
                        value={this.state.userInterests}
                        placeholderTextColor='rgba(225,225,225,0.7)'
                        onChangeText={(text) => this.handleInterestsChange(text)}
                    />
                </View>

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


            </KeyboardAvoidingView>
        );
    }

    private nameInput: any
    private locationInput: any
    private contactInput: any
    private interestsInput: any

    private handleNameChange(text: string) {

        this.setState({ userName: text })
    }

    private handleLocationChange(text: string) {

        this.setState({ userLocation: text })
    }

    private handleContactChange(text: string) {

        this.setState({ userContact: text })
    }

    private handleInterestsChange(text: string) {

        this.setState({ userInterests: text })
    }
}

const styles = StyleSheet.create({
    entriesContainer: {
        padding: 20
    },
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
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    }
})