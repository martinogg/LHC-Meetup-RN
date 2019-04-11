import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import 'react-native';
import { TextInput } from 'react-native'

import LHCButton from '../src/Components/LHCButton/LHCButton'

import LoginForm from '../src/Components/LoginForm/LoginForm';

import renderer from 'react-test-renderer';

const createTestProps = (props: Object) => ({
  onLoginCallback: jest.fn(),
  actionButtonText: "a",
  ...props
});

it('should display LoginForm with no errors', () => {
  let props: any;
  props = createTestProps({});

  const navigation = { navigate: jest.fn() };
  expect(renderer.create(<LoginForm {...props} />)).toMatchSnapshot();
});

test('test onPress Button functionality', () => {

  let props: any;
  props = createTestProps({});

  const wrapper = shallow(<LoginForm {...props} />);
  const sut: any = wrapper.instance();

  const testUsername = "aUsername"
  const testPassword = "aPassword"

  sut.handleUsernameChange(testUsername)
  sut.handlePasswordChange(testPassword)

  wrapper.find(LHCButton).first().simulate('selected')

  expect(props.onLoginCallback).toHaveBeenCalledTimes(1)
  expect(props.onLoginCallback).toHaveBeenCalledWith(testUsername, testPassword)
});

test('test onPress Button functionality2', () => {

  let props: any;
  props = createTestProps({});

  const wrapper = shallow(<LoginForm {...props} />);
  const sut: any = wrapper.instance();

  const testUsername = "aUsername2"
  const testPassword = "aPassword2"

  sut.handleUsernameChange(testUsername)
  sut.handlePasswordChange(testPassword)

  wrapper.find(LHCButton).first().simulate('selected')

  expect(props.onLoginCallback).toHaveBeenCalledTimes(1)
  expect(props.onLoginCallback).toHaveBeenCalledWith(testUsername, testPassword)
});