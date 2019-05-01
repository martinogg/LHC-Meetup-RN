import React, { Component } from 'react';
import { Button, Platform, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LHCButton from '../../Components/LHCButton/LHCButton'
import { AppStyles } from '../../AppStyles'

interface Props { navigation: any }

export class HomeScreen extends Component<Props> {
    
    private static navigationOptions = {
        title: 'Welcome',
    }

    public render() {

        const { push } = this.props.navigation;
        return (
            <SafeAreaView style={AppStyles.container}>
                <Text style={[AppStyles.buttonText, { flex: 1 }]}>Hello! Create your profile to Begin, then Search for other people</Text>
                <LHCButton onSelected={() => push('Profile', {editable: true})}>
                    <Text style={AppStyles.buttonText} >Enter Profile Details</Text>
                </LHCButton>
                <LHCButton onSelected={() => push('Browse')}>
                    <Text style={AppStyles.buttonText}>Browse by Interest</Text>
                </LHCButton>
                <LHCButton onSelected={() => push('Invitations')}>
                    <Text style={AppStyles.buttonText}>Invitations</Text>
                </LHCButton>
                <LHCButton onSelected={() => push('AboutApp')}>
                    <Text style={AppStyles.buttonText}>About this App</Text>
                </LHCButton>
            </SafeAreaView >
        );
    }
}
