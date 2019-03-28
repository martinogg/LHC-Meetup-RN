import React from 'react';
import 'react-native';

import { shallow } from 'enzyme';
import { Button } from 'react-native'

import { RegisterScreen } from '../src/Screens/Register/RegisterScreen';

import renderer from 'react-test-renderer';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    replace: jest.fn(),
    dispatch: jest.fn()
  },
  ...props
});

it('should display RegisterScreen with no errors', () => {

  let props: any;
  props = createTestProps({});

  const navigation = { navigate: jest.fn() };
  expect(renderer.create(<RegisterScreen {...props} />)).toMatchSnapshot();
});

test('test Edit Button push', () => {

  let props: any;
  props = createTestProps({});

  const wrapper = shallow(<RegisterScreen {...props} />);
  const sut: any = wrapper.instance()

  sut.goToEditScreen = jest.fn()

  wrapper.find(Button).first().simulate('press')

  expect(sut.goToEditScreen).toHaveBeenCalledTimes(1)
});

test('test goToEditScreen function', () => {

  let props: any;
  props = createTestProps({});

  const wrapper = shallow(<RegisterScreen {...props} />);
  const sut: any = wrapper.instance()
  sut.goToEditScreen()

  //expect(props.dispatch).toHaveBeenCalledTimes(1)
  //expect(props.dispatch).toHaveBeenCalledWith('EditDetails')
});