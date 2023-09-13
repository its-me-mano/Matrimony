import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../AuthProvider';

const RegisterScreen2 = () => {
  const { register } = useContext(AuthContext);
  const [maritalStatus, setMaritalStatus] = useState(''); // State for marital status
  const [country, setCountry] = useState(''); // State for country
  const [state, setState] = useState(''); // State for state
  const [city, setCity] = useState(''); // State for city
  const [citizenship, setCitizenship] = useState(''); // State for citizenship

  const handleRegister = () => {
    // Implement your registration logic here, including these new fields
  };

  return (
    <View style={styles.container}>
      <Text>Register Step 2</Text>
      {/* Marital Status */}
      <Text>Marital Status</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setMaritalStatus('Unmarried')}>
        <Text>Unmarried</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setMaritalStatus('Widower')}>
        <Text>Widower</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setMaritalStatus('Divorced')}>
        <Text>Divorced</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setMaritalStatus('Separated')}>
        <Text>Separated</Text>
      </TouchableOpacity>

      {/* Country */}
      <Text>Country</Text>
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
      />

      {/* State */}
      <Text>State</Text>
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />

      {/* City */}
      <Text>City</Text>
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />

      {/* Citizenship */}
      <Text>Citizenship</Text>
      <TextInput
        style={styles.input}
        placeholder="Citizenship"
        value={citizenship}
        onChangeText={setCitizenship}
      />

      {/* Register Button */}
      <Button title="Register" onPress={handleRegister} />
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
});

export default RegisterScreen2;
