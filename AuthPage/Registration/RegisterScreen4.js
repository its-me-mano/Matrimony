/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../AuthProvider';
import { useNavigation } from '@react-navigation/native';

const SquareRadioButton = ({label, selected, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={[styles.radioButton, selected && styles.radioButtonSelected]}>
          {selected && <View style={styles.radioButtonInner} />}
          <Text style={styles.radioButtonLabel}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

const RegisterScreen4 = ({ userData, updateUserData }) => {
  const { register } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState(null);  
  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate('Step4');
  };
  const handleInputChange = (fieldName, value) => {
    setSelectedOption(value);
    updateUserData({ [fieldName]: value });
  };

  return (
    <ScrollView>
    <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.detailsTitle}>Star/Nakshatram</Text>
          <TextInput
            style={styles.input}
            placeholder="Star/Nakshatram"
            value={userData.star}
            onChangeText={text => handleInputChange('star', text)}
          />
        </View>
      

       {/* Raasi */}
       <View style={styles.inputContainer}>
          <Text style={styles.detailsTitle}>Raasi</Text>
          <TextInput
            style={styles.input}
            placeholder="Raasi"
            value={userData.raasi}
            onChangeText={text => handleInputChange('raasi', text)}
          />
        </View>
      

         {/* Gothram */}
         <View style={styles.inputContainer}>
          <Text style={styles.detailsTitle}>Gothram</Text>
          <TextInput
            style={styles.input}
            placeholder="Gothram"
            value={userData.gothram}
            onChangeText={text => handleInputChange('gothram', text)}
          />
        </View>
      

         {/* Time Of Birth for Horoscope */}
         <View style={styles.inputContainer}>
          <Text style={styles.detailsTitle}>Time Of Birth for Horoscope</Text>
          <TextInput
            style={styles.input}
            placeholder="Time Of Birth for Horoscope"
            value={userData.timeOfBirth}
            onChangeText={text => handleInputChange('timeOfBirth', text)}
          />
        </View>
      
        <View style={styles.inputContainer}>
          <Text style={styles.detailsTitle}>Country of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="Country of Birth"
            value={userData.countryOfBirth}
            onChangeText={text => handleInputChange('countryOfBirth', text)}
          />
        </View>
      
      
        <View style={styles.inputContainer}>
          <Text style={styles.detailsTitle}>State of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="State of Birth"
            value={userData.stateOfBirth}
            onChangeText={text => handleInputChange('stateOfBirth', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.detailsTitle}>City of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="City of Birth"
            value={userData.cityOfBirth}
            onChangeText={text => handleInputChange('cityOfBirth', text)}
          />
        </View>
      

        <View style={styles.inputContainer}>
          <Text style={styles.detailsTitle}>Horoscope chart style</Text>
          <TextInput
            style={styles.input}
            placeholder="Horoscope chart style"
            value={userData.horoscopeChartStyle}
            onChangeText={text => handleInputChange('horoscopeChartStyle', text)}
          />
        </View>

        <TouchableOpacity
              style={[styles.continueButton, { backgroundColor: '#BA0F6B' }]}
              onPress={()=> navigation.navigate('Image', { userData })}
        >
              <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 25,
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor:'#D9D9D9',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    fontFamily:"Poppins-Regular",
    width: 335,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#BA0F6B', // Change the color for selected state
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily:"Poppins-Regular",
    justifyContent:'center',
    borderWidth: 2.5,
    borderColor: '#BA0F6B',
    borderRadius: 4,
    width:158,
    padding: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent:"flex-start",
    marginBottom: 12,
  },
  detailsTitle:{
    fontFamily:"Poppins-Regular",
    color:"black",
    fontSize:16,
  },
  continueButton:{
    width:335,
    padding:8,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
  },
  buttonText:{
    color:"white",
    fontSize:18,
    fontFamily:"Poppins-Regular",
  }
});

export default RegisterScreen4;