import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import { Alert } from 'react-native'
import { User, IUser, UserInterest } from '../src/Helpers/UserStruct'
import LHCButton from '../src/Components/LHCButton/LHCButton'
import { ProfileScreen } from '../src/Screens/Profile/ProfileScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const createTestProps = (props: Object, editable: boolean) => ({
  navigation: {
    navigate: jest.fn(),
    getParam: (param: string) => { return {} },
    replace: jest.fn(),
    dispatch: jest.fn(),
    pop: jest.fn(),
    state: {
      params: {
        editable: editable
      }
    }
  },
  ...props
});

test('ProfileScreen constructor', () => {

  const props: any = createTestProps({}, true)
  const sut: any = new ProfileScreen(props)

  expect(sut.state.userName).toBe('')
  expect(sut.state.userLocation).toBe('')
  expect(sut.state.userContact).toBe('')
  expect(sut.state.userInterests).toEqual([])
})

test('ProfileScreen didMount on load Success', async () => {

  const testUser = User.create('name', 'loc', 'con', [UserInterest.create('d', 'e'), UserInterest.create('f', 'g')])
  const loadUserDetailsFunc = () => {

    return new Promise<IUser>((resolve, reject) => {
      resolve(testUser)
    })
  }

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: loadUserDetailsFunc,
        isLoggedIn: () => { return true }
      }
    }
  }, true);

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = await wrapper.instance()

  expect(sut.state.userName).toBe(testUser.userName)
  expect(sut.state.userLocation).toBe(testUser.userLocation)
  expect(sut.state.userContact).toBe(testUser.userContact)
  expect(sut.state.userInterests).toBe(testUser.userInterests)

})

test('ProfileScreen didMount on load Fail', async () => {

  jest.resetAllMocks()

  jest.mock('Alert', () => {
    return {
      alert: jest.fn()
    }
  });

  const errorResp = 'anError1'
  const loadUserDetailsFunc = () => {

    return new Promise<IUser>((resolve, reject) => {
      reject(errorResp)
    })
  }

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: loadUserDetailsFunc,
      }
    }
  }, true);

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = await wrapper.instance()

  expect(Alert.alert).toBeCalledTimes(1)
  expect(Alert.alert).toBeCalledWith('error: ' + errorResp)

})

test('saveButton Func Success', async () => {

  const testUser = User.create('name', 'loc', 'con', [UserInterest.create('d', 'e'), UserInterest.create('f', 'g')])
  const saveUserDetailsFunc = (user: IUser) => {

    expect(user.userName).toBe(testUser.userName)

    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve(testUser) }) },
        saveUserDetails: saveUserDetailsFunc
      }
    }
  }, true);

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = await wrapper.instance()

  await sut.saveButtonPressed()

  expect(props.navigation.pop).toHaveBeenCalledTimes(1)

})

test('saveButton Func FAIL', async () => {

  jest.resetAllMocks()

  jest.mock('Alert', () => {
    return {
      alert: jest.fn()
    }
  });

  const errorMsg = 'anErrora'
  const testUser = User.create('name', 'loc', 'con', [UserInterest.create('d', 'e'), UserInterest.create('f', 'g')])
  const saveUserDetailsFunc = (user: IUser) => {

    expect(user.userName).toBe(testUser.userName)

    return new Promise((resolve, reject) => {
      reject(errorMsg)
    })
  }

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve(testUser) }) },
        saveUserDetails: saveUserDetailsFunc
      }
    }
  }, true);

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = await wrapper.instance()

  await sut.saveButtonPressed()

  expect(Alert.alert).toBeCalledTimes(1)
  expect(Alert.alert).toBeCalledWith('Save Error: ' + errorMsg)

})

test('ProfileScreen handleNameChange function', () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) },
      }
    }
  }, true);

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()

  const textChange = 'abcd'
  sut.handleNameChange(textChange)

  expect(sut.state.userName).toBe(textChange)
})

test('ProfileScreen handleLocationChange function', () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) },
      }
    }
  }, true);

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()

  const textChange = 'abcd'
  sut.handleLocationChange(textChange)

  expect(sut.state.userLocation).toBe(textChange)
})

test('ProfileScreen handleContactChange function', () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) },
      }
    }
  }, true);

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()

  const textChange = 'abcd'
  sut.handleContactChange(textChange)

  expect(sut.state.userContact).toBe(textChange)
})

it('should display ProfileScreen Editable with no errors', () => {

  const props = createTestProps({
    screenProps: {
      firebaseConnection: {
        searchOtherUsers: jest.fn(),
        isLoggedIn: () => { return true },
        loadUserDetails: () => { return new Promise((resolve, reject) => { }) }
      }
    }
  }, true);

  expect(renderer.create(<ProfileScreen {...props} />)).toMatchSnapshot();
});

it('should display ProfileScreen Non-Editable with no errors', () => {

  let props = createTestProps({
    screenProps: {
      firebaseConnection: {
        searchOtherUsers: jest.fn(),
        isLoggedIn: () => { return true },
        loadUserDetails: () => { return new Promise((resolve, reject) => { }) }
      }
    }
  }, false);

  const newParams = {
    ...props.navigation.state.params,
    profile: {
      id: 'a',
      user: User.create('name', 'loc', 'con', [UserInterest.create('d', 'e'), UserInterest.create('f', 'g')])
    }
  }

  props.navigation.state.params = newParams

  expect(renderer.create(<ProfileScreen {...props} />)).toMatchSnapshot();
});


test('test save button push', () => {

  const props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) },
      }
    }
  }, true);

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()

  sut.saveButtonPressed = jest.fn()

  wrapper.find(LHCButton).at(0).simulate('selected')

  expect(sut.saveButtonPressed).toHaveBeenCalledTimes(1)
});

test('test logout button push', () => {

  const props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) },
      }
    }
  }, true);

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()

  sut.logoutButtonPressed = jest.fn()

  wrapper.find(LHCButton).at(1).simulate('selected')

  expect(sut.logoutButtonPressed).toHaveBeenCalledTimes(1)
});

test('test logout function', async () => {

  const logoutFunc = (): Promise<string> => {

    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        logout: logoutFunc,
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) }
      }
    }
  }, true);

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()

  await sut.logoutButtonPressed()
  expect(props.navigation.dispatch).toHaveBeenCalledTimes(1)
});

test('addInterestButtonPressed function', async () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) }
      }
    }
  }, true);

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()

  expect(sut.state.userInterests).toEqual([])
  expect(sut.render()).toMatchSnapshot();

  await sut.addInterestButtonPressed()

  expect(sut.state.userInterests).toEqual([{ description: '', title: '' }])
  expect(sut.render()).toMatchSnapshot();
})

test('editInterest Editable function', () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) }
      }
    }
  }, true);

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()
  const mockInterest = UserInterest.create('a', 'b')
  sut.editInterest(mockInterest)

  expect(props.navigation.navigate).toHaveBeenCalledTimes(1)
  expect(props.navigation.navigate).toBeCalledWith('Interest',
    expect.objectContaining({
      "editable": true,
      "previousUserInterest": {
        "description": "b",
        "title": "a",
      },
      "removeCallback": expect.any(Function),
      "saveCallback": expect.any(Function),
    })
  )
})

test('editInterest Non-Editable function', () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) }
      }
    }
  }, false);

  const newParams = {
    ...props.navigation.state.params,
    profile: {
      id: 'a',
      user: User.create('name', 'loc', 'con', [UserInterest.create('d', 'e'), UserInterest.create('f', 'g')])
    }
  }

  props.navigation.state.params = newParams

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()
  const mockInterest = UserInterest.create('a', 'b')
  sut.editInterest(mockInterest)

  expect(props.navigation.navigate).toHaveBeenCalledTimes(1)
  expect(props.navigation.navigate).toBeCalledWith('Interest',
    expect.objectContaining({
      "editable": false,
      "previousUserInterest": {
        "description": "b",
        "title": "a",
      },
      "removeCallback": expect.any(Function),
      "saveCallback": expect.any(Function),
    })
  )
})

test('editInterest saveCallback function', async () => {

  let sentParams: any = {}

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) }
      }
    }
  }, true);

  const newNavigation = {
    ...props.navigation, navigate: (screenName: string, params: any) => {

      sentParams = params
    }
  }
  props.navigation = newNavigation

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()
  const mockInterest = UserInterest.create('a', 'b')
  const mockInterestNew = UserInterest.create('c', 'd')
  sut.setState = jest.fn()

  await sut.editInterest(mockInterest)

  sentParams.saveCallback(mockInterestNew)

  expect(mockInterest).toEqual(mockInterestNew)

  expect(sut.setState).toHaveBeenCalledTimes(1)
  expect(sut.setState).toBeCalledWith({})

})

test('editInterest removeCallback function', async () => {

  let sentParams: any = {}

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) }
      }
    }
  }, true);

  props.navigation = {
    ...props.navigation,
    navigate: (screenName: string, params: any) => {

      sentParams = params
    }
  }

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()

  const mockInterest1 = UserInterest.create('a', 'b')
  const mockInterest2 = UserInterest.create('c', 'd')

  sut.setState({ userInterests: [mockInterest1, mockInterest2] })

  sut.setState = jest.fn()

  await sut.editInterest(mockInterest1)

  sentParams.removeCallback()

  expect(sut.setState).toHaveBeenCalledTimes(1)
  expect(sut.setState).toBeCalledWith({ userInterests: [mockInterest2] })

})

test('interestButtons Editable function with no interests', () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) }
      }
    }
  }, true);

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()

  const result: any = sut.interestButtons([])
  expect(result).toMatchSnapshot()
})

test('interestButtons Non-Editable function with no interests', () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) }
      }
    }
  }, false);

  const newParams = {
    ...props.navigation.state.params,
    profile: {
      id: 'a',
      user: User.create('name', 'loc', 'con', [UserInterest.create('d', 'e'), UserInterest.create('f', 'g')])
    }
  }

  props.navigation.state.params = newParams

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()

  const result: any = sut.interestButtons([])
  expect(result).toMatchSnapshot()
})

test('interestButtons Editable function with interests', () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) }
      }
    }
  }, true);

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()

  const mockInterest1 = UserInterest.create('a', 'b')
  const mockInterest2 = UserInterest.create('c', 'd')

  const result: any = sut.interestButtons([mockInterest1, mockInterest2])
  expect(result).toMatchSnapshot()
})

test('interestButtons Non-Editable function with interests', () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => { return new Promise((resolve) => { resolve() }) }
      }
    }
  }, false);

  const newParams = {
    ...props.navigation.state.params,
    profile: {
      id: 'a',
      user: User.create('name', 'loc', 'con', [UserInterest.create('d', 'e'), UserInterest.create('f', 'g')])
    }
  }

  props.navigation.state.params = newParams

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = wrapper.instance()

  const mockInterest1 = UserInterest.create('a', 'b')
  const mockInterest2 = UserInterest.create('c', 'd')

  const result: any = sut.interestButtons([mockInterest1, mockInterest2])
  expect(result).toMatchSnapshot()
})

test('inviteButtonPressed function', async () => {

  let props: any = createTestProps({
    screenProps: {
      firebaseConnection: { getCurrentUserID: () => { return '123' } }
    }
  }, false)

  const newParams = {
    ...props.navigation.state.params,
    profile: {
      id: 'a',
      user: User.create('name', 'loc', 'con', [UserInterest.create('d', 'e'), UserInterest.create('f', 'g')])
    }
  }
  props.navigation.state.params = newParams

  const navigateFunc = jest.fn()
  props.navigation.navigate = navigateFunc

  const wrapper = shallow(<ProfileScreen {...props} />);
  const sut: any = await wrapper.instance()


  await sut.inviteButtonPressed()

  expect(navigateFunc).toHaveBeenCalledTimes(1)
  expect(navigateFunc).toHaveBeenCalledWith('Invitation', { from: '123', to: 'a', viewMode: 'New' })

})