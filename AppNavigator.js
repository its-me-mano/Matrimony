/* eslint-disable prettier/prettier */
import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthPage/AuthProvider';
import LoginScreen from './AuthPage/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterMainScreen from './AuthPage/Registration/RegisterMainScreen';
import ImageUploadScreen from './AuthPage/ImageUploadScreen';
import RegistrationSuccessScreen from './AuthPage/Registration/RegistrationSuccessScreen';
import HomeScreen from './TabNavigation/HomeScreen';
import ForgotPasswordScreen from './AuthPage/ForgotPasswordScreen';

const Stack = createStackNavigator();
const AppNavigator = () => {
  const {user, setUser,registrationSuccess} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) {setInitializing(false);}
  };

  useEffect(() => {
    {console.log(registrationSuccess)}
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

   if (initializing) return null;
  return(
    <NavigationContainer>
     {user==null?(
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="Register"
          component={RegisterMainScreen}
          options={{
            headerLeft: null, 
            headerShown: false// Hide the back arrow
          }}
        />
      </Stack.Navigator>
     ):(
        <Stack.Navigator initialRouteName={registrationSuccess ? 'Home' : 'Home'}>
           {registrationSuccess ? (
            <Stack.Screen name="RegistrationSuccess" component={RegistrationSuccessScreen} />
            ) : null}
            <Stack.Screen
                  name="Image"
                  component={ImageUploadScreen}
                  options={{
                    headerLeft: null, 
                    headerTitle:"<",
                    headerShown: true,// Hide the back arrow
                    headerStyle:{
                      backgroundColor:'#BA0F6B',
                    }
                  }}
                  // })}
                />
            <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    headerLeft: null, 
                    headerShown: false// Hide the back arrow
                  }}
                />
        </Stack.Navigator>
     )
     }
    </NavigationContainer>
  );
};

export default AppNavigator;