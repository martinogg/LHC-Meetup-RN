/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import { createAppContainer, createStackNavigator } from 'react-navigation'

import { EditScreen } from './Screens/Edit/EditScreen'
import { HomeScreen } from './Screens/Home/HomeScreen'
import { LoginScreen } from './Screens/Login/LoginScreen'
import { RegisterScreen } from './Screens/Register/RegisterScreen'

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  EditDetails: { screen: EditScreen },
  Home: { screen: HomeScreen }
},
  { initialRouteName: 'Login' });

const App = createAppContainer(MainNavigator);

export default App;
