/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { fail } from 'assert';
import { exportAllDeclaration } from '@babel/types';


test('renders correctly', () => {
  renderer.create(<App />);
});

it('This test will fail', () => {
  expect(true).toBe(false);
})