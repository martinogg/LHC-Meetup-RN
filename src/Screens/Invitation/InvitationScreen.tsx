import React, { Component } from 'react';
import { Alert, Text, View, TextInput } from 'react-native';

import { AppStyles } from '../../AppStyles'
import { NavigationScreenProp } from 'react-navigation'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import { IInvitationFromFirebase, Invitation, InvitationStatus } from '../../Helpers/InvitationStruct'
import LHCButton from '../../Components/LHCButton/LHCButton'
import { IUserFromFirebase, User } from '../../Helpers/UserStruct';

interface Props {
    navigation: NavigationScreenProp<any, any>,
    screenProps: {
        firebaseConnection: FirebaseConnection
    }
}

interface State {
    reason: string,
    fromObject: IUserFromFirebase,
    toObject: IUserFromFirebase,
    status: string,
    uid: string,
    viewMode: string
}

export class InvitationScreen extends Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            reason: '',
            fromObject: { id: '', user: User.create('', '', '', []) },
            toObject: { id: '', user: User.create('', '', '', []) },
            uid: '',
            viewMode: '',
            status: ''
        }
    }

    private static navigationOptions = {
        title: 'Invitation',
    };

    public componentDidMount() {

        this.setState({
            fromObject: this.props.navigation.state.params.fromObject || this.state.fromObject,
            toObject: this.props.navigation.state.params.toObject || this.state.toObject,
            uid: this.props.navigation.state.params.uid || this.state.uid,
            reason: this.props.navigation.state.params.reason || this.state.reason,
            viewMode: this.props.navigation.state.params.viewMode || this.state.viewMode,
            status: this.props.navigation.state.params.status || this.state.status
        })
    }

    private handleCustomDescriptionChange(text: string) {

        this.setState({ reason: text })
    }

    private sendButtonPressed() {

        const invitation = Invitation.create(this.state.fromObject.id, this.state.toObject.id, this.state.reason, InvitationStatus.New)
        this.props.screenProps.firebaseConnection.createNewInvitation(invitation).then(() => {

            Alert.alert('new invite OK')
        }, (error) => {

            Alert.alert('new invite Error:' + error)
        })
    }

    private updateButtonPressed() {

        this.props.screenProps.firebaseConnection.updateInvitation(this.state.uid, this.state.reason).then(() => {

            Alert.alert('update invite OK')
        }, (error) => {

            Alert.alert('update invite Error:' + error)
        })

    }

    private sendResponse(response: InvitationStatus) {

        this.props.screenProps.firebaseConnection.updateInvitationResponse(this.state.uid, response).then(() => {

            Alert.alert('update invite response OK')
        }, (error) => {

            Alert.alert('update invite response Error:' + error)
        })
    }

    private acceptButtonPressed() {

        this.sendResponse(InvitationStatus.Accepted)
    }

    private rejectButtonPressed() {

        this.sendResponse(InvitationStatus.Rejected)
    }

    private deleteButtonPressed() {

        this.props.screenProps.firebaseConnection.deleteInvitation(this.state.uid).then(() => {

            Alert.alert('Invitation deleted OK')
        }, (error) => {

            Alert.alert('Invitation delete Error:' + error)
        })
    }

    private buttonButtons(viewMode: string): JSX.Element {

        let ret: JSX.Element = <View></View>

        switch (viewMode) {
            case 'New':
                ret = <LHCButton onSelected={() => { this.sendButtonPressed() }}>
                    <Text style={AppStyles.buttonText}>Create Invitation</Text>
                </LHCButton>
                break;
            case 'Edit':
                ret = <View>
                    <LHCButton onSelected={() => { this.updateButtonPressed() }}>
                        <Text style={AppStyles.buttonText}>Update Invitation</Text>
                    </LHCButton>
                    <LHCButton onSelected={() => { this.deleteButtonPressed() }}>
                        <Text style={AppStyles.buttonText}>Delete Invitation</Text>
                    </LHCButton>
                </View>
                break;
            case 'Reply':
                ret = <View>
                    <LHCButton onSelected={() => { this.acceptButtonPressed() }}>
                        <Text style={AppStyles.buttonText}>Accept Invitation</Text>
                    </LHCButton>
                    <LHCButton onSelected={() => { this.rejectButtonPressed() }}>
                        <Text style={AppStyles.buttonText}>Reject Invitation</Text>
                    </LHCButton>
                </View>
                break;
        }

        return ret

    }

    private fromPersonButtonTapped() {

        this.showUserProfile(this.state.fromObject)
    }

    private toPersonButtonTapped() {

        this.showUserProfile(this.state.toObject)
    }

    private showUserProfile(user: IUserFromFirebase) {

        this.props.navigation.push('Profile', { profile: user, editable: false })
    }

    public render() {

        const buttonButtons = this.buttonButtons(this.state.viewMode)
        const reasonEditable = this.state.viewMode != 'Reply'
        const canShowStatus = this.state.viewMode != 'New'
        const status = canShowStatus ? <Text style={AppStyles.buttonText}>Status: {this.state.status}</Text> : null
        const canShowContactDetails = this.state.status == InvitationStatus.Accepted
        const contactDetails = canShowContactDetails ? <View>
            <Text style={AppStyles.buttonText}>
                {this.state.fromObject.user.userName} {this.state.fromObject.user.userContact}</Text>
            <Text style={AppStyles.buttonText}>
                {this.state.toObject.user.userName} {this.state.toObject.user.userContact}</Text>
        </View> : null

        return (
            <View style={AppStyles.container}>
                <LHCButton onSelected={() => { this.fromPersonButtonTapped() }}>
                    <Text style={AppStyles.buttonText}>From:</Text>
                    <Text style={AppStyles.buttonText}>{this.state.fromObject.user.userName}</Text>
                </LHCButton>

                <LHCButton onSelected={() => { this.toPersonButtonTapped() }}>
                    <Text style={AppStyles.buttonText}>To:</Text>
                    <Text style={AppStyles.buttonText}>{this.state.toObject.user.userName}</Text>
                </LHCButton>

                <TextInput style={AppStyles.input}
                    autoCapitalize="none"
                    keyboardType='default'
                    returnKeyType="done"
                    editable={reasonEditable}
                    value={this.state.reason}
                    placeholder='Reason'
                    placeholderTextColor='rgba(225,225,225,0.7)'
                    onChangeText={(text) => this.handleCustomDescriptionChange(text)}
                />

                {status}
                {contactDetails}

                <View style={{ flex: 1 }} />

                {buttonButtons}
            </View >
        );
    }

}