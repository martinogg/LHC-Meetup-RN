import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import 'react-native';
import { Alert, Button } from 'react-native'

import { LoginScreen } from '../src/Screens/Login/LoginScreen';

import renderer from 'react-test-renderer';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    replace: jest.fn(),
    dispatch: jest.fn()
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

test('test goToEditScreen()', () => {

  let props: any;
  props = createTestProps({});

  const wrapper = shallow(<LoginScreen {...props} />);
  const sut: any = wrapper.instance()

  sut.goToEditScreen = jest.fn()

  wrapper.find(Button).at(2).simulate('press')

  expect(sut.goToEditScreen).toHaveBeenCalledTimes(1)
});

test('test pushHome()', () => {

  let props: any;
  props = createTestProps({});

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

  expect(props.navigation.dispatch).toHaveBeenCalledTimes(1)
  expect(props.navigation.dispatch).toHaveBeenCalledWith({ "actions": [{ "routeName": "Home", "type": "Navigation/NAVIGATE" }], "index": 0, "key": null, "type": "Navigation/RESET" })
});


test("test goToHomeScreen function", () => {
  let wrapper: ShallowWrapper;
  let props: any;   // use type "any" to opt-out of type-checking
  props = createTestProps({});
  wrapper = shallow(<LoginScreen {...props} />);   // no compile-time error

  const sut: any = wrapper.instance()

  sut.goToHomeScreen()
  expect(props.navigation.dispatch).toHaveBeenCalledTimes(1)
  expect(props.navigation.dispatch).toHaveBeenCalledWith({ "actions": [{ "routeName": "Home", "type": "Navigation/NAVIGATE" }], "index": 0, "key": null, "type": "Navigation/RESET" });
});

test('test goToEditScreen function', () => {

  let props: any;
  props = createTestProps({});

  const wrapper = shallow(<LoginScreen {...props} />);
  const sut: any = wrapper.instance()
  sut.goToEditScreen()

  expect(props.navigation.dispatch).toHaveBeenCalledTimes(1)
  expect(props.navigation.dispatch).toHaveBeenCalledWith({ "actions": [{ "routeName": "EditDetails", "type": "Navigation/NAVIGATE" }], "index": 0, "key": null, "type": "Navigation/RESET" })
});

test('test login function success', async () => {

  const username = "a"
  const password = "b"

  const loginFunc = (usernamePassedIn: string, passwordPassedIn: string): Promise<string> => {

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
        login: loginFunc,
        isLoggedIn: () => { return true }
      }
    }
  });

  const wrapper = shallow(<LoginScreen {...props} />);
  const sut: any = wrapper.instance()
  sut.goToHomeScreen = jest.fn()
  //let returnedAlertText = ''

  /*sut.showAlert = (alertText: string) => {
  
    returnedAlertText = alertText
  }*/

  await sut.login(username, password)
  expect(sut.goToHomeScreen).toHaveBeenCalledTimes(1)
});

test('test login function fail', async () => {

  const username = "a"
  const password = "b"

  const loginFunc = (usernamePassedIn: string, passwordPassedIn: string): Promise<string> => {

    expect(usernamePassedIn).toBe(username)
    expect(passwordPassedIn).toBe(password)

    return new Promise((resolve, reject) => {
      reject('a Reason')
    })
  }

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        login: loginFunc,
        isLoggedIn: () => { return true }
      }
    }
  });

  const wrapper = shallow(<LoginScreen {...props} />);
  const sut: any = wrapper.instance()

  let returnedAlertText = ''

  sut.showAlert = (alertText: string) => {

    returnedAlertText = alertText
  }

  await sut.login(username, password)
  expect(returnedAlertText).toBe('Login Fail. a Reason')
});

test('test showAlert', () => {

  jest.mock('Alert', () => {
    return {
      alert: jest.fn()
    }
  });

  let props: any;
  props = createTestProps({});

  const wrapper = shallow(<LoginScreen {...props} />);
  const sut: any = wrapper.instance()

  const showMessage = 'aMessage'
  sut.showAlert(showMessage)

  expect(Alert.alert).toBeCalledTimes(1)
  expect(Alert.alert).toBeCalledWith(showMessage)
})
