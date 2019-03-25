import React from 'react';
import 'react-native';

import {RegisterScreen} from '../src/Screens/Register/RegisterScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should display RegisterScreen with no errors', () => {

  expect(renderer.create(<RegisterScreen/>)).toMatchSnapshot();
});
