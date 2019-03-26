/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import {createStackNavigator, createAppContainer} from 'react-navigation';
import {LoginScreen} from './Screens/Login/LoginScreen'
import {RegisterScreen} from './Screens/Register/RegisterScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: LoginScreen},
  Register: {screen: RegisterScreen}
});

const App = createAppContainer(MainNavigator);

export default App;
