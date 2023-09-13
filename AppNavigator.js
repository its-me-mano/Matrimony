/* eslint-disable prettier/prettier */
import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthPage/AuthProvider';
import LoginScreen from './AuthPage/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from './AuthPage/RegisterScreen';

const Stack = createStackNavigator();
const AppNavigator = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) {setInitializing(false);}
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

   if (initializing) return null;
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>  
    </NavigationContainer>
  );
};

export default AppNavigator;
