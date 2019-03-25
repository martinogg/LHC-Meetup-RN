import React from 'react';
import 'react-native';

import {BrowseScreen} from '../src/Screens/Browse/BrowseScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should display BrowseScreen with no errors', () => {

  expect(renderer.create(<BrowseScreen/>)).toMatchSnapshot();
});
