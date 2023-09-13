import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator'; // Import your navigator
import {AuthProvider} from './AuthPage/AuthProvider'; // Import your AuthProvider

const App = () => {
  return (
    <AuthProvider>
        <AppNavigator />
    </AuthProvider>
  );
};

export default App;
