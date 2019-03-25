import React from 'react';
import 'react-native';

import {HomeScreen} from '../src/Screens/Home/HomeScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should display HomeScreen with no errors', () => {

  expect(renderer.create(<HomeScreen/>)).toMatchSnapshot();
});
