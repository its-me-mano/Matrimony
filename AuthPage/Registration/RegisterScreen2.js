/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <Text>Register Step 2</Text>
      {/* Marital Status */}
      <View style={styles.buttonRow}>
        <SquareRadioButton
          label="Self"
          selected={selectedOption === 'Unmarried'}
          onPress={() => handleInputChange('maritualStatus', 'Unmarried')}
        />
        <SquareRadioButton
          label="Widower"
          selected={selectedOption === 'Widower'}
          onPress={() => handleInputChange('maritualStatus', 'Widower')}
        />
        <SquareRadioButton
          label="Divorced"
          selected={selectedOption === 'Divorced'}
          onPress={() => handleInputChange('maritualStatus', 'Divorced')}
        />
         <SquareRadioButton
          label="Seperated"
          selected={selectedOption === 'Seperated'}
          onPress={() => handleInputChange('maritualStatus', 'Seperated')}
        />
      </View>

      {/* Country */}
      <Text>Country</Text>
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={userData.country}
        onChangeText={text => handleInputChange('country', text)}
      />

      {/* State */}
      <Text>State</Text>
      <TextInput
        style={styles.input}
        placeholder="State"
        value={userData.state}
        onChangeText={text => handleInputChange('state', text)}
      />

      {/* City */}
      <Text>City</Text>
      <TextInput
        style={styles.input}
        placeholder="City"
        value={userData.city}
        onChangeText={text => handleInputChange('city', text)}
      />

      {/* Citizenship */}
      <Text>Citizenship</Text>
      <TextInput
        style={styles.input}
        placeholder="Citizenship"
        value={userData.citizenship}
        onChangeText={text => handleInputChange('citizenShip', text)}
      />

      {/* Register Button */}
      <Button title="Next" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
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
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
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
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  }
});

export default RegisterScreen2;
