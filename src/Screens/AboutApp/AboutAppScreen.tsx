import React, { Component } from 'react';
import { Button, Keyboard, Platform, StyleSheet, Text, View, Alert, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'
import { AppStyles } from '../../AppStyles'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import LHCButton from '../../Components/LHCButton/LHCButton'

export enum CommentMode {
    ShowButton = 0,
    ShowTextEntry = 1,
    HideAll = 2
}

interface IProps {
    navigation: NavigationScreenProp<any, any>,
    screenProps: {
        firebaseConnection: FirebaseConnection
    }
}

interface IState {
    showSendComment: CommentMode,
    commentText: string
}

export class AboutAppScreen extends Component<IProps, IState> {

    private static navigationOptions = {
        title: 'Lets Have Coffee',
    };

    constructor(props: IProps) {
        super(props)
        this.state = {
            showSendComment: CommentMode.ShowButton,
            commentText: ''
        }
    }

    public render() {

        const sendComment = this.commentComponent(this.state.showSendComment)
        return (
            <SafeAreaView style={AppStyles.container}>
                <KeyboardAvoidingView behavior="padding" style={[{ flex: 1 }]}>
                <Text style={[AppStyles.buttonText, {flex:1}]}>Some more text</Text>
                    <Text style={AppStyles.buttonText}>Welcome to About Screen native!</Text>
                    <Text style={AppStyles.buttonText}>To get started, edit App.tsx</Text>
                    {sendComment}
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    private commentComponent(commentMode: CommentMode) {

        switch (+commentMode) {
            case CommentMode.ShowButton:
                return <LHCButton onSelected={() => { this.showCommentField() }}>
                    <Text style={AppStyles.buttonText} >Send a Comment</Text>
                </LHCButton>
            case CommentMode.ShowTextEntry:
                return <View>
                    <TextInput style={AppStyles.input}
                        autoCapitalize="none"
                        onSubmitEditing={Keyboard.dismiss}
                        autoCorrect={false}
                        keyboardType='default'
                        returnKeyType="done"
                        placeholder='Comment'
                        value={this.state.commentText}
                        placeholderTextColor='rgba(225,225,225,0.7)'
                        onChangeText={(text) => this.handleCommentTextChange(text)}
                    />
                    <LHCButton onSelected={() => { this.sendComment() }}>
                        <Text style={AppStyles.buttonText}>Send Comment!</Text>
                    </LHCButton>
                </View>
        }
        return null
    }

    private handleCommentTextChange(text: string) {

        this.setState({ commentText: text })
    }

    private showCommentField() {

        this.setState({ showSendComment: CommentMode.ShowTextEntry })
    }

    private sendComment() {

        this.props.screenProps.firebaseConnection.sendComment(this.state.commentText)
        this.setState({ showSendComment: CommentMode.HideAll })
        Alert.alert('Thanks for your comment')
    }
}

const styles = StyleSheet.create({
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
});
