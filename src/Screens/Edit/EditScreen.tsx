import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Alert, SafeAreaView, FlatList } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import { IUser, User, IUserInterest, UserInterest } from '../../Helpers/UserStruct'
import LHCButton from '../../Components/LHCButton/LHCButton'
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
    userInterests: IUserInterest[],
}

export class EditScreen extends Component<IProps, IState> {

    private static navigationOptions = {
        title: 'Edit Profile',
    };

    constructor(props: IProps) {

        super(props);
        this.state = {
            userName: '',
            userLocation: '',
            userContact: '',
            userInterests: []
        };
    }

    componentDidMount() {

        this.props.screenProps.firebaseConnection.loadUserDetails().then((snapshot) => {

            const user: IUser = snapshot

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

    addInterestButtonPressed() {

        const currentInterests = this.state.userInterests
        const newInterest = UserInterest.create('', '')
        const newInterests = [newInterest, ...currentInterests]
        this.setState({ userInterests: newInterests })
    }

    saveButtonPressed() {

        this.props.screenProps.firebaseConnection.saveUserDetails(User.create(this.state.userName, this.state.userLocation, this.state.userContact, this.state.userInterests)).then(() => {

            this.props.navigation.pop()
        }, (error) => {

            Alert.alert('Save Error: ' + error)
        })
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

    private editInterest(interest: IUserInterest) {
        
        this.props.navigation.navigate('Interest', {
            previousUserInterest: interest,
            saveCallback: (newInterest: IUserInterest) => {

                interest.title = newInterest.title
                interest.description = newInterest.description
                this.setState({})
            },
            removeCallback: () => {

                const newInterests = this.state.userInterests.filter((interestElement) => { return interestElement != interest })
                this.setState({userInterests: newInterests})
            }
        })
    }

    private interestButtons(interests: IUserInterest[]) {

        let ret = []
        interests.forEach((element) => {

            const interest: IUserInterest = element
            const interestText = interest.title == '' ? 'Tap to Edit New Interest' : 'Interest: ' + interest.title
            ret.push(<LHCButton onSelected={() => { this.editInterest(element) }}>
                <Text style={AppStyles.buttonText}>{interestText}</Text>
                <Text style={AppStyles.buttonText}>{interest.description}</Text>
            </LHCButton>)
        });

        if (ret.length == 0) {

            ret.push(<LHCButton onSelected={() => { }}>
                <Text style={AppStyles.buttonText}>No Interests</Text>
            </LHCButton>)
        }

        return ret
    }

    public render() {

        const editItems = [<TextInput style={AppStyles.input}
            autoCapitalize="none"
            onSubmitEditing={() => this.locationInput.focus()}
            autoCorrect={false}
            keyboardType='default'
            returnKeyType="next"
            placeholder='Name'
            value={this.state.userName}
            placeholderTextColor='rgba(225,225,225,0.7)'
            onChangeText={(text) => this.handleNameChange(text)}
        />,

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
        />,

        <TextInput style={AppStyles.input}
            ref={(contact) => this.contactInput = contact}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='default'
            returnKeyType="next"
            value={this.state.userContact}
            placeholder='Contact: Skype or phone number'
            placeholderTextColor='rgba(225,225,225,0.7)'
            onChangeText={(text) => this.handleContactChange(text)}
        />, ...this.interestButtons(this.state.userInterests),
        <LHCButton onSelected={() => this.addInterestButtonPressed()}>
            <Text style={AppStyles.buttonText}>Add Interest</Text>
        </LHCButton>]

        return (
            <SafeAreaView style={AppStyles.container}>

                <View style={styles.loginContainer}>
                    <Text style={AppStyles.buttonText}>Add in your details so other people can find you</Text>
                </View>
                <View style={styles.entriesContainer}>
                    <FlatList
                        data={editItems}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => item}
                    />

                </View>

                <LHCButton onSelected={() => this.saveButtonPressed()}>
                    <Text style={AppStyles.buttonText}>Save Changes</Text>
                </LHCButton>

                <LHCButton onSelected={() => this.logoutButtonPressed()}>
                    <Text style={AppStyles.buttonText}>Logout</Text>
                </LHCButton>

            </SafeAreaView>
        );
    }

    private locationInput: any
    private contactInput: any

    private handleNameChange(text: string) {

        this.setState({ userName: text })
    }

    private handleLocationChange(text: string) {

        this.setState({ userLocation: text })
    }

    private handleContactChange(text: string) {

        this.setState({ userContact: text })
    }
}

const styles = StyleSheet.create({
    entriesContainer: {
        flex: 1,
        padding: 20
    },
    loginContainer: {
        alignItems: 'center',
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