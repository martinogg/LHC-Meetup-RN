import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import { Button } from 'react-native'

import { HomeScreen } from '../src/Screens/Home/HomeScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('should display HomeScreen with no errors', () => {

    const navigation = { navigate: jest.fn() };
    expect(renderer.create(<HomeScreen navigation={navigation} />)).toMatchSnapshot();
});

test('test onPress About functionality', () => {

    const navigateFunc = jest.fn()
    const navigation = { navigate: navigateFunc };
  
    const wrapper = shallow(<HomeScreen navigation={navigation} />);
  
    wrapper.find(Button).first().simulate('press')
  
    expect(navigateFunc).toHaveBeenCalledTimes(1)
    expect(navigateFunc).toHaveBeenCalledWith('AboutApp')
  });
  
  test('test onPress EditDetails functionality', () => {

    const navigateFunc = jest.fn()
    const navigation = { navigate: navigateFunc };
  
    const wrapper = shallow(<HomeScreen navigation={navigation} />);
  
    wrapper.find(Button).at(1).simulate('press')
  
    expect(navigateFunc).toHaveBeenCalledTimes(1)
    expect(navigateFunc).toHaveBeenCalledWith('EditDetails')
  });