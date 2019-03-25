import React from 'react';
import 'react-native';

import {FeedbackScreen} from '../src/Screens/Feedback/FeedbackScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should display FeedbackScreen with no errors', () => {

  expect(renderer.create(<FeedbackScreen/>)).toMatchSnapshot();
});
