import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import 'react-native';
import { Button } from 'react-native'

import { LoginScreen } from '../src/Screens/Login/LoginScreen';

import renderer from 'react-test-renderer';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    replace: jest.fn()
  },
  ...props
});

it('should display LoginScreen with no errors', () => {
  let props: any;
  props = createTestProps({});

  const navigation = { navigate: jest.fn() };
  expect(renderer.create(<LoginScreen {...props} />)).toMatchSnapshot();
});

test('test onPress Login functionality', () => {

  let props: any;
  props = createTestProps({});

  const wrapper = shallow(<LoginScreen {...props} />);

  wrapper.find(Button).first().simulate('press')

  expect(props.navigation.navigate).toHaveBeenCalledTimes(1)
  expect(props.navigation.navigate).toHaveBeenCalledWith('Register')
});

test('test pushEditDetails()', () => {

  let props: any;
  props = createTestProps({});

  //const navigateFunc = jest.fn()
  //const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<LoginScreen {...props} />);
  const sut: any = wrapper.instance()

  sut.pushEditDetailsScreen = jest.fn()

  wrapper.find(Button).at(2).simulate('press')

  expect(sut.pushEditDetailsScreen).toHaveBeenCalledTimes(1)
});

test('test pushHome()', () => {

  let props: any;
  props = createTestProps({});

  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<LoginScreen {...props} />);
  const sut: any = wrapper.instance()

  sut.goToHomeScreen = jest.fn()

  wrapper.find(Button).at(1).simulate('press')

  expect(sut.goToHomeScreen).toHaveBeenCalledTimes(1)
});

test('test goToHomeScreen function', () => {

  let props: any;
  props = createTestProps({});

  const wrapper = shallow(<LoginScreen {...props} />);
  const sut: any = wrapper.instance()
  sut.goToHomeScreen()

  expect(props.navigation.replace).toHaveBeenCalledTimes(1)
  expect(props.navigation.replace).toHaveBeenCalledWith('Home')
});


test("test goToHomeScreen function", () => {
  let wrapper: ShallowWrapper;
  let props: any;   // use type "any" to opt-out of type-checking
  props = createTestProps({});
  wrapper = shallow(<LoginScreen {...props} />);   // no compile-time error

  const sut: any = wrapper.instance()

  sut.goToHomeScreen()
  expect(props.navigation.replace).toHaveBeenCalledWith('Home');   // SUCCESS
});

test('test pushEditDetailsScreen function', () => {

  let props: any;
  props = createTestProps({});

  const wrapper = shallow(<LoginScreen {...props} />);
  const sut: any = wrapper.instance()
  sut.pushEditDetailsScreen()

  expect(props.navigation.navigate).toHaveBeenCalledTimes(1)
  expect(props.navigation.navigate).toHaveBeenCalledWith('EditDetails')
});