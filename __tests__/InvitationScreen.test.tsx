
import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import { Alert } from 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import LHCButton from '../src/Components/LHCButton/LHCButton'

import { User, IUserFromFirebase } from '../src/Helpers/UserStruct'
import { IInvitationFromAndTo, IInvitation, Invitation, IInvitationFromFirebase, InvitationStatus } from '../src/Helpers/InvitationStruct'
import { InvitationScreen } from '../src/Screens/Invitation/InvitationScreen';


const createTestProps = (props: Object) => ({
    navigation: {
        push: jest.fn(),
        replace: jest.fn(),
        dispatch: jest.fn(),
        state: {
            params: {
                fromObject: { id: '1', user: User.create('a', 'b', 'c', []) },
                toObject: { id: '1', user: User.create('a', 'b', 'c', []) }
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

    let props: any = createTestProps({});

    props.navigation.state.params.fromObject = 'a'
    props.navigation.state.params.toObject = 'b'
    props.navigation.state.params.viewMode = 'New'
    props.navigation.state.params.uid = 'd'
    props.navigation.state.params.reason = 'e'

    const sut = new InvitationScreen(props)

    sut.setState = jest.fn()

    sut.componentDidMount()

    expect(sut.setState).toHaveBeenCalledTimes(1)
    expect(sut.setState).toBeCalledWith({ "fromObject": "a", "reason": "e", "toObject": "b", "uid": "d", "viewMode": "New" })


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
    const mockInvitation = Invitation.create('1', '1', 'c', InvitationStatus.New)

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
    const mockInvitation = Invitation.create('1', '1', 'c', InvitationStatus.New)

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

test('render from button press', () => {

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()

    sut.fromPersonButtonTapped = jest.fn()

    wrapper.find(LHCButton).first().simulate('selected')

    expect(sut.fromPersonButtonTapped).toBeCalledTimes(1)
})

test('render to button press', () => {

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()

    sut.toPersonButtonTapped = jest.fn()

    wrapper.find(LHCButton).at(1).simulate('selected')

    expect(sut.toPersonButtonTapped).toBeCalledTimes(1)
})

test('fromPersonButtonTapped function', () => {

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()

    const mockObj: IUserFromFirebase = {
        id: '1111',
        user: User.create('a', 'b', 'c', [])
    }

    sut.showUserProfile = jest.fn()
    sut.setState({ fromObject: mockObj })

    sut.fromPersonButtonTapped()

    expect(sut.showUserProfile).toBeCalledTimes(1)
    expect(sut.showUserProfile).toBeCalledWith(mockObj)
})

test('toPersonButtonTapped function', () => {

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()

    const mockObj: IUserFromFirebase = {
        id: '1111',
        user: User.create('a', 'b', 'c', [])
    }

    sut.showUserProfile = jest.fn()
    sut.setState({ toObject: mockObj })

    sut.toPersonButtonTapped()

    expect(sut.showUserProfile).toBeCalledTimes(1)
    expect(sut.showUserProfile).toBeCalledWith(mockObj)
})

test('toPersonButtonTapped function', () => {

    let props: any = createTestProps({})
    const wrapper = shallow(<InvitationScreen {...props} />)
    const sut: any = wrapper.instance()

    const mockObj: IUserFromFirebase = {
        id: '1111',
        user: User.create('a', 'b', 'c', [])
    }

    sut.showUserProfile(mockObj)

    expect(props.navigation.push).toBeCalledTimes(1)
    expect(props.navigation.push).toBeCalledWith('Profile', { "editable": false, "profile": { "id": "1111", "user": { "userContact": "c", "userInterests": [], "userLocation": "b", "userName": "a" } } })
})