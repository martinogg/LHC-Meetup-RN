import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Alert, SafeAreaView, FlatList } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import { IUser, User, IUserInterest, UserInterest } from '../../Helpers/UserStruct'
import LHCButton from '../../Components/LHCButton/LHCButton'
import { AppStyles } from '../../AppStyles'

interface IProps {
    navigation: NavigationScreenProp<any, any>,
}

interface IState {
    userInterest: IUserInterest,
    title: string,
    description: string
}

export class InterestScreen extends Component<IProps, IState> {

    private static navigationOptions = {
        title: 'Interest'
    };

    constructor(props: IProps) {

        super(props);
        const userInterest = this.props.navigation.getParam('previousUserInterest')
        this.state = {
            userInterest: userInterest,
            title: userInterest.title,
            description: userInterest.description
        };
    }

    saveButtonPressed() {

        const saveCallback: (newInterest: UserInterest) => void = this.props.navigation.getParam('saveCallback')
        const newInterest = UserInterest.create(this.state.title, this.state.description)
        saveCallback(newInterest)
        this.props.navigation.pop()
    }

    removeButtonPressed() {

        const removeCallback = this.props.navigation.getParam('removeCallback')
        removeCallback()
        this.props.navigation.pop()
    }

    public render() {

        return (
            <SafeAreaView style={AppStyles.container}>

                <TextInput style={AppStyles.input}
                    autoCapitalize="none"
                    onSubmitEditing={() => this.contactInput.focus()}
                    autoCorrect={false}
                    keyboardType='default'
                    returnKeyType="next"
                    placeholder='Interest Title'
                    value={this.state.title}
                    placeholderTextColor='rgba(225,225,225,0.7)'
                    onChangeText={(text) => this.handleTitleChange(text)}
                />

                <TextInput style={AppStyles.input}
                    ref={(contact) => this.contactInput = contact}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType='default'
                    returnKeyType="done"
                    value={this.state.description}
                    placeholder='Description'
                    placeholderTextColor='rgba(225,225,225,0.7)'
                    onChangeText={(text) => this.handleDescriptionChange(text)}
                />

                <View style={{ flex: 1 }} />

                <LHCButton onSelected={() => this.saveButtonPressed()}>
                    <Text style={AppStyles.buttonText}>Save Changes</Text>
                </LHCButton>

                <LHCButton onSelected={() => this.removeButtonPressed()}>
                    <Text style={AppStyles.buttonText}>Remove interest</Text>
                </LHCButton>

            </SafeAreaView>
        );
    }

    private contactInput: any

    private handleTitleChange(text: string) {

        this.setState({ title: text })
    }

    private handleDescriptionChange(text: string) {

        this.setState({ description: text })
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