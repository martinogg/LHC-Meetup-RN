import React, { Component } from 'react';
import { Alert, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import { IUserFromFirebase, User } from '../../Helpers/UserStruct'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

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
        // TODO TEST
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        // TODO TEST
        this.props.screenProps.firebaseConnection.searchOtherUsers().then((otherUsers) => {
        
            this.setState({
                users: otherUsers
            })

        }, (error) => {

            Alert.alert('error: ' + error)
        })

    }

    public render() {
        
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React native!</Text>
                <Text style={styles.instructions}>To get started, edit App.tsx</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.users}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => <Text style={styles.item}>{item.user.userName}</Text>}
                    />
                </View>
            </View>
        );
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
