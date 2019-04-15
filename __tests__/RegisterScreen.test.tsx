import React from 'react';
import 'react-native';

import { shallow } from 'enzyme';
import { Button, Alert } from 'react-native'

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

test('test goToHomeScreen function', () => {

  let props: any;
  props = createTestProps({});

  const wrapper = shallow(<RegisterScreen {...props} />);
  const sut: any = wrapper.instance()
  sut.goToHomeScreen()

  expect(props.navigation.dispatch).toHaveBeenCalledTimes(1)
  expect(props.navigation.dispatch).toHaveBeenCalledWith({ "actions": [{ "routeName": "Home", "type": "Navigation/NAVIGATE" }], "index": 0, "key": null, "type": "Navigation/RESET" })
});


test('test login function on pass', async () => {

  const username = "a"
  const password = "b"

  const registerFunc = (usernamePassedIn: string, passwordPassedIn: string): Promise<string> => {

    expect(usernamePassedIn).toBe(username)
    expect(passwordPassedIn).toBe(password)

    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        register: registerFunc,
        isLoggedIn: () => { return true }
      }
    }
  });

  const wrapper = shallow(<RegisterScreen {...props} />);
  const sut: any = wrapper.instance()
  let returnedAlertText = ''

  sut.showAlert = (alertText: string) => {

    returnedAlertText = alertText
  }

  sut.goToHomeScreen = jest.fn()

  await sut.register(username, password)
  expect(returnedAlertText).toBe('Registration OK!')

  expect(sut.goToHomeScreen).toHaveBeenCalledTimes(1)
});

test('test login function on fail', async () => {

  const username = "a"
  const password = "b"

  const registerFunc = (usernamePassedIn: string, passwordPassedIn: string): Promise<string> => {

    expect(usernamePassedIn).toBe(username)
    expect(passwordPassedIn).toBe(password)

    return new Promise((resolve, reject) => {
      reject('A reason')
    })
  }

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
  let returnedAlertText = ''

  sut.showAlert = (alertText: string) => {

    returnedAlertText = alertText
  }

  await sut.register(username, password)
  expect(returnedAlertText).toBe('Registration Fail. Reason: A reason')
});

test('test showAlert', () => {

  jest.mock('Alert', () => {
    return {
      alert: jest.fn()
    }
  });

  let props: any;
  props = createTestProps({});

  const wrapper = shallow(<RegisterScreen {...props} />);
  const sut: any = wrapper.instance()

  const showMessage = 'aMessage'
  sut.showAlert(showMessage)

  expect(Alert.alert).toBeCalledTimes(1)
  expect(Alert.alert).toBeCalledWith(showMessage)
})