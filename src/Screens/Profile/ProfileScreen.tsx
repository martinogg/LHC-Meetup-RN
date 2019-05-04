import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Alert, SafeAreaView, FlatList } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import { IUser, User, IUserInterest, UserInterest, IUserFromFirebase } from '../../Helpers/UserStruct'
import LHCButton from '../../Components/LHCButton/LHCButton'
import { AppStyles } from '../../AppStyles'

interface IProps {
    navigation: NavigationScreenProp<any, any>,
    screenProps: {
        firebaseConnection: FirebaseConnection
    }
}

interface IState {
    userID: string,
    userName: string,
    userLocation: string,
    userContact: string,
    userInterests: IUserInterest[]
}

export class ProfileScreen extends Component<IProps, IState> {

    private static navigationOptions = {
        title: 'Profile',
    };

    constructor(props: IProps) {

        super(props);
        this.state = {
            userID: '',
            userName: '',
            userLocation: '',
            userContact: '',
            userInterests: []
        };
    }

    private loadUserProfile() {

        this.props.screenProps.firebaseConnection.loadUserDetails().then((snapshot) => {

            const user: IUser = snapshot

            this.setState({
                userID: '',
                userName: user.userName,
                userLocation: user.userLocation,
                userContact: user.userContact,
                userInterests: user.userInterests
            })
        }, (error) => {

            Alert.alert('error: ' + error)
        })
    }

    private loadParamsSpecifiedProfile() {

        const userFromFB: IUserFromFirebase = this.props.navigation.state.params.profile

        this.setState({
            userID: userFromFB.id,
            userName: userFromFB.user.userName,
            userLocation: userFromFB.user.userLocation,
            userContact: userFromFB.user.userContact,
            userInterests: userFromFB.user.userInterests
        })
    }

    componentDidMount() {

        const isEditable = this.props.navigation.state.params.editable

        if (isEditable) {

            this.loadUserProfile()
        }
        else {

            this.loadParamsSpecifiedProfile()
        }

    }

    private addInterestButtonPressed() {

        const currentInterests = this.state.userInterests
        const newInterest = UserInterest.create('', '')
        const newInterests = [newInterest, ...currentInterests]
        this.setState({ userInterests: newInterests })
    }

    private saveButtonPressed() {

        this.props.screenProps.firebaseConnection.saveUserDetails(User.create(this.state.userName, this.state.userLocation, this.state.userContact, this.state.userInterests)).then(() => {

            this.props.navigation.pop()
        }, (error) => {

            Alert.alert('Save Error: ' + error)
        })
    }

    private logoutButtonPressed() {
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

        const isEditable = this.props.navigation.state.params.editable

        this.props.navigation.push('Interest', {
            editable: isEditable,
            previousUserInterest: interest,
            saveCallback: (newInterest: IUserInterest) => {

                interest.title = newInterest.title
                interest.description = newInterest.description
                this.setState({})
            },
            removeCallback: () => {

                const newInterests = this.state.userInterests.filter((interestElement) => { return interestElement != interest })
                this.setState({ userInterests: newInterests })
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

    private inviteButtonPressed() {

        this.props.screenProps.firebaseConnection.loadUserDetails().then((snapshot) => {

            const user: IUser = snapshot
            const userID: string = this.props.screenProps.firebaseConnection.getCurrentUserID()
            const fromUserObject: IUserFromFirebase = { id: userID, user: user }
            const toUserObject: IUserFromFirebase = this.props.navigation.state.params.profile

            this.props.navigation.push('Invitation', { fromObject: fromUserObject, toObject: toUserObject, viewMode: 'New' })
        }, (error) => {

            Alert.alert('error: ' + error)
        })

    }

    private getRenderButtons(editable: boolean, invitable: boolean): JSX.Element | null {

        if (editable) {

            return <View>
                <LHCButton onSelected={() => this.saveButtonPressed()}>
                    <Text style={AppStyles.buttonText}>Save Changes</Text>
                </LHCButton>
                <LHCButton onSelected={() => this.logoutButtonPressed()}>
                    <Text style={AppStyles.buttonText}>Logout</Text>
                </LHCButton>
            </View>
        }
        else if (invitable) {

            return <LHCButton onSelected={() => this.inviteButtonPressed()}>
                <Text style={AppStyles.buttonText}>Invite</Text>
            </LHCButton>
        }

        return null;
    }

    getTitle(editable: boolean): JSX.Element | null {
        return editable ? <View style={styles.loginContainer}>
            <Text style={AppStyles.buttonText}>Add in your details so other people can find you</Text>
        </View> : null
    }

    private getEditItems(editable: boolean): JSX.Element[] {

        const contactInput = editable ? <TextInput style={AppStyles.input}
            ref={(contact) => this.contactInput = contact}
            autoCapitalize="none"
            editable={editable}
            autoCorrect={false}
            keyboardType='default'
            returnKeyType="next"
            value={this.state.userContact}
            placeholder='Contact: Skype or phone number'
            placeholderTextColor='rgba(225,225,225,0.7)'
            onChangeText={(text) => this.handleContactChange(text)}
        /> : null

        let ret =
            [<TextInput style={AppStyles.input}
                autoCapitalize="none"
                onSubmitEditing={() => this.locationInput.focus()}
                autoCorrect={false}
                editable={editable}
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
                editable={editable}
                onSubmitEditing={() => this.contactInput.focus()}
                autoCorrect={false}
                keyboardType='default'
                returnKeyType="next"
                placeholder='Location'
                value={this.state.userLocation}
                placeholderTextColor='rgba(225,225,225,0.7)'
                onChangeText={(text) => this.handleLocationChange(text)}
            />,

                contactInput, ...this.interestButtons(this.state.userInterests)
            ]

        if (editable == true) {

            ret.push(
                <LHCButton onSelected={() => this.addInterestButtonPressed()}>
                    <Text style={AppStyles.buttonText}>Add Interest</Text>
                </LHCButton>
            )
        }

        return ret
    }

    public render() {

        const editable = this.props.navigation.state.params.editable
        const invitable = this.props.navigation.state.params.invitable
        const lowerButtons = this.getRenderButtons(editable, invitable)
        const titleText = this.getTitle(editable)
        const editItems = this.getEditItems(editable)


        return (
            <SafeAreaView style={AppStyles.container}>
                {titleText}
                <View style={styles.entriesContainer}>
                    <FlatList
                        data={editItems}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => item}
                    />

                </View>
                {lowerButtons}

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