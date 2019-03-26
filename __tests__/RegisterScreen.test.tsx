import React from 'react';
import 'react-native';

import { RegisterScreen } from '../src/Screens/Register/RegisterScreen';
import { shallow } from 'enzyme';
import { Button } from 'react-native'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should display RegisterScreen with no errors', () => {

  const navigation = { navigate: jest.fn() };
  expect(renderer.create(<RegisterScreen navigation={navigation} />)).toMatchSnapshot();
});

test('test pushEditScreen()', () => {

  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<RegisterScreen navigation={navigation} />);
  const sut: RegisterScreen = wrapper.instance()

  sut.pushEditScreen = jest.fn()

  wrapper.find(Button).first().simulate('press')

  expect(sut.pushEditScreen).toHaveBeenCalledTimes(1)
});

test('test pushEditScreen function', () => {

  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<RegisterScreen navigation={navigation} />);
  const sut: RegisterScreen = wrapper.instance()
  sut.pushEditScreen()

  expect(navigateFunc).toHaveBeenCalledTimes(1)
  expect(navigateFunc).toHaveBeenCalledWith('EditDetails')
});