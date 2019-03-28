import React from 'react';
import 'react-native';

import { shallow } from 'enzyme'

import App from '../src/App'

import renderer from 'react-test-renderer';

it("should always pass", () => {
  expect(1).toBe(1);
});

/* // TODO : Test App Class (navigation)

describe("App", () => {
  export const createTestProps = (props: object) => ({
  ...props
});
  const props = createTestProps({});
  const wrapper = shallow(<App {...props} />);

  describe("rendering", () => {
    it("should render a <View />", () => {
      expect(wrapper.find("View")).toHaveLength(1);
    });
  });
});
*/