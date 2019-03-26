import React from 'react';
import 'react-native';

import { LoginScreen } from '../src/Screens/Login/LoginScreen';

import {NavigationScreenProp} from 'react-navigation'

import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Platform, StyleSheet, Text, View, Button} from 'react-native'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should display LoginScreen with no errors', () => {

  const navigation = { navigate: jest.fn() };
  expect(renderer.create(<LoginScreen navigation={navigation} />)).toMatchSnapshot();
});

test('test onPress functionality', () => {

  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<LoginScreen navigation={navigation}/>);
  
  wrapper.find(Button).first().simulate('press')

  expect(navigateFunc).toHaveBeenCalledTimes(1)
  expect(navigateFunc).toHaveBeenCalledWith('Register')
});