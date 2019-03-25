import React from 'react';
import 'react-native';

import {LoginScreen} from '../src/Screens/Login/LoginScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should display LoginScreen with no errors', () => {

  expect(renderer.create(<LoginScreen/>)).toMatchSnapshot();
});
