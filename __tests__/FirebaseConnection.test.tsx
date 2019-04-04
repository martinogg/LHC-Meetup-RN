import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import { Button } from 'react-native'

import { HomeScreen } from '../src/Screens/Home/HomeScreen';
import FirebaseConnection from '../src/Helpers/FirebaseConnection'

test('FirebaseConnection Should initialise only one instance', () => {

    
    expect(FirebaseConnection.getInstance()).toBe(FirebaseConnection.getInstance())
})