import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import { Alert, Button } from 'react-native'
import { User, IUser } from '../src/Helpers/UserStruct'

import { EditScreen } from '../src/Screens/Edit/EditScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    replace: jest.fn(),
    dispatch: jest.fn(),
    pop: jest.fn()
  },
  ...props
});

test('EditScreen constructor', () => {

  const props: any = createTestProps({})
  const sut: any = new EditScreen(props)

  expect(sut.state.userName).toBe('')
  expect(sut.state.userLocation).toBe('')
  expect(sut.state.userContact).toBe('')
  expect(sut.state.userInterests).toBe('')
})

test('EditScreen didMount on load Success', async () => {

  const testUser = User.create('name', 'loc', 'con', 'int')
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
  });

  const wrapper = shallow(<EditScreen {...props} />);
  const sut: any = await wrapper.instance()

  expect(sut.state.userName).toBe(testUser.userName)
  expect(sut.state.userLocation).toBe(testUser.userLocation)
  expect(sut.state.userContact).toBe(testUser.userContact)
  expect(sut.state.userInterests).toBe(testUser.userInterests)

})

test('EditScreen didMount on load Fail', async () => {
  
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
  });

  const wrapper = shallow(<EditScreen {...props} />);
  const sut: any = await wrapper.instance()

  expect(Alert.alert).toBeCalledTimes(1)
  expect(Alert.alert).toBeCalledWith('error: ' + errorResp)

})

test('saveButton Func Success', async () => {

  const testUser = User.create('name', 'loc', 'con', 'int')
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
        loadUserDetails: () => {return new Promise((resolve)=>{resolve(testUser)})},
        saveUserDetails: saveUserDetailsFunc
      }
    }
  });

  const wrapper = shallow(<EditScreen {...props} />);
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
  const testUser = User.create('name', 'loc', 'con', 'int')
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
        loadUserDetails: () => {return new Promise((resolve)=>{resolve(testUser)})},
        saveUserDetails: saveUserDetailsFunc
      }
    }
  });

  const wrapper = shallow(<EditScreen {...props} />);
  const sut: any = await wrapper.instance()

  await sut.saveButtonPressed()

  expect(Alert.alert).toBeCalledTimes(1)
  expect(Alert.alert).toBeCalledWith('Save Error: ' + errorMsg)

})

test('EditScreen handleNameChange function', () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => {return new Promise((resolve)=>{resolve()})},
      }
    }
  });

  const wrapper = shallow(<EditScreen {...props} />);
  const sut: any = wrapper.instance()

  const textChange = 'abcd'
  sut.handleNameChange(textChange)

  expect(sut.state.userName).toBe(textChange)  
})

test('EditScreen handleLocationChange function', () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => {return new Promise((resolve)=>{resolve()})},
      }
    }
  });

  const wrapper = shallow(<EditScreen {...props} />);
  const sut: any = wrapper.instance()

  const textChange = 'abcd'
  sut.handleLocationChange(textChange)

  expect(sut.state.userLocation).toBe(textChange)  
})

test('EditScreen handleContactChange function', () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => {return new Promise((resolve)=>{resolve()})},
      }
    }
  });

  const wrapper = shallow(<EditScreen {...props} />);
  const sut: any = wrapper.instance()

  const textChange = 'abcd'
  sut.handleContactChange(textChange)

  expect(sut.state.userContact).toBe(textChange)  
})

test('EditScreen handleInterestsChange function', () => {

  let props: any;
  props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => {return new Promise((resolve)=>{resolve()})},
      }
    }
  });

  const wrapper = shallow(<EditScreen {...props} />);
  const sut: any = wrapper.instance()

  const textChange = 'abcd'
  sut.handleInterestsChange(textChange)

  expect(sut.state.userInterests).toBe(textChange)  
})

it('should display EditScreen with no errors', () => {

  const props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => {return new Promise((resolve)=>{resolve()})},
      }
    }
  });

  expect(renderer.create(<EditScreen {...props}/>)).toMatchSnapshot();
});

test('test save button push', () => {

  const props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => {return new Promise((resolve)=>{resolve()})},
      }
    }
  });

  const wrapper = shallow(<EditScreen {...props} />);
  const sut: any = wrapper.instance()

  sut.saveButtonPressed = jest.fn()

  wrapper.find(Button).at(0).simulate('press')

  expect(sut.saveButtonPressed).toHaveBeenCalledTimes(1)
});

test('test cancel push', async () => {

  const props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => {return new Promise((resolve)=>{resolve()})},
      }
    }
  });

  const wrapper = shallow(<EditScreen {...props} />);
  const sut: any = await wrapper.instance()

  sut.cancelButtonPressed = jest.fn()

  wrapper.find(Button).at(1).simulate('press')

  expect(sut.cancelButtonPressed).toHaveBeenCalledTimes(1)
});

test('test logout button push', () => {

  const props = createTestProps({
    screenProps: {
      firebaseConnection: {
        loadUserDetails: () => {return new Promise((resolve)=>{resolve()})},
      }
    }
  });

  const wrapper = shallow(<EditScreen {...props} />);
  const sut: any = wrapper.instance()

  sut.logoutButtonPressed = jest.fn()

  wrapper.find(Button).at(2).simulate('press')

  expect(sut.logoutButtonPressed).toHaveBeenCalledTimes(1)
});

test('test cancelButtonPressed function', async () => {
  let props: any;
  props = createTestProps({})

  const sut: any = new EditScreen(props)
  await sut.cancelButtonPressed()

  expect(props.navigation.pop).toHaveBeenCalledTimes(1)
})

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
        loadUserDetails: () => {return new Promise((resolve)=>{resolve()})}
      }
    }
  });

  const wrapper = shallow(<EditScreen {...props} />);
  const sut: any = wrapper.instance()

  await sut.logoutButtonPressed()
  expect(props.navigation.dispatch).toHaveBeenCalledTimes(1)
});