/**
 * @format
 */

 // TODO -- Tidy this up

import React from 'react';
import 'react-native';

import { shallow } from 'enzyme'

import App from '../src/App'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

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

it('should work', () => {

  expect(1).toBe(1)
})

/* // TODO : Test App Class (navigation)

describe("App", () => {
  const props = createTestProps({});
  const wrapper = shallow(<App {...props} />);
                               
  describe("rendering", () => {
    it("should render a <View />", () => {
      expect(wrapper.find("View")).toHaveLength(1);
    });
  });
});
*/