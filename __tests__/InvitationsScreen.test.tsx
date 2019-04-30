import { shallow } from 'enzyme';
import React from 'react';
import { Alert } from 'react-native';

import { IInvitationFromAndTo, IInvitation, Invitation, IInvitationFromFirebase, InvitationStatus, IInvitationFromFirebaseWithUserObject } from '../src/Helpers/InvitationStruct'
import { InvitationsScreen } from '../src/Screens/Invitations/InvitationsScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { User } from '../src/Helpers/UserStruct';

const createTestProps = (props: Object) => ({
    navigation: {
        navigate: jest.fn(),
        replace: jest.fn(),
        dispatch: jest.fn()
    },
    screenProps: {
        firebaseConnection: {
            isLoggedIn: () => { return true },
            getInvitations: () => { return new Promise<IInvitationFromAndTo>((resolve, reject) => { resolve({ to: [], from: [] }) }) }
        }
    },
    ...props
});

it('should display HomeScreen with no errors', () => {

    const props: any = createTestProps({})
    const navigation = { navigate: jest.fn() };

    expect(renderer.create(<InvitationsScreen {...props} />)).toMatchSnapshot();
});

test('componentDidMount function', () => {

    const props: any = createTestProps({})
    const sut: any = new InvitationsScreen(props)

    sut.getInvitations = jest.fn()

    sut.componentDidMount()

    expect(sut.getInvitations).toHaveBeenCalledTimes(1)
})

test('getInvitations function Success', async () => {

    const testFromList: IInvitationFromFirebase[] = [{ id: '1', invitation: Invitation.create('a', 'b', 'c', InvitationStatus.New) }, { id: '2', invitation: Invitation.create('d', 'e', 'f', InvitationStatus.New) }]
    const testToList: IInvitationFromFirebase[] = [{ id: '12', invitation: Invitation.create('a2', 'b2', 'c2', InvitationStatus.New) }, { id: '22', invitation: Invitation.create('d2', 'e2', 'f2', InvitationStatus.New) }]

    const props: any = createTestProps({

        screenProps: {
            firebaseConnection: {
                getInvitations: () => { return new Promise<IInvitationFromAndTo>((resolve, reject) => { resolve({ to: testToList, from: testFromList }) }) },
            }
        },

    })
    const sut: any = new InvitationsScreen(props)
    sut.getInvitationsWithUserObjects = jest.fn()

    await sut.getInvitations()

    expect(sut.getInvitationsWithUserObjects).toHaveBeenCalledTimes(1)
    expect(sut.getInvitationsWithUserObjects).toHaveBeenCalledWith({ "from": [{ "id": "1", "invitation": { "from": "a", "reason": "c", "status": "New", "to": "b" } }, { "id": "2", "invitation": { "from": "d", "reason": "f", "status": "New", "to": "e" } }], "to": [{ "id": "12", "invitation": { "from": "a2", "reason": "c2", "status": "New", "to": "b2" } }, { "id": "22", "invitation": { "from": "d2", "reason": "f2", "status": "New", "to": "e2" } }] })
})

test('getInvitationsWithUserObjects function Fail', async () => {

    const testFromList: IInvitationFromFirebase[] = [{ id: '1', invitation: Invitation.create('a', 'b', 'c', InvitationStatus.New) }, { id: '2', invitation: Invitation.create('d', 'e', 'f', InvitationStatus.New) }]
    const testToList: IInvitationFromFirebase[] = [{ id: '12', invitation: Invitation.create('a2', 'b2', 'c2', InvitationStatus.New) }, { id: '22', invitation: Invitation.create('d2', 'e2', 'f2', InvitationStatus.New) }]

    jest.clearAllMocks()

    jest.mock('Alert', () => {
        return {
            alert: jest.fn()
        }
    });

    const props: any = createTestProps({

        screenProps: {
            firebaseConnection: {
                buildInvitationsWithUserObjects: (invitations: IInvitationFromAndTo) => {

                    return new Promise<IInvitationFromAndTo>((resolve, reject) => { reject('anError') })
                }
            }
        }
    })
    const sut: any = new InvitationsScreen(props)

    await sut.getInvitationsWithUserObjects({ to: testToList, from: testFromList })

    expect(Alert.alert).toBeCalledTimes(1)
    expect(Alert.alert).toBeCalledWith('Error:anError')
})

test('getInvitationsWithUserObjects function Success', async () => {

    const testFromList: IInvitationFromFirebase[] = [{ id: '1', invitation: Invitation.create('a', 'b', 'c', InvitationStatus.New) }, { id: '2', invitation: Invitation.create('d', 'e', 'f', InvitationStatus.New) }]
    const testToList: IInvitationFromFirebase[] = [{ id: '12', invitation: Invitation.create('a2', 'b2', 'c2', InvitationStatus.New) }, { id: '22', invitation: Invitation.create('d2', 'e2', 'f2', InvitationStatus.New) }]

    jest.clearAllMocks()

    jest.mock('Alert', () => {
        return {
            alert: jest.fn()
        }
    });

    const props: any = createTestProps({

        screenProps: {
            firebaseConnection: {
                buildInvitationsWithUserObjects: (invitations: IInvitationFromAndTo) => {

                    return new Promise<IInvitationFromAndTo>((resolve, reject) => { resolve(invitations) })
                }
            }
        }
    })
    const sut: any = new InvitationsScreen(props)
    sut.setState = jest.fn()
    await sut.getInvitationsWithUserObjects({ to: testToList, from: testFromList })

    expect(sut.setState).toBeCalledTimes(1)
    expect(sut.setState).toBeCalledWith({ "receivedInvitations": [{ "id": "12", "invitation": { "from": "a2", "reason": "c2", "status": "New", "to": "b2" } }, { "id": "22", "invitation": { "from": "d2", "reason": "f2", "status": "New", "to": "e2" } }], "sentInvitations": [{ "id": "1", "invitation": { "from": "a", "reason": "c", "status": "New", "to": "b" } }, { "id": "2", "invitation": { "from": "d", "reason": "f", "status": "New", "to": "e" } }] })
})

test('getInvitations function Fail', async () => {

    const props: any = createTestProps({

        screenProps: {
            firebaseConnection: {
                getInvitations: () => {
                    return new Promise<IInvitationFromAndTo>((resolve, reject) => { reject('anError') })
                }
            }
        }

    })
    const sut: any = new InvitationsScreen(props)

    jest.resetAllMocks()

    jest.mock('Alert', () => {
        return {
            alert: jest.fn()
        }
    });

    await sut.getInvitations()

    expect(Alert.alert).toHaveBeenCalledTimes(1)
    expect(Alert.alert).toHaveBeenCalledWith('Error:anError')

})

it('should display HomeScreen with no Entries', async () => {

    const props: any = createTestProps({
        screenProps: {
            firebaseConnection: {
                getInvitations: () => { return new Promise<IInvitationFromAndTo>((resolve, reject) => { resolve({ to: [], from: [] }) }) }
            }
        },
    })

    const wrapper = shallow(<InvitationsScreen {...props} />)
    const sut: any = wrapper.instance()

    await sut.componentDidMount()
    const renderOutput = sut.render()
    expect(renderOutput).toMatchSnapshot();

});

it('should display HomeScreen with Entries', async () => {

    const testFromList: IInvitationFromFirebase[] = [{ id: '1', invitation: Invitation.create('a', 'b', 'c', InvitationStatus.New) }, { id: '2', invitation: Invitation.create('d', 'e', 'f', InvitationStatus.New) }]
    const testToList: IInvitationFromFirebase[] = [{ id: '12', invitation: Invitation.create('a2', 'b2', 'c2', InvitationStatus.New) }, { id: '22', invitation: Invitation.create('d2', 'e2', 'f2', InvitationStatus.New) }]

    const props: any = createTestProps({

        screenProps: {
            firebaseConnection: {
                getInvitations: () => { return new Promise<IInvitationFromAndTo>((resolve, reject) => { resolve({ to: testToList, from: testFromList }) }) }
            }
        },

    })

    const wrapper = shallow(<InvitationsScreen {...props} />)
    const sut: any = wrapper.instance()
    await sut.componentDidMount()
    const renderOutput = sut.render()
    expect(renderOutput).toMatchSnapshot();
});

test('invitationTapped function ownInvitation True', () => {

    let props: any = createTestProps({})
    props.navigation.navigate = jest.fn()
    const sut: any = new InvitationsScreen(props)

    const mockInvitation: IInvitationFromFirebase = { id: '1', invitation: Invitation.create('a', 'b', 'c', InvitationStatus.New) }
    sut.invitationTapped(mockInvitation, true)

    expect(props.navigation.navigate).toHaveBeenCalledTimes(1)
    expect(props.navigation.navigate).toHaveBeenCalledWith('Invitation', { "from": "a", "reason": "c", "status": "New", "to": "b", "uid": "1", "viewMode": "Edit" })

})

test('invitationTapped function ownInvitation False', () => {

    let props: any = createTestProps({})
    props.navigation.navigate = jest.fn()
    const sut: any = new InvitationsScreen(props)

    const mockInvitation: IInvitationFromFirebaseWithUserObject = { id: '1', invitation: Invitation.create('a', 'b', 'c', InvitationStatus.New), fromObject: { id: '1', user: User.create('a', 'b', 'c', []) }, toObject: { id: '1', user: User.create('a', 'b', 'c', []) }}
    sut.invitationTapped(mockInvitation, false)

    expect(props.navigation.navigate).toHaveBeenCalledTimes(1)
    expect(props.navigation.navigate).toHaveBeenCalledWith('Invitation', {"from": "a", "fromObject": {"id": "1", "user": {"userContact": "c", "userInterests": [], "userLocation": "b", "userName": "a"}}, "reason": "c", "status": "New", "to": "b", "toObject": {"id": "1", "user": {"userContact": "c", "userInterests": [], "userLocation": "b", "userName": "a"}}, "uid": "1", "viewMode": "Reply"})

})

test('invitationComponentForElement function ownInvitation True', () => {

    let props: any = createTestProps({})
    const sut: any = new InvitationsScreen(props)

    const mockInvitation: IInvitationFromFirebaseWithUserObject = { id: '1', invitation: Invitation.create('a', 'b', 'c', InvitationStatus.New), fromObject: { id: '1', user: User.create('a', 'b', 'c', []) }, toObject: { id: '1', user: User.create('a', 'b', 'c', []) } }
    const result = sut.invitationComponentForElement(mockInvitation, true)

    expect(result).toMatchSnapshot()
})

test('invitationComponentForElement function ownInvitation False', () => {

    let props: any = createTestProps({})
    const sut: any = new InvitationsScreen(props)

    const mockInvitation: IInvitationFromFirebaseWithUserObject = { id: '1', invitation: Invitation.create('a', 'b', 'c', InvitationStatus.New), fromObject: { id: '1', user: User.create('a', 'b', 'c', []) }, toObject: { id: '1', user: User.create('a', 'b', 'c', []) } }
    const result = sut.invitationComponentForElement(mockInvitation, false)

    expect(result).toMatchSnapshot()
})