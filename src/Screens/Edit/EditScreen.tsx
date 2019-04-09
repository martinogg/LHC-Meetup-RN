import React, { Component } from 'react';
import { Button, Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Alert } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import { IUser, User } from '../../Helpers/UserStruct'
import { AppStyles } from '../../AppStyles'
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

    public render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={AppStyles.container}>

                <View style={styles.loginContainer}>


                </View>

                <View style={styles.entriesContainer}>
                    <TextInput style={AppStyles.input}
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

                    <TextInput style={AppStyles.input}
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

                    <TextInput style={AppStyles.input}
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

                    <TextInput style={AppStyles.input}
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