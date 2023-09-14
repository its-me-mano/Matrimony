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
    <View style={styles.container}>
        {/* <Text>Dosam</Text>
        <View style={styles.buttonRow}>
            <SquareRadioButton
            label="Yes"
            selected={selectedOption === 'Yes'}
            onPress={() => handleInputChange('dosam', 'Yes')}
            />
            <SquareRadioButton
            label="No"
            selected={selectedOption === 'No'}
            onPress={() => handleInputChange('dosam', 'No')}
            />
            <SquareRadioButton
            label="Don't Know"
            selected={selectedOption === "Don't Know"}
            onPress={() => handleInputChange('dosam', "Don't Know")}
            />
        </View> */}
       {/* Star/Nakshatram */}
       <Text>Star/Nakshatram</Text>
      <TextInput
        style={styles.input}
        placeholder="Star/Nakshatram"
        value={userData.star}
        onChangeText={text => handleInputChange('star', text)}
      />

       {/* Raasi */}
       <Text>Raasi</Text>
      <TextInput
        style={styles.input}
        placeholder="Raasi"
        value={userData.raasi}
        onChangeText={text => handleInputChange('raasi', text)}
      />

         {/* Gothram */}
         <Text>Gothram</Text>
      <TextInput
        style={styles.input}
        placeholder="Gothram"
        value={userData.gothram}
        onChangeText={text => handleInputChange('gothram', text)}
      />

         {/* Time Of Birth for Horoscope */}
         <Text>Time Of Birth for Horoscope</Text>
      <TextInput
        style={styles.input}
        placeholder="Time Of Birth for Horoscope"
        value={userData.timeOfBirth}
        onChangeText={text => handleInputChange('timeOfBirth', text)}
      />

      
         {/* Time Of Birth for Horoscope */}
         <Text>Time Of Birth for Horoscope</Text>
      <TextInput
        style={styles.input}
        placeholder="Time Of Birth for Horoscope"
        value={userData.timeOfBirth}
        onChangeText={text => handleInputChange('timeOfBirth', text)}
      />

      
         {/* Country of Birth */}
         <Text>Country of Birth</Text>
      <TextInput
        style={styles.input}
        placeholder="Country of Birth"
        value={userData.countryOfBirth}
        onChangeText={text => handleInputChange('countryOfBirth', text)}
      />

          {/* State of Birth */}
          <Text>State of Birth</Text>
      <TextInput
        style={styles.input}
        placeholder="State of Birth"
        value={userData.stateOfBirth}
        onChangeText={text => handleInputChange('stateOfBirth', text)}
      />

        {/* City of Birth */}
        <Text>City of Birth</Text>
      <TextInput
        style={styles.input}
        placeholder="City of Birth"
        value={userData.cityOfBirth}
        onChangeText={text => handleInputChange('cityOfBirth', text)}
      />

        {/* Horoscope chart style */}
        <Text>Horoscope chart style</Text>
      <TextInput
        style={styles.input}
        placeholder="Horoscope chart style"
        value={userData.horoscopeChartStyle}
        onChangeText={text => handleInputChange('horoscopeChartStyle', text)}
      />
  
      <Button title="Register" onPress={()=>register(userData,navigation)} />
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

export default RegisterScreen4;
