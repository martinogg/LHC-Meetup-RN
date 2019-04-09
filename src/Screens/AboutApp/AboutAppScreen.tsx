import React, { Component } from 'react';
import { Button, Keyboard, Platform, StyleSheet, Text, View, Alert, TextInput } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation'
import { AppStyles } from '../../AppStyles'
import FirebaseConnection from '../../Helpers/FirebaseConnection'
import LHCButton from '../../Components/LHCButton/LHCButton'

enum CommentMode {
    ShowButton = 0,
    ShowTextEntry = 1,
    HideAll = 2
}

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
    showSendComment: CommentMode,
    commentText: string
}

export class AboutAppScreen extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            showSendComment: CommentMode.ShowButton,
            commentText: ''
        }
    }

    public render() {
        // TODO TEST
        const sendComment = this.commentComponent(this.state.showSendComment)

        return (
            <View style={AppStyles.container}>
                <Text style={styles.welcome}>Welcome to About Screen native!</Text>
                <Text style={styles.instructions}>To get started, edit App.tsx</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                {sendComment}
            </View>
        );
    }

    private commentComponent(commentMode: CommentMode) {
        // TODO TEST
        switch (+commentMode) {
            case CommentMode.ShowButton:
                return <LHCButton onSelected={() => { this.showCommentField() }}>
                    <Text>Send a Comment</Text>
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
                        <Text>Send Comment!</Text>
                    </LHCButton>
                </View>
        }
        return null
    }

    private handleCommentTextChange(text: string) {

        // TODO TEST
        this.setState({ commentText: text })
    }

    private showCommentField() {

        // TODO TEST
        this.setState({ showSendComment: CommentMode.ShowTextEntry })
    }

    private sendComment() {

        //TODO TEST
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
