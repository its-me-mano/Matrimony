/* eslint-disable prettier/prettier */
import React, {createContext, useState,useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { storage } from '@react-native-firebase/storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return unsubscribe;
  }, []);

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
                  x:userData.profilePic||'',
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

                  // Now that the user is registered and we have their ID, update the user state
                  setUser(userCredential.user);

                  // Call the updateProfile function to upload the profile picture
                  await updateProfile(userData.profilePic, navigation);
                  navigation.navigate('Home');
              }
              } catch (e) {
                console.log(e);
              }
        },
        logout: async (navigation) => {
          try {
            await auth().signOut();
            navigation.navigate("Login")
          } 
          catch (e) {
            console.log(e);
          }
        },
        updateProfile: async (imageUri, navigation) => {
            if (!user) {
              console.log('User is not authenticated');
              return;
            }

            const userId = user.uid;
            const db = firestore();
            const userRef = db.collection('UserData').doc(userId);

            try {
              if (imageUri) {
                // Generate a unique filename for the image in Firebase Storage
                const filename = `profile_images/${Date.now()}.jpg`;
                const storageRef = storage().ref(filename);

                // Upload the image to Firebase Storage
                await storageRef.putFile(imageUri);

                // Get the download URL of the uploaded image
                const downloadURL = await storageRef.getDownloadURL();

                // Update Firestore with the download URL
                await userRef.update({ profilePic: downloadURL });
              }

              console.log('Profile picture updated successfully');
              navigation.navigate('Home');
            } catch (error) {
              console.error('Error updating profile picture:', error);
            }
}


      }}>
      {children}
    </AuthContext.Provider>
  );
};