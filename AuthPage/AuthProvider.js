/* eslint-disable prettier/prettier */
import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
            try {
              console.log("Entered",email,password);
              if(email!=null && password!=null){
              await auth().signInWithEmailAndPassword(email, password);
              console.log('Successfully');
              }
            } catch (e) {
              console.log(e);
            }
            },
        register: async (email, password,userData,navigation) => {
                try {
                  const userCredential = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            console.log('Registration successful', userCredential.user);

            // Get the user's unique ID
            const userId = userCredential.user.uid;

            // Create a reference to the Firestore collection where you want to store user data
            const usersCollection = firestore().collection('UserData');

            // Define the data you want to store
            const userDataToStore = {
              fullName: userData.fullName,
              dob: userData.dob, // Convert to a string or any desired format
              address: userData.address,
              details: userData.details,
              gender: userData.gender,
              motherTongue: userData.motherTongue,
              subCaste: userData.subCaste,
              theoneRegistered: userData.theoneRegistered,
              // Add other user data properties here
            };

            // Use the user's ID as the document ID in Firestore
            await usersCollection.doc(userId).set(userDataToStore);
            navigation.navigate('RegistrationSuccess');
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};