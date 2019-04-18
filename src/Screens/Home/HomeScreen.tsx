import React, { Component } from 'react';
import { Button, Platform, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LHCButton from '../../Components/LHCButton/LHCButton'
import { AppStyles } from '../../AppStyles'

interface Props { navigation: any }

export class HomeScreen extends Component<Props> {
    
    private static navigationOptions = {
        title: 'Welcome',
    };

    public render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={AppStyles.container}>
                <Text style={[AppStyles.buttonText, { flex: 1 }]}>Hello! Create your profile to Begin, then Search for other people</Text>
                <LHCButton onSelected={() => navigate('Profile', {editable: true})}>
                    <Text style={AppStyles.buttonText} >Enter Profile Details</Text>
                </LHCButton>
                <LHCButton onSelected={() => navigate('Browse')}>
                    <Text style={AppStyles.buttonText} >Browse by Interest</Text>
                </LHCButton>
                <LHCButton onSelected={() => navigate('AboutApp')}>
                    <Text style={AppStyles.buttonText}>About this App</Text>
                </LHCButton>
            </SafeAreaView >
        );
    }
}
