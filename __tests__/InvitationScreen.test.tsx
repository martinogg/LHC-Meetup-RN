
import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import { Alert } from 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import LHCButton from '../src/Components/LHCButton/LHCButton'

import { IInvitationFromAndTo, IInvitation, Invitation, IInvitationFromFirebase } from '../src/Helpers/InvitationStruct'
import { InvitationScreen } from '../src/Screens/Invitation/InvitationScreen';


const createTestProps = (props: Object) => ({
    navigation: {
        navigate: jest.fn(),
        replace: jest.fn(),
        dispatch: jest.fn(),
        state: {
            params: {
                from: '',
                to: ''
            }
        }
    },
    screenProps: {
        firebaseConnection: {
            isLoggedIn: () => { return true },
            getInvitations: () => { return new Promise<IInvitationFromAndTo>((resolve, reject) => { resolve({ to: [], from: [] }) }) }
        }
    },
    ...props
});

it('should display InvitationScreen with no errors', () => {

    const props = createTestProps({})
    expect(renderer.create(<InvitationScreen {...props} />)).toMatchSnapshot();
});

test('componentDidMount function', () => {

    let props = createTestProps({})
    props.navigation.state.params.from = 'aaa111'
    props.navigation.state.params.to = 'abb122'

    const sut = new InvitationScreen(props)

    sut.setState = jest.fn()

    sut.componentDidMount()

    expect(sut.setState).toHaveBeenCalledTimes(1)
    expect(sut.setState).toBeCalledWith({ "from": "aaa111", "to": "abb122" })
})

test('handleCustomDescriptionChange function', () => {

    let props = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()
    const textToChange = 'someText'

    sut.handleCustomDescriptionChange(textToChange)

    expect(sut.state.reason).toBe(textToChange)
})

test('sendButtonPressed function SUCCESS', async () => {

    jest.resetAllMocks()
    jest.mock('Alert', () => {
        return {
            alert: jest.fn()
        }
    });

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()
    const mockInvitation = Invitation.create('a', 'b', 'c')
    
    sut.setState(mockInvitation)
    props.screenProps.firebaseConnection = {
        createNewInvitation: (invitation: IInvitation) => {

            expect(invitation).toEqual(mockInvitation)
            return new Promise((resolve, reject) => { resolve() })
        }
    }

    await sut.sendButtonPressed()

    expect(Alert.alert).toHaveBeenCalledTimes(1)
    expect(Alert.alert).toHaveBeenCalledWith('new invite OK')
})

test('sendButtonPressed function FAIL', async () => {

    jest.resetAllMocks()
    jest.mock('Alert', () => {
        return {
            alert: jest.fn()
        }
    });

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()
    const mockInvitation = Invitation.create('a', 'b', 'c')
    
    sut.setState(mockInvitation)
    props.screenProps.firebaseConnection = {
        createNewInvitation: (invitation: IInvitation) => {

            expect(invitation).toEqual(mockInvitation)
            return new Promise((resolve, reject) => { reject('anError') })
        }
    }

    await sut.sendButtonPressed()

    expect(Alert.alert).toHaveBeenCalledTimes(1)
    expect(Alert.alert).toHaveBeenCalledWith('new invite Error:anError')
})