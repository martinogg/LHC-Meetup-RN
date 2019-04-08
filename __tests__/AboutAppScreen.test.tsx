import React from 'react';
import 'react-native';

import { AboutAppScreen } from '../src/Screens/AboutApp/AboutAppScreen'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    replace: jest.fn(),
    dispatch: jest.fn()
  },
  screenProps: {
    firebaseConnection: ''
  },
  ...props
});

it('should display AboutAppScreen with no errors', () => {

  const props: any = createTestProps({})
  expect(renderer.create(<AboutAppScreen {...props} />)).toMatchSnapshot();
});

test('send Comment button', () => {

  

})