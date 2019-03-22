/**
 * @format
 */

import { shallow } from "enzyme";
import React from 'react';
import 'react-native';

import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

/*
it('renders correctly', () => {
  renderer.create(<App />);
});

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

describe("App", () => {
  const props = createTestProps({});
  const wrapper = shallow<App>(<App {...props} />);
                               
  describe("rendering", () => {
    it("should render a <View />", () => {
      expect(wrapper.find("View")).toHaveLength(1);
    });
  });
});