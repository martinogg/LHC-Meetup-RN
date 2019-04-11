import React, { Component } from 'react';
import { Button, Platform, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LHCButton from '../../Components/LHCButton/LHCButton'
import { AppStyles } from '../../AppStyles'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

interface Props { navigation: any }

export class HomeScreen extends Component<Props> {
    private static navigationOptions = {
        title: 'Welcome',
    };
    public render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={AppStyles.container}>
                <Text style={[styles.welcome, { flex: 1 }]}>Welcome to HOME!</Text>
                <Text style={styles.instructions}>To get started, edit App.tsx</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                <LHCButton onSelected={() => navigate('EditDetails')}>
                    <Text style={AppStyles.buttonText} >Edit</Text>
                </LHCButton>
                <LHCButton onSelected={() => navigate('Browse')}>
                    <Text style={AppStyles.buttonText} >Browse</Text>
                </LHCButton>
                <LHCButton onSelected={() => navigate('AboutApp')}>
                    <Text style={AppStyles.buttonText}>About</Text>
                </LHCButton>
            </SafeAreaView >
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
