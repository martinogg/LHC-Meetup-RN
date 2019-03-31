import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import { Button } from 'react-native'

import {EditScreen} from '../src/Screens/Edit/EditScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    replace: jest.fn(),
    dispatch: jest.fn()
  },
  ...props
});

it('should display FeedbackScreen with no errors', () => {

  const props: any = createTestProps({})

  expect(renderer.create(<EditScreen {...props}/>)).toMatchSnapshot();
});

test('test save button push', () => {
        
  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<EditScreen navigation={navigation} />);
  const sut: any = wrapper.instance()

  sut.saveButtonPressed = jest.fn()

  wrapper.find(Button).at(0).simulate('press')

  expect(sut.saveButtonPressed).toHaveBeenCalledTimes(1)
});

test('test cancel push', () => {

  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<EditScreen navigation={navigation} />);
  const sut: any = wrapper.instance()

  sut.cancelButtonPressed = jest.fn()

  wrapper.find(Button).at(1).simulate('press')

  expect(sut.cancelButtonPressed).toHaveBeenCalledTimes(1)
});

test('test logout button push', () => {

  const navigateFunc = jest.fn()
  const navigation = { navigate: navigateFunc };

  const wrapper = shallow(<EditScreen navigation={navigation} />);
  const sut: any = wrapper.instance()

  sut.logoutButtonPressed = jest.fn()

  wrapper.find(Button).at(2).simulate('press')

  expect(sut.logoutButtonPressed).toHaveBeenCalledTimes(1)
});

test('test logout function', async () => {

  const logoutFunc = (): Promise<string> => {

    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        logout: logoutFunc
      }
    }
  });

  const wrapper = shallow(<EditScreen {...props} />);
  const sut: any = wrapper.instance()

  await sut.logoutButtonPressed()
  expect(props.navigation.dispatch).toHaveBeenCalledTimes(1)
});