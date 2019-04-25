
import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import { Alert } from 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import LHCButton from '../src/Components/LHCButton/LHCButton'

import { IInvitationFromAndTo, IInvitation, Invitation, IInvitationFromFirebase, InvitationStatus } from '../src/Helpers/InvitationStruct'
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

    const props: any = createTestProps({})
    expect(renderer.create(<InvitationScreen {...props} />)).toMatchSnapshot();
});

test('componentDidMount function', () => {

    let props: any = createTestProps({})
    props.navigation.state.params.from = 'aaa111'
    props.navigation.state.params.to = 'abb122'
    props.navigation.state.params.uid = 'abb123'
    props.navigation.state.params.reason = 'abb124'
    props.navigation.state.params.viewMode = 'New'

    const sut = new InvitationScreen(props)

    sut.setState = jest.fn()

    sut.componentDidMount()

    expect(sut.setState).toHaveBeenCalledTimes(1)
    expect(sut.setState).toBeCalledWith({ "from": "aaa111", "reason": "abb124", "to": "abb122", "uid": "abb123", "viewMode": "New" })
})

test('handleCustomDescriptionChange function', () => {

    let props: any = createTestProps({})
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
    const mockInvitation = Invitation.create('a', 'b', 'c', InvitationStatus.New)

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
    const mockInvitation = Invitation.create('a', 'b', 'c', InvitationStatus.New)

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

test('updateButtonPressed function SUCCESS', async () => {

    jest.resetAllMocks()
    jest.mock('Alert', () => {
        return {
            alert: jest.fn()
        }
    });

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()
    const mockInvitation = { uid: '1234', ...Invitation.create('a', 'b', 'c', InvitationStatus.New) }

    sut.setState(mockInvitation)
    props.screenProps.firebaseConnection = {
        updateInvitation: (uid: string, reason: string) => {

            expect(uid).toEqual(mockInvitation.uid)
            expect(reason).toEqual(mockInvitation.reason)
            return new Promise((resolve, reject) => { resolve() })
        }
    }

    await sut.updateButtonPressed()

    expect(Alert.alert).toHaveBeenCalledTimes(1)
    expect(Alert.alert).toHaveBeenCalledWith('update invite OK')
})

test('updateButtonPressed function FAIL', async () => {

    jest.resetAllMocks()
    jest.mock('Alert', () => {
        return {
            alert: jest.fn()
        }
    });

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()
    const mockInvitation = { uid: '1234', ...Invitation.create('a', 'b', 'c', InvitationStatus.New) }

    sut.setState(mockInvitation)
    props.screenProps.firebaseConnection = {
        updateInvitation: (uid: string, reason: string) => {

            expect(uid).toEqual(mockInvitation.uid)
            expect(reason).toEqual(mockInvitation.reason)
            return new Promise((resolve, reject) => { reject('anError') })
        }
    }

    await sut.updateButtonPressed()

    expect(Alert.alert).toHaveBeenCalledTimes(1)
    expect(Alert.alert).toHaveBeenCalledWith('update invite Error:anError')
})

test('sendResponse function SUCCESS', async () => {

    jest.resetAllMocks()
    jest.mock('Alert', () => {
        return {
            alert: jest.fn()
        }
    });

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()
    const mockInvitation = { uid: '1234', ...Invitation.create('a', 'b', 'c', InvitationStatus.New) }
    const mockResponse: InvitationStatus = InvitationStatus.Accepted

    sut.setState(mockInvitation)
    props.screenProps.firebaseConnection = {
        updateInvitationResponse: (uid: string, response: InvitationStatus) => {

            expect(uid).toEqual(mockInvitation.uid)
            expect(response).toEqual(mockResponse)
            return new Promise((resolve, reject) => { resolve() })
        }
    }

    await sut.sendResponse(mockResponse)

    expect(Alert.alert).toHaveBeenCalledTimes(1)
    expect(Alert.alert).toHaveBeenCalledWith('update invite response OK')
})

test('sendResponse function FAIL', async () => {

    jest.resetAllMocks()
    jest.mock('Alert', () => {
        return {
            alert: jest.fn()
        }
    });

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()
    const mockInvitation = { uid: '1234', ...Invitation.create('a', 'b', 'c', InvitationStatus.New) }
    const mockResponse: InvitationStatus = InvitationStatus.Accepted

    sut.setState(mockInvitation)
    props.screenProps.firebaseConnection = {
        updateInvitationResponse: (uid: string, response: InvitationStatus) => {

            expect(uid).toEqual(mockInvitation.uid)
            expect(response).toEqual(mockResponse)
            return new Promise((resolve, reject) => { reject('anError') })
        }
    }

    await sut.sendResponse(mockResponse)

    expect(Alert.alert).toHaveBeenCalledTimes(1)
    expect(Alert.alert).toHaveBeenCalledWith('update invite response Error:anError')
})

test('acceptButtonPressed function', () => {

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()

    sut.sendResponse = jest.fn()

    sut.acceptButtonPressed()

    expect(sut.sendResponse).toHaveBeenCalledTimes(1)
    expect(sut.sendResponse).toHaveBeenCalledWith(InvitationStatus.Accepted)
})

test('rejectButtonPressed function', () => {

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()

    sut.sendResponse = jest.fn()

    sut.rejectButtonPressed()

    expect(sut.sendResponse).toHaveBeenCalledTimes(1)
    expect(sut.sendResponse).toHaveBeenCalledWith(InvitationStatus.Rejected)
})



test('buttonButtons function with New', () => {

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()

    expect(sut.buttonButtons('New')).toMatchSnapshot()
})

test('buttonButtons function with Edit', () => {

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()

    expect(sut.buttonButtons('Edit')).toMatchSnapshot()
})

test('buttonButtons function with Reply', () => {

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()

    expect(sut.buttonButtons('Reply')).toMatchSnapshot()
})

