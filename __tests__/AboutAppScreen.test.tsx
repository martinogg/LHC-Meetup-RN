import React from 'react';
import 'react-native';

import {AboutAppScreen} from '../src/Screens/AboutApp/AboutAppScreen'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should display FeedbackScreen with no errors', () => {

  expect(renderer.create(<AboutAppScreen/>)).toMatchSnapshot();
});
