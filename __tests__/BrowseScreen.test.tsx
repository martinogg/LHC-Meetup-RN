import React from 'react';
import 'react-native';

import { IUser, User } from '../src/Helpers/UserStruct'
import { BrowseScreen } from '../src/Screens/Browse/BrowseScreen';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    replace: jest.fn(),
    dispatch: jest.fn()
  },
  ...props
});

it('should display BrowseScreen with no errors', () => {

  const searchOtherUsersFunc = () => {

    return new Promise<IUser[]>((resolve, reject) => {
      resolve([User.create('a','b','c','d'),User.create('e','f','g','h')])
    })
  }

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        searchOtherUsers: searchOtherUsersFunc,
        isLoggedIn: () => { return true }
      }
    }
  });

  expect(renderer.create(<BrowseScreen {...props} />)).toMatchSnapshot();
});
