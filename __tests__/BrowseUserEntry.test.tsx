import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';

import { User, IUser, UserInterest, IUserInterest } from '../src/Helpers/UserStruct'

import LHCButton from '../src/Components/LHCButton/LHCButton'

import BrowseUserEntry from '../src/Components/BrowseUserEntry/BrowseUserEntry'

import renderer from 'react-test-renderer';

test('BrowseUserEntry matches snapshot', () => {

    const interests: IUserInterest[] = [UserInterest.create('d', 'e'), UserInterest.create('f', 'g')]
    const user = User.create('a', 'b', 'c', interests)
    expect(renderer.create(<BrowseUserEntry user={user} onSelected={() => { }} />)).toMatchSnapshot();
})

test('BrowseUserEntry matches snapshot2', () => {

    const user = User.create('e', 'f', 'g', [UserInterest.create('d', 'e'), UserInterest.create('f', 'g')])
    expect(renderer.create(<BrowseUserEntry user={user} onSelected={() => { }} />)).toMatchSnapshot();
})

test('BrowseUserEntry responds to press', () => {

    const user = User.create('e', 'f', 'g', [UserInterest.create('d', 'e'), UserInterest.create('f', 'g')])
    const callback = jest.fn()
    const wrapper = shallow(<BrowseUserEntry user={user} onSelected={() => { callback() }} />);
    const sut: any = wrapper.instance()

    sut.goToEditScreen = jest.fn()
    wrapper.find(LHCButton).first().simulate('selected')

    expect(callback).toHaveBeenCalledTimes(1)
})