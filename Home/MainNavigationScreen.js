// TabNavigator.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../TabNavigation/HomeScreen';

const Tab = createBottomTabNavigator();

function MainNavigationScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default MainNavigationScreen;
