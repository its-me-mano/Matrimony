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
        login: async (email, password,navigation) => {
            try {
              console.log("Entered",email,password);
              if(email!=null && password!=null){
              await auth().signInWithEmailAndPassword(email, password);
              navigation.navigate("Image");
              console.log('Successfully');
              }
            } catch (e) {
              console.log(e);
            }
            },
        register: async (userData,navigation) => {
                try {
                  if(userData.email!=null && userData.password!=null){
                  const userCredential = await auth().createUserWithEmailAndPassword(
              userData.email,
              userData.password,
            );
            console.log('Registration successful', userCredential.user);

            // Get the user's unique ID
            const userId = userCredential.user.uid;

            // Create a reference to the Firestore collection where you want to store user data
            const usersCollection = firestore().collection('UserData');

            // Define the data you want to store
            const userDataToStore = {
            profilePic:userData.profilePic||'',
            fullName: userData.fullName || '', // Use an empty string as a default value
            dob: userData.dob ? userData.dob.toString() : '', // Convert to a string or use an empty string
            address: userData.address || '',
            details: userData.details || '',
            gender: userData.gender || '',
            motherTongue: userData.motherTongue || '',
            subCaste: userData.subCaste || '',
            theoneRegistered: userData.theoneRegistered || '',
            height: userData.height || '',
            education: userData.education || '',
            employed: userData.employed || '',
            occupation: userData.occupation || '',
            physicalStatus: userData.physicalStatus || '',
            familyStatus: userData.familyStatus || '',
            familyType: userData.familyType || '',
            aboutMe: userData.aboutMe || '',
            dosam: userData.dosam || '',
            star: userData.star || '',
            raasi: userData.raasi || '',
            gothram: userData.gothram || '',
            timeOfBirth: userData.timeOfBirth || '',
            countryOfBirth: userData.countryOfBirth || '',
            stateOfBirth: userData.stateOfBirth || '',
            cityOfBirth: userData.cityOfBirth || '',
            horoscopeChartStyle: userData.horoscopeChartStyle || '',
          };


            // Use the user's ID as the document ID in Firestore
            await usersCollection.doc(userId).set(userDataToStore);
            navigation.navigate('RegistrationSuccess');
                  }
          } catch (e) {
            console.log(e);
          }
        },
        logout: async (navigation) => {
          try {
            await auth().signOut();
            navigation.navigate("Login")
          } catch (e) {
            console.log(e);
          }
        },
        updateProfile: async (imageUrl,navigation) => {
            if (!user) {
              console.log('User is not authenticated');
              return;
            }

            const userId = user.uid;
            const db = firestore();
            const userRef = db.collection('UserData').doc(userId);

            try {
              await userRef.update({
                profilePic: imageUrl,
              });
              console.log('Profile picture updated successfully');
              navigation.navigate("Home")
            } catch (error) {
              console.error('Error updating profile picture:', error);
            }
      }

      }}>
      {children}
    </AuthContext.Provider>
  );
};