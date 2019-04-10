import { StyleSheet } from 'react-native'

export const AppColours = {
    background: '#2c3e50',
    font: '#434e5a',
    primary: '#ff3b30'
}

export const AppStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColours.background,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
})
