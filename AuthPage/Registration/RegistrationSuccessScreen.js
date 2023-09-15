import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RegistrationSuccessScreen = ({ navigation }) => {
  useEffect(() => {
    // Use a setTimeout to navigate to ImageUploadScreen after 5 seconds
    const timeoutId = setTimeout(() => {
      navigation.replace('Image'); // Replace the current screen with ImageUpload
    }, 100000); // 5000 milliseconds (5 seconds)

    // Clear the timeout when the component unmounts (cleanup)
    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Registered Successfully!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default RegistrationSuccessScreen;
