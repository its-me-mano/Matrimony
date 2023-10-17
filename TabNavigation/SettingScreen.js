import React, { useState, useEffect, useContext } from 'react';
import { View, Text,Image, StyleSheet,Dimensions,Button } from 'react-native';
import { AuthContext } from '../AuthPage/AuthProvider';
import { useNavigation } from '@react-navigation/native';
const SettingScreen = () => {
  const { width, height } = Dimensions.get('window');
  const boxWidth =width * 0.87;
  const boxHeight = height * 0.25;
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
          <Text>Account</Text>
          <Text>Notification</Text>
          <Text>Terms & Condition</Text>
          <Text>Privacy Policy</Text>
          <Text>About</Text>
          <Button style={styles.signoutBtn} title="SignOut" onPress={() => logout(navigation)} />
    </View>
  );
};

const styles=StyleSheet.create({
    container:{
        marginTop:10,
        marginBottom:20
    }

});

export default SettingScreen;
