import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import LHCButton from '../src/Components/LHCButton/LHCButton'

import { HomeScreen } from '../src/Screens/Home/HomeScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should display HomeScreen with no errors', () => {

  const navigation = { navigate: jest.fn() };
  expect(renderer.create(<HomeScreen navigation={navigation} />)).toMatchSnapshot();
});

test('test onPress About functionality', () => {

  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<HomeScreen navigation={navigation} />);

  wrapper.find(LHCButton).at(2).simulate('selected')

  expect(navigateFunc).toHaveBeenCalledTimes(1)
  expect(navigateFunc).toHaveBeenCalledWith('AboutApp')
});

test('test onPress Profile functionality', () => {

  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<HomeScreen navigation={navigation} />);

  wrapper.find(LHCButton).first().simulate('selected')

  expect(navigateFunc).toHaveBeenCalledTimes(1)
  expect(navigateFunc).toHaveBeenCalledWith('Profile', {editable: true})
});

test('test onPress Browse functionality', () => {

  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<HomeScreen navigation={navigation} />);

  wrapper.find(LHCButton).at(1).simulate('selected')

  expect(navigateFunc).toHaveBeenCalledTimes(1)
  expect(navigateFunc).toHaveBeenCalledWith('Browse')
});