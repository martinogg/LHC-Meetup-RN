import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';

import { User, IUser } from '../src/Helpers/UserStruct'

import LHCButton from '../src/Components/LHCButton/LHCButton'

import BrowseUserEntry from '../src/Components/BrowseUserEntry/BrowseUserEntry'

import renderer from 'react-test-renderer';

test('BrowseUserEntry matches snapshot', () => {

    const user = User.create('a', 'b', 'c', 'd')
    expect(renderer.create(<BrowseUserEntry user={user} onSelected={() => { }} />)).toMatchSnapshot();
})

test('BrowseUserEntry matches snapshot2', () => {

    const user = User.create('e', 'f', 'g', 'h')
    expect(renderer.create(<BrowseUserEntry user={user} onSelected={() => { }} />)).toMatchSnapshot();
})

test('BrowseUserEntry responds to press', () => {

    const user = User.create('e', 'f', 'g', 'h')
    const callback = jest.fn()
    const wrapper = shallow(<BrowseUserEntry user={user} onSelected={() => { callback() }} />);
    const sut: any = wrapper.instance()

    sut.goToEditScreen = jest.fn()
    wrapper.find(LHCButton).first().simulate('selected')

    expect(callback).toHaveBeenCalledTimes(1)
})