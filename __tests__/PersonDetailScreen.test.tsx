import React from 'react';
import 'react-native';

import {PersonDetailScreen} from '../src/Screens/PersonDetail/PersonDetailScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should display PersonDetailScreen with no errors', () => {

  expect(renderer.create(<PersonDetailScreen/>)).toMatchSnapshot();
});
