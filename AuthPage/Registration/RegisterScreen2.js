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

const RegisterScreen2 = ({ userData, updateUserData }) => {
  const [selectedOption, setSelectedOption] = useState(null);  
  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate('Step3');
  };
  const handleInputChange = (fieldName, value) => {
    setSelectedOption(value);
    updateUserData({ [fieldName]: value });
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      {/* Marital Status */}
      <Text style={styles.detailsTitle}>Marital Status</Text>
      <View style={styles.inputContainer}>
        <View style={styles.buttonRow}>
          <SquareRadioButton
            label="Unmarried"
            style={styles.brBtn}
            selected={selectedOption === 'Unmarried'}
            onPress={() => handleInputChange('maritualStatus', 'Unmarried')}
          />
          <SquareRadioButton
            label="Widower"
            style={styles.brBtn}
            selected={selectedOption === 'Widower'}
            onPress={() => handleInputChange('maritualStatus', 'Widower')}
          />
        </View>
        <View style={styles.buttonRow}>
        <SquareRadioButton
            label="Divorced"
            style={styles.brBtn}
            selected={selectedOption === 'Divorced'}
            onPress={() => handleInputChange('maritualStatus', 'Divorced')}
          />
          <SquareRadioButton
              label="Seperated"
              style={styles.brBtn}
              selected={selectedOption === 'Seperated'}
              onPress={() => handleInputChange('maritualStatus', 'Seperated')}
            />
        </View>
      </View>
      

      {/* Country */}
      
      <View style={styles.inputContainer}>
        <Text style={styles.detailsTitle}>Country</Text>
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={userData.country}
          onChangeText={text => handleInputChange('country', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.detailsTitle}>State</Text>
        <TextInput
          style={styles.input}
          placeholder="State"
          value={userData.state}
          onChangeText={text => handleInputChange('state', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.detailsTitle}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="City"
          value={userData.city}
          onChangeText={text => handleInputChange('city', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.detailsTitle}>Citizenship</Text>
        <TextInput
          style={styles.input}
          placeholder="Citizenship"
          value={userData.citizenship}
          onChangeText={text => handleInputChange('citizenShip', text)}
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity
              style={[styles.continueButton, { backgroundColor: '#BA0F6B' }]}
              onPress={handleRegister}
            >
              <Text style={styles.buttonText}>Continue</Text>
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
    width:333,
    gap: 20,
    marginBottom: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#BA0F6B',
    color:"white", // Change the color for selected state
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily:"Poppins-Regular",
    justifyContent:'center',
    borderWidth: 2.5,
    borderColor: '#BA0F6B',
    borderRadius: 4,
    width:160,
    padding: 10,
    marginBottom: 10,
  },
  radioButtonLabel:{
    fontFamily:"Poppins-Regular",
    color:"black",
  },
  headerStep:{
    position:'absolute',
    fontSize:20,
    top:-60,
    color:"black"
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

export default RegisterScreen2;