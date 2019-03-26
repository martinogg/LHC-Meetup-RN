import React from 'react';
import 'react-native';

import { HomeScreen } from '../src/Screens/Home/HomeScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should display HomeScreen with no errors', () => {

    const navigation = { navigate: jest.fn() };
    expect(renderer.create(<HomeScreen navigation={navigation} />)).toMatchSnapshot();
});
