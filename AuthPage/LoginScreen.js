/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './AuthProvider';
import Svg, { Path } from 'react-native-svg';

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();


  const handleRegister = () => {
    navigation.navigate('Register');
  };
  const handleForgotPassword=()=>{
    navigation.navigate("ForgotPassword");
  };
  return (
    <View style={styles.container}>
        <View style={styles.rectangle}>
          <Svg width={620} height={620} viewBox="0 0 379 578" fill={"#888"}>
            <Path
              d="M0.635931 40.8409C0.473036 30.3794 14.4535 26.725 19.4307 35.9281L49.6587 91.8207C64.2212 118.747 99.9432 125.318 123.134 105.336V105.336C146.873 84.8829 183.529 92.322 197.417 120.411L227.421 181.1C241.899 210.385 280.111 218.146 304.867 196.831L361.973 147.661C368.535 142.01 378.69 146.806 378.495 155.464L369 578H9L0.635931 40.8409Z"
              fill={"#BA0F6B"}
              fillOpacity={0.1}
            />
          </Svg>
        </View>
      <View style={styles.inputContainer}>
      <Text style={styles.containerTitle}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email / Phone Number"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.forgotButton} onPress={handleForgotPassword}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightButton}
          onPress={()=>login(email,password)}>
          <Text style={styles.buttonTextLogin}>Submit</Text>
        </TouchableOpacity>
        <View style={styles.container1}>
          <Text style={styles.c1text}>Not a member?</Text>
        </View>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={handleRegister}
        >
          <Text style={styles.buttonTextRegister}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffffff',
  },  
  rectangle:{
    position:"absolute",
    left:-120,
    top:100,
    width:379,
    height:578,
    overflow:"visible",
  },
  rectangle26icon:{
    height:100,
    width:100,
  },
  inputContainer:{
    flex:1,
    flexDirection:"column",
    gap:15,
    left:0,
    top:240,
  },
  input: {
    fontFamily:'Poppins',
    color:'#000',
    fontSize:15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, // Adjust the offset for the desired shadow position
    shadowOpacity: 1, // Adjust the opacity for the desired shadow intensity
    shadowRadius: 3, // Adjust the radius for the desired shadow blur
    backgroundColor: '#F6F6F6', // Set a background color for the shadow to be visible
    width: 330,
    padding:10,
    height: 55,
    borderRadius:8,
  },
  containerTitle:{
    fontSize:40,
    fontWeight:'bold',
    color:'black',
    left:0,
    marginBottom:40,
  },
  forgotButton: {
    alignItems:'flex-end',
  },
  navButtonText: {
    fontSize: 20,
    fontWeight:'500',
    color: 'black',
    fontFamily: 'Lato-Regular',
  },
  leftButton: {
    alignItems:'center',
    justifyContent:'center',
  },
  rightButton: {
    backgroundColor: '#BA0F6B',
    paddingVertical: 15,
    alignItems:'center',
    borderRadius: 5,
  },
  buttonTextLogin: {
    color: 'white',
    fontSize:20,
    fontWeight:'bold',
  },  
  buttonTextRegister: {
    color: '#BA0F6B',
    fontSize:30,
    fontWeight:'bold',
  },  
  container1: {
    justifyContent:'center',
    alignItems:'center',
  },
  c1text:{
    fontSize:14,
    color:'black',
  }
});

export default LoginScreen;