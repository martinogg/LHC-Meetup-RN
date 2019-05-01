import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import LHCButton from '../src/Components/LHCButton/LHCButton'

import { HomeScreen } from '../src/Screens/Home/HomeScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should display HomeScreen with no errors', () => {

  const navigation = { push: jest.fn() };
  expect(renderer.create(<HomeScreen navigation={navigation} />)).toMatchSnapshot();
});

test('test onPress About functionality', () => {

  const pushFunc = jest.fn()
  const navigation = { push: pushFunc };

  const wrapper = shallow(<HomeScreen navigation={navigation} />);

  wrapper.find(LHCButton).at(3).simulate('selected')

  expect(pushFunc).toHaveBeenCalledTimes(1)
  expect(pushFunc).toHaveBeenCalledWith('AboutApp')
});

test('test onPress Profile functionality', () => {

  const pushFunc = jest.fn()
  const navigation = { push: pushFunc };

  const wrapper = shallow(<HomeScreen navigation={navigation} />);

  wrapper.find(LHCButton).first().simulate('selected')

  expect(pushFunc).toHaveBeenCalledTimes(1)
  expect(pushFunc).toHaveBeenCalledWith('Profile', {editable: true})
});

test('test onPress Browse functionality', () => {

  const pushFunc = jest.fn()
  const navigation = { push: pushFunc };

  const wrapper = shallow(<HomeScreen navigation={navigation} />);

  wrapper.find(LHCButton).at(1).simulate('selected')

  expect(pushFunc).toHaveBeenCalledTimes(1)
  expect(pushFunc).toHaveBeenCalledWith('Browse')
});

test('test onPress Invitations functionality', () => {

  const pushFunc = jest.fn()
  const navigation = { push: pushFunc };

  const wrapper = shallow(<HomeScreen navigation={navigation} />);

  wrapper.find(LHCButton).at(2).simulate('selected')

  expect(pushFunc).toHaveBeenCalledTimes(1)
  expect(pushFunc).toHaveBeenCalledWith('Invitations')
});