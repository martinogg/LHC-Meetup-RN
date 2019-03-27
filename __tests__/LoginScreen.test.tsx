import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import { Button } from 'react-native'

import { LoginScreen } from '../src/Screens/Login/LoginScreen';

import renderer from 'react-test-renderer';

it('should display LoginScreen with no errors', () => {

  const navigation = { navigate: jest.fn() };
  expect(renderer.create(<LoginScreen navigation={navigation} />)).toMatchSnapshot();
});

test('test onPress Login functionality', () => {

  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<LoginScreen navigation={navigation} />);

  wrapper.find(Button).first().simulate('press')

  expect(navigateFunc).toHaveBeenCalledTimes(1)
  expect(navigateFunc).toHaveBeenCalledWith('Register')
});

test('test pushEditDetails()', () => {

  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<LoginScreen navigation={navigation} />);
  const sut: any = wrapper.instance()

  sut.pushEditDetailsScreen = jest.fn()

  wrapper.find(Button).at(2).simulate('press')

  expect(sut.pushEditDetailsScreen).toHaveBeenCalledTimes(1)
});

test('test pushHome()', () => {

  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<LoginScreen navigation={navigation} />);
  const sut: any = wrapper.instance()

  sut.pushHomeScreen = jest.fn()

  wrapper.find(Button).at(1).simulate('press')

  expect(sut.pushHomeScreen).toHaveBeenCalledTimes(1)
});

test('test pushHomeScreen function', () => {

  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<LoginScreen navigation={navigation} />);
  const sut: any = wrapper.instance()
  sut.pushHomeScreen()

  expect(navigateFunc).toHaveBeenCalledTimes(1)
  expect(navigateFunc).toHaveBeenCalledWith('Home')
});

test('test pushEditDetailsScreen function', () => {

  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<LoginScreen navigation={navigation} />);
  const sut: any = wrapper.instance()
  sut.pushEditDetailsScreen()

  expect(navigateFunc).toHaveBeenCalledTimes(1)
  expect(navigateFunc).toHaveBeenCalledWith('EditDetails')
});