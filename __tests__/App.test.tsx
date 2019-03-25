/**
 * @format
 */

 // TODO -- Tidy this up

import React from 'react';
import 'react-native';

import {HomeScreen} from '../src/HomeScreen';
import {ProfileScreen} from '../src/ProfileScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should display HomeScreen with no errors', () => {
  const navigation = { navigate: jest.fn() };

  expect(renderer.create(<HomeScreen navigation={navigation} />)).toMatchSnapshot();
});

it('should display ProfileScreen with no errors', () => {

  expect(renderer.create(<ProfileScreen/>)).toMatchSnapshot();
});

/*
// Add 'export' to fake this being a module to silence TSLint.
export const add = (a: number, b: number) => a + b;
describe("add", () => {
  it("should add two numbers", () => {
    expect(add(1, 1)).toEqual(2);
  });
});
*/

export const createTestProps = (props: object) => ({
  ...props
});

it("should work", () => {

  expect(1).toBe(1)
})
/*
describe("App", () => {
  const props = createTestProps({});
  const wrapper = shallow<App>(<App {...props} />);
                               
  describe("rendering", () => {
    it("should render a <View />", () => {
      expect(wrapper.find("View")).toHaveLength(1);
    });
  });
});
*/