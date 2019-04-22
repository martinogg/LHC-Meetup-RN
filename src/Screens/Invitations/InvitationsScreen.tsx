import React, { Component } from 'react'
import { Button, FlatList, Platform, StyleSheet, Text, View, Alert } from 'react-native'
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'
import { AppStyles } from '../../AppStyles'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import { IInvitationFromFirebase } from '../../Helpers/InvitationStruct';

interface IProps {

    navigation: NavigationScreenProp<any, any>,
    screenProps: {
        firebaseConnection: FirebaseConnection
    }
}

interface IState {
    sentInvitations: IInvitationFromFirebase[]
    receivedInvitations: IInvitationFromFirebase[]
}

export class InvitationsScreen extends Component<IProps, IState> {

    private static navigationOptions = {
        title: 'Invitations'
    }

    constructor(props: IProps) {
        super(props)

        this.state = {

            sentInvitations: [],
            receivedInvitations: []
        }
    }

    public componentDidMount() {

        this.getInvitations()
    }

    private getInvitations() {

        this.props.screenProps.firebaseConnection.getInvitations().then((_invitations) => {

            this.setState({ sentInvitations: _invitations.from, receivedInvitations: _invitations.to })
        }, (error) => {

            Alert.alert('Error:' + error)
        })
    }

    private invitationComponentForElement(item: IInvitationFromFirebase): JSX.Element {

        // TODO - this needs to look better
        return <View>
            <Text>ID{item.id}</Text>
            <Text>FROM{item.invitation.from}</Text>
            <Text>TO{item.invitation.to}</Text>
            <Text>REASON{item.invitation.reason}</Text>
            <Text>.</Text>
        </View>
    }

    private listElements(sentInvitations: IInvitationFromFirebase[], receivedInvitations: IInvitationFromFirebase[]): JSX.Element[] {

        let ret: JSX.Element[] = []

        if (sentInvitations.length > 0) {
            ret.push(<Text style={AppStyles.buttonText}>Sent</Text>)
        }

        sentInvitations.forEach(element => {
            ret.push(this.invitationComponentForElement(element))
        });


        if (receivedInvitations.length > 0) {
            ret.push(<Text style={AppStyles.buttonText}>Received</Text>)
        }

        receivedInvitations.forEach(element => {
            ret.push(this.invitationComponentForElement(element))
        });

        if (ret.length == 0) {

            ret.push(<Text>No Invitations. Go to Browse Screen to find a new person to meet</Text>)
        }
        return ret
    }

    public render() {

        const listElements = this.listElements(this.state.sentInvitations, this.state.receivedInvitations)

        return (
            <View style={AppStyles.container}>
                <FlatList
                    data={listElements}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => { return item }}
                />
            </View>
        )
    }
}