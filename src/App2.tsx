import {createStackNavigator, createAppContainer} from 'react-navigation';
import OldApp from './OldApp'
import {HomeScreen} from './HomeScreen'; 
import {ProfileScreen} from './ProfileScreen'; 

const MainNavigator = createStackNavigator({
  Home: {screen: OldApp},
  //Home: {screen: HomeScreen},
  //Profile: {screen: ProfileScreen},
});

const App = createAppContainer(MainNavigator);

export default OldApp;
//export default App;