import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const sendPasswordResetEmail = async (email) => {
    try {
      await auth().sendPasswordResetEmail(email);
      console.log("Reset MailId sent");
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter your email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Button title="Reset Password" onPress={() => sendPasswordResetEmail(email)} />
    </View>
  );
};

export default ForgotPasswordScreen;
