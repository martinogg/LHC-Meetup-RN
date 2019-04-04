import React, { Component } from 'react';
import { Alert, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import { IUserFromFirebase, User, IUser } from '../../Helpers/UserStruct'
import BrowseUserEntry from '../../Components/BrowseUserEntry/BrowseUserEntry'

interface IProps {
    navigation: NavigationScreenProp<any, any>,
    screenProps: {
        firebaseConnection: FirebaseConnection
    }
}

interface IState {
    users: IUserFromFirebase[]
}

export class BrowseScreen extends Component<IProps, IState> {

    constructor(props: IProps) {

        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {

        this.props.screenProps.firebaseConnection.searchOtherUsers().then((otherUsers) => {

            this.setState({
                users: otherUsers
            })

        }, (error) => {

            Alert.alert('error: ' + error)
        })

    }

    public render() {
        // TODO TEST

        const loadingScreen = this.state.users.length == 0 ? <Text>Loading</Text> : null
        
        return (
            <View style={styles.container}>
                {loadingScreen}
                <FlatList
                    data={this.state.users}
                    keyExtractor={(item, index) => item.id}
                    //renderItem={({ item }) => <Text style={styles.item}>{item.user.userName}</Text>}
                    renderItem={({ item }) => <BrowseUserEntry user={item.user} onSelected={() => { this.onUserSelected(item) }} />}
                />
            </View>
        );
    }

    public onUserSelected(user: IUserFromFirebase) {
        // TODO Selected user.
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
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
