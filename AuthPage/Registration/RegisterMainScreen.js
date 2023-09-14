import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen1 from './RegisterScreen1';
import RegisterScreen2 from './RegisterScreen2';
import RegisterScreen3 from './RegisterScreen3';
import RegisterScreen4 from './RegisterScreen4';
import { RollInLeft } from 'react-native-reanimated';
import { Text, StyleSheet } from 'react-native';
const Stack = createStackNavigator();

const RegisterMainScreen = () => {
  // Define the userData state and a function to update it
  const [userData, setUserData] = useState({
    email:'',
    password:'',
    fullName: '',
    dob: '',
    address: '',
    maritualStatus: '',
    country: '',
    state: '',
    city: '',
    citizenShip: '',
    gender: '',
    motherTongue: '',
    subCaste: '',
    theoneRegistered: '',
    height: '',
    education: '',
    employed: '',
    occupation: '',
    physicalStatus: '',
    familyStatus: '',
    familyType: '',
    aboutMe: '',
    dosam: '',
    star: '',
    raasi: '',
    gothram: '',
    timeOfBirth: '',
    countryOfBirth: '',
    stateOfBirth: '',
    cityOfBirth: '',
    horoscopeChartStyle: '',
  });

  // Function to update userData
  const updateUserData = data => {
    setUserData({...userData, ...data});
  };

  return (
    <Stack.Navigator initialRouteName="Step1">
      <Stack.Screen
        name="Step1"
        // Pass userData and the updateUserData function as props to RegisterScreen1
        children={({navigation}) => (
          <RegisterScreen1
            userData={userData}
            updateUserData={updateUserData}
            navigation={navigation}
          />
        )}
        options={{
          headerLeft: null,
          headerShown: false,
        }}
      />
          <Stack.Screen
        name="Step2"
        children={({ route, navigation }) => (
          <RegisterScreen2
            userData={userData}
            updateUserData={updateUserData}
            route={route}
            navigation={navigation}
          />
        )}
        options={({ route }) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#BA0F6B' // Set your desired header background color here
          },
          headerTitle: () => (
            <Text style={styles.customHeaderTitle}>MANAMALAI</Text>
          )
        })}
      />



      <Stack.Screen
        name="Step3"
        // Pass userData and the updateUserData function as props to RegisterScreen2
        children={({route, navigation}) => (
          <RegisterScreen3
            userData={userData}
            updateUserData={updateUserData}
            route={route}
            navigation={navigation}
          />
        )}
        options={({ route }) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#BA0F6B', // Set your desired header color here
          },
          headerTitle: () => (
            <Text style={styles.customHeaderTitle}>MANAMALAI</Text>
          ),
        })}
      />
      <Stack.Screen
        name="Step4"
        // Pass userData and the updateUserData function as props to RegisterScreen2
        children={({route, navigation}) => (
          <RegisterScreen4
            userData={userData}
            updateUserData={updateUserData}
            route={route}
            navigation={navigation}
          />
        )}
        options={({ route }) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#BA0F6B', // Set your desired header color here
          },
          headerTitle: () => (
            <Text style={styles.customHeaderTitle}>MANAMALAI</Text>
          ),
        })}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  customHeaderTitle: {
    fontSize: 18, // Adjust the font size as needed
    fontWeight: 'bold', // Apply any desired text styles
    color: '#EEC219', // Set the desired text color
  },
});


export default RegisterMainScreen;
