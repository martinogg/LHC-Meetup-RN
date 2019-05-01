import React from 'react';
import { Alert } from 'react-native';

import { IUser, User, IUserFromFirebase, UserInterest } from '../src/Helpers/UserStruct'
import { BrowseScreen } from '../src/Screens/Browse/BrowseScreen';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

const createTestProps = (props: Object) => ({
  navigation: {
    push: jest.fn(),
    replace: jest.fn(),
    dispatch: jest.fn()
  },
  ...props
});


const userlist = () => {
  return new Promise<IUserFromFirebase[]>((resolve, reject) => {
    resolve(
      [
        {
          id: '1', user:
            User.create('a', 'b', 'c', [UserInterest.create('d', 'e'), UserInterest.create('f', 'g')])
        },
        {
          id: '2', user:
            User.create('e', 'f', 'g', [UserInterest.create('h', 'i'), UserInterest.create('j', 'k')])
        },
      ])
  })
}

test('BrowseScreen constructor', async () => {

  const searchOtherUsersFunc = () => {

    return userlist()
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

  const sut: any = await new BrowseScreen(props)

  expect(sut.state).toEqual({ "users": [], searchText: '' })

})

test('BrowseScreen searchButtonPressed', async () => {

  const searchedString = 'aSearchQuery'

  const searchOtherUsersFunc = (text: string) => {

    expect(text).toBe(searchedString)
    return userlist()
  }

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        searchOtherUsers: () => { return userlist() },
        isLoggedIn: () => { return true }
      }
    }
  });

  const wrapper = shallow(<BrowseScreen {...props} />);
  const sut: any = await wrapper.instance()

  props.screenProps.firebaseConnection.searchOtherUsers = searchOtherUsersFunc
  await sut.setState({ searchText: searchedString })
  await sut.searchButtonPressed()

  expect(sut.state).toEqual({ "searchText": "aSearchQuery", "users": [{ "id": "1", "user": { "userContact": "c", "userInterests": [{ "description": "e", "title": "d" }, { "description": "g", "title": "f" }], "userLocation": "b", "userName": "a" } }, { "id": "2", "user": { "userContact": "g", "userInterests": [{ "description": "i", "title": "h" }, { "description": "k", "title": "j" }], "userLocation": "f", "userName": "e" } }] })
})

test('should display BrowseScreen with no errors', async () => {

  const searchOtherUsersFunc = () => {

    return userlist()
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

  expect(await renderer.create(<BrowseScreen {...props} />)).toMatchSnapshot();
})

test('onChangeSearchText', () => {

  const searchedString = 'aSearchQuery'

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        searchOtherUsers: () => { return userlist() }
      }
    }
  });

  const wrapper = shallow(<BrowseScreen {...props} />);
  const sut: any = wrapper.instance()

  sut.onChangeSearchText(searchedString)

  expect(sut.state.searchText).toEqual(searchedString)

})

test('BrowseScreen searchButtonPressed on Error', async () => {

  jest.resetAllMocks()

  jest.mock('Alert', () => {
    return {
      alert: jest.fn()
    }
  });

  const errorResp = 'anError'

  const searchOtherUsersFunc = (text: string) => {

    return new Promise<IUserFromFirebase[]>((resolve, reject) => {
      reject(errorResp)
    })
  }

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        searchOtherUsers: () => { return userlist() },
        isLoggedIn: () => { return true }
      }
    }
  });

  const wrapper = shallow(<BrowseScreen {...props} />);
  const sut: any = await wrapper.instance()

  props.screenProps.firebaseConnection.searchOtherUsers = searchOtherUsersFunc
  await sut.searchButtonPressed()

  expect(Alert.alert).toBeCalledTimes(1)
  expect(Alert.alert).toBeCalledWith('error: ' + errorResp)
})

test('onUserSelected function', () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        searchOtherUsers: () => { return userlist() },
        isLoggedIn: () => { return true }
      }
    },
    navigation: {
      push: jest.fn()
    }
  });

  const wrapper = shallow(<BrowseScreen {...props} />);
  const sut: any = wrapper.instance()

  const mockUser: IUserFromFirebase = {
    id: '1111',
    user: User.create('a', 'b', 'c', [])
  }
  sut.onUserSelected(mockUser)

  expect(props.navigation.push).toHaveBeenCalledTimes(1)
  expect(props.navigation.push).toHaveBeenCalledWith('Profile', { profile: mockUser, editable: false, invitable: true })
})