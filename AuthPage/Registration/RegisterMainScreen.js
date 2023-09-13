import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen1 from './RegisterScreen1';

const Stack = createStackNavigator();

const RegisterMainScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Step1">
    <Stack.Screen
          name="Step1"
          component={RegisterScreen1}
          options={{
            headerLeft: null, 
            headerShown: false// Hide the back arrow
          }}
        />
    </Stack.Navigator>
  );
};

export default RegisterMainScreen;
