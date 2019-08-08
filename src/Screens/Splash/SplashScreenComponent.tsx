import React from 'react';
import { View, Text } from 'react-native'
import styles from './SplashScreenStyles'

interface Props {

}

const splashScreenComponent = (props: Props) => <View style={styles.container}>
    <Text>LHC - Lets Have Coffee</Text>
</View>

export default splashScreenComponent