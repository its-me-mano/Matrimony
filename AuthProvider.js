/* eslint-disable prettier/prettier */
import React, { useState, createContext } from 'react'; // Import createContext
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext(); // Create the context

export const AuthProvider = ({ children }) => { // Use destructuring to get 'children' as a prop
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => { // Fix destructuring of email and password
          try {
            await auth().signInWithEmailAndPassword(email, password); // Fix variable case 'Password'
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => { // Fix destructuring of email and password
          try {
            await auth().createUserWithEmailAndPassword(email, password); // Fix variable case 'Password'
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
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
