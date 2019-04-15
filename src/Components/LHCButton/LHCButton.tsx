
import React, { Component, Children } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface IProps {
    onSelected(): void
    styles?: any
}

export default class LHCButton extends Component<IProps> {

    constructor(props: IProps) {

        super(props);
    }

    render() {

        return <TouchableOpacity style={[localStyles.container, this.props.styles]} onPress={() => this.props.onSelected()}>
            {this.props.children}
        </TouchableOpacity>
    }
}

const localStyles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
})