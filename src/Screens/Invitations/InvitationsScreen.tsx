import React, { Component } from 'react'
import { Button, FlatList, Platform, StyleSheet, Text, View, Alert } from 'react-native'
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'
import { AppStyles } from '../../AppStyles'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import { IInvitationFromFirebase, IInvitationFromAndTo, IInvitationFromFirebaseWithUserObject } from '../../Helpers/InvitationStruct';
import LHCButton from '../../Components/LHCButton/LHCButton';

interface IProps {

    navigation: NavigationScreenProp<any, any>,
    screenProps: {
        firebaseConnection: FirebaseConnection
    }
}

interface IState {
    sentInvitations: IInvitationFromFirebaseWithUserObject[]
    receivedInvitations: IInvitationFromFirebaseWithUserObject[]
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

        this.props.screenProps.firebaseConnection.getInvitations().then((invitations) => {

            this.getInvitationsWithUserObjects(invitations)
        }, (error) => {

            Alert.alert('Error:' + error)
        })
    }

    private getInvitationsWithUserObjects(invitations: IInvitationFromAndTo) {

        this.props.screenProps.firebaseConnection.buildInvitationsWithUserObjects(invitations).then((invitationsWithUserObjects) => {

            this.setState({ sentInvitations: invitationsWithUserObjects.from, receivedInvitations: invitationsWithUserObjects.to })
        }, (error) => {

            Alert.alert('Error:' + error)
        })
    }

    private invitationTapped(item: IInvitationFromFirebaseWithUserObject, ownInvititation: boolean) {

        const mode = ownInvititation ? 'Edit' : 'Reply'
        this.props.navigation.push('Invitation', { ...item.invitation, viewMode: mode, uid: item.id, fromObject: item.fromObject, toObject: item.toObject})
    }

    private invitationComponentForElement(item: IInvitationFromFirebaseWithUserObject, ownInvititation: boolean): JSX.Element {

        // TODO - this needs to look better
        return <LHCButton onSelected={() => { this.invitationTapped(item, ownInvititation) }}>
            <Text>FROM {item.fromObject.user.userName}</Text>
            <Text>TO {item.toObject.user.userName}</Text>
            <Text>REASON {item.invitation.reason}</Text>
            <Text>STATUS {item.invitation.status}</Text>
        </LHCButton>
    }

    private listElements(sentInvitations: IInvitationFromFirebaseWithUserObject[], receivedInvitations: IInvitationFromFirebaseWithUserObject[]): JSX.Element[] {

        let ret: JSX.Element[] = []

        if (sentInvitations.length > 0) {
            ret.push(<Text style={AppStyles.buttonText}>Sent</Text>)
        }

        sentInvitations.forEach(element => {
            ret.push(this.invitationComponentForElement(element, true))
        });


        if (receivedInvitations.length > 0) {
            ret.push(<Text style={AppStyles.buttonText}>Received</Text>)
        }

        receivedInvitations.forEach(element => {
            ret.push(this.invitationComponentForElement(element, false))
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