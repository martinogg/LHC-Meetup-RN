import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { IUser, IUserInterest } from '../../Helpers/UserStruct'

import LHCButton from '../LHCButton/LHCButton'

interface IProps {
    onSelected(): void,
    user: IUser
}

export default class BrowseUserEntry extends Component<IProps> {

    constructor(props: IProps) {

        super(props);
    }

    private getInterestsString(interests: IUserInterest[]): string {

        let ret = ''
        interests.forEach((interest) => {

            ret = ret.concat(interest.title + ', ')
        })

        return ret
    }

    render() {

        const interests = this.getInterestsString(this.props.user.userInterests)
        return <LHCButton styles={localStyles.container} onSelected={() => this.props.onSelected()}>
            <Text>Name: {this.props.user.userName}</Text>
            <Text>Location: {this.props.user.userLocation}</Text>
            <Text>Contact: {this.props.user.userContact}</Text>
            <Text>Interests: {interests}</Text>
        </LHCButton>
    }
}

const localStyles = StyleSheet.create({

    container: {
        margin: 5,
        padding: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F55C5F'
    }

})