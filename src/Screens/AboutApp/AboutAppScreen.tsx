import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import { AppStyles } from '../../AppStyles'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props {}

export class AboutAppScreen extends Component<Props> {
    public render() {
    return (
        <View style={AppStyles.container}>
        <Text style={styles.welcome}>Welcome to About Screen native!</Text>
        <Text style={styles.instructions}>To get started, edit App.tsx</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        </View>
    );
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
