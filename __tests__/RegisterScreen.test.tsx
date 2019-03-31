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

  expect(props.navigation.dispatch).toHaveBeenCalledTimes(1)
  expect(props.navigation.dispatch).toHaveBeenCalledWith({"actions": [{"routeName": "EditDetails", "type": "Navigation/NAVIGATE"}], "index": 0, "key": null, "type": "Navigation/RESET"})
});


test('test login function', () => {

  // TODO - Fix this test so it works with the Promise
  /*
  const registerFunc = jest.fn()

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        register: registerFunc
      }
    }
  });

  const wrapper = shallow(<RegisterScreen {...props} />);
  const sut: any = wrapper.instance()
  
  const username = "a"
  const password = "b"
  
  console.log(sut)
  sut.login(username, password)

  expect(registerFunc).toHaveBeenCalledTimes(1)
  expect(registerFunc).toHaveBeenCalledWith(username, password)
  */
});