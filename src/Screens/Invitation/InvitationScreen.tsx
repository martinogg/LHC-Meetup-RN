import React, { Component } from 'react';
import { Alert, Text, View, TextInput } from 'react-native';

import { AppStyles } from '../../AppStyles'
import { NavigationScreenProp } from 'react-navigation'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import { IInvitationFromFirebase, Invitation, InvitationStatus } from '../../Helpers/InvitationStruct'
import LHCButton from '../../Components/LHCButton/LHCButton'

interface Props {
    navigation: NavigationScreenProp<any, any>,
    screenProps: {
        firebaseConnection: FirebaseConnection
    }
}

interface State {
    reason: string,
    from: string,
    to: string,
    uid: string,
    viewMode: string
}

export class InvitationScreen extends Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            reason: '',
            from: '',
            to: '',
            uid: '',
            viewMode: ''
        }
    }

    private static navigationOptions = {
        title: 'Invitation',
    };

    public componentDidMount() {

        this.setState({
            from: this.props.navigation.state.params.from,
            to: this.props.navigation.state.params.to,
            uid: this.props.navigation.state.params.uid,
            reason: this.props.navigation.state.params.reason,
            viewMode: this.props.navigation.state.params.viewMode
        })
    }

    private handleCustomDescriptionChange(text: string) {

        this.setState({ reason: text })
    }

    private sendButtonPressed() {

        const invitation = Invitation.create(this.state.from, this.state.to, this.state.reason, InvitationStatus.New)
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

    private buttonButtons(viewMode: string): JSX.Element {

        let ret: JSX.Element = <View></View>

        switch (viewMode) {
            case 'New':
                ret = <LHCButton onSelected={() => { this.sendButtonPressed() }}>
                    <Text style={AppStyles.buttonText}>Create Invitation</Text>
                </LHCButton>
                break;
            case 'Edit':
                ret = <LHCButton onSelected={() => { this.updateButtonPressed() }}>
                    <Text style={AppStyles.buttonText}>Update Invitation</Text>
                </LHCButton>
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

    public render() {

        const buttonButtons = this.buttonButtons(this.state.viewMode)

        return (
            <View style={AppStyles.container}>
                <LHCButton onSelected={() => { }}>
                    <Text style={AppStyles.buttonText}>From:</Text>
                    <Text style={AppStyles.buttonText}>{this.state.from}</Text>
                </LHCButton>

                <LHCButton onSelected={() => { }}>
                    <Text style={AppStyles.buttonText}>To:</Text>
                    <Text style={AppStyles.buttonText}>{this.state.to}</Text>
                </LHCButton>

                <TextInput style={AppStyles.input}
                    autoCapitalize="none"
                    keyboardType='default'
                    returnKeyType="done"
                    editable={true}
                    value={this.state.reason}
                    placeholder='Reason'
                    placeholderTextColor='rgba(225,225,225,0.7)'
                    onChangeText={(text) => this.handleCustomDescriptionChange(text)}
                />

                <View style={{ flex: 1 }} />

                {buttonButtons}
            </View >
        );
    }

}