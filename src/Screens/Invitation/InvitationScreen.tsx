import React, { Component } from 'react';
import { Alert, Text, View, TextInput } from 'react-native';

import { AppStyles } from '../../AppStyles'
import { NavigationScreenProp } from 'react-navigation'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import { Invitation } from '../../Helpers/InvitationStruct'
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
    to: string
}

export class InvitationScreen extends Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            reason: '',
            from: '',
            to: ''
        }
    }

    private static navigationOptions = {
        title: 'Create Invitation',
    };

    public componentDidMount() {

        this.setState({
            from: this.props.navigation.state.params.from,
            to: this.props.navigation.state.params.to
        })
    }

    private handleCustomDescriptionChange(text: string) {

        this.setState({ reason: text })
    }

    private sendButtonPressed() {

        const invitation = Invitation.create(this.state.from, this.state.to, this.state.reason)
        this.props.screenProps.firebaseConnection.createNewInvitation(invitation).then(() => {

            Alert.alert('new invite OK')
        }, (error) => {

            Alert.alert('new invite Error:' + error)
        })
    }

    public render() {

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

                <LHCButton onSelected={() => { this.sendButtonPressed() }}>
                    <Text style={AppStyles.buttonText}>Send Invitation</Text>
                </LHCButton>
            </View >
        );
    }
    
}