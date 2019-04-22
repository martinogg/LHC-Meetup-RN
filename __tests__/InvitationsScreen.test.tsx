import { shallow } from 'enzyme';
import React from 'react';
import { Alert } from 'react-native';
import LHCButton from '../src/Components/LHCButton/LHCButton'

import { IInvitationFromAndTo, IInvitation, Invitation, IInvitationFromFirebase } from '../src/Helpers/InvitationStruct'
import { InvitationsScreen } from '../src/Screens/Invitations/InvitationsScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { tsModuleBlock } from '@babel/types';

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

    const props = createTestProps({})
    const navigation = { navigate: jest.fn() };

    expect(renderer.create(<InvitationsScreen {...props} />)).toMatchSnapshot();
});

test('componentDidMount function', () => {

    const props = createTestProps({})
    const sut = new InvitationsScreen(props)

    sut.getInvitations = jest.fn()

    sut.componentDidMount()

    expect(sut.getInvitations).toHaveBeenCalledTimes(1)
})

test('getInvitations function Success', async () => {

    const testFromList: IInvitationFromFirebase[] = [{ id: '1', invitation: Invitation.create('a', 'b', 'c') }, { id: '2', invitation: Invitation.create('d', 'e', 'f') }]
    const testToList: IInvitationFromFirebase[] = [{ id: '12', invitation: Invitation.create('a2', 'b2', 'c2') }, { id: '22', invitation: Invitation.create('d2', 'e2', 'f2') }]

    const props = createTestProps({

        screenProps: {
            firebaseConnection: {
                getInvitations: () => { return new Promise<IInvitationFromAndTo>((resolve, reject) => { resolve({ to: testToList, from: testFromList }) }) }
            }
        },

    })
    const sut = new InvitationsScreen(props)

    sut.setState = jest.fn()

    await sut.getInvitations()

    expect(sut.setState).toHaveBeenCalledTimes(1)
    expect(sut.setState).toHaveBeenCalledWith({ "receivedInvitations": [{ "id": "12", "invitation": { "from": "a2", "reason": "c2", "to": "b2" } }, { "id": "22", "invitation": { "from": "d2", "reason": "f2", "to": "e2" } }], "sentInvitations": [{ "id": "1", "invitation": { "from": "a", "reason": "c", "to": "b" } }, { "id": "2", "invitation": { "from": "d", "reason": "f", "to": "e" } }] })
})

test('getInvitations function Fail', async () => {

    const props = createTestProps({

        screenProps: {
            firebaseConnection: {
                getInvitations: () => {
                    return new Promise<IInvitationFromAndTo>((resolve, reject) => { reject('anError') })
                }
            }
        }

    })
    const sut = new InvitationsScreen(props)

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

    const props = createTestProps({
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

    const testFromList: IInvitationFromFirebase[] = [{ id: '1', invitation: Invitation.create('a', 'b', 'c') }, { id: '2', invitation: Invitation.create('d', 'e', 'f') }]
    const testToList: IInvitationFromFirebase[] = [{ id: '12', invitation: Invitation.create('a2', 'b2', 'c2') }, { id: '22', invitation: Invitation.create('d2', 'e2', 'f2') }]

    const props = createTestProps({

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