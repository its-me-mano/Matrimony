/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import { RadioButton } from 'react-native-paper';
import { View, Text, TouchableOpacity, StyleSheet,TextInput,Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
const SquareRadioButton = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
        {selected && <View style={styles.radioButtonInner} />}
        <Text style={styles.radioButtonLabel}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [userData, setUserData] = useState({
    fullName: '',
    dob: '',
    address: '',
    details: '',
    gender:'',
    motherTongue:'',
    subCaste:'',
    theoneRegistered:''
  });
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const handleInputChange = (fieldName, value) => {
    console.log(value);
    setSelectedOption(value);
    setUserData({ ...userData, [fieldName]: value });
  };
  const handleRadioButtonPress = (option) => {
    setSelectedOption(option);
  };

  const handleRegister = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('Registration successful', userCredential.user);
      // Navigate to the main app screen upon successful registration
    } catch (error) {
      console.error('Registration failed', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Text>Select who is creating profile</Text>
      <View style={styles.buttonRow}>
        <SquareRadioButton
          label="Self"
          selected={selectedOption === 'Self'}
          onPress={() => handleInputChange('theoneRegistered','Self')}
        />
        <SquareRadioButton
          label="Parent"
          selected={selectedOption === 'Parent'}
          onPress={() => handleInputChange('theoneRegistered','Parent')}
        />
        <SquareRadioButton
          label="Sibiling"
          selected={selectedOption === 'Sibiling'}
          onPress={() => handleInputChange('theoneRegistered','Sibiling')}
        />
      </View>
    
      <View style={styles.buttonRow}>
        <SquareRadioButton
            label="Relative"
            selected={selectedOption === 'Relative'}
            onPress={() => handleInputChange('theoneRegistered','Relative')}
          />
          <SquareRadioButton
            label="Friend"
            selected={selectedOption === 'Friend'}
            onPress={() => handleInputChange('theoneRegistered','Friend')}
          />
      </View>
      <View style={styles.element}>
            <Text style={styles.Text}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="fullName"
              value={userData.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
            />
          <Text style={styles.label}>Date of Birth</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={dob.toDateString()} // Display the selected date as a string
              editable={false} // Prevent manual editing of the date
            />
            <TouchableOpacity style={styles.calendarIcon} onPress={toggleDatePicker}>
              <FontAwesome name="calendar" size={24} color="black" />
            </TouchableOpacity>
          </View>
          
          {showDatePicker && (
            <DatePickerIOS
              style={styles.datePicker}
              date={dob}
              mode="date"
              onDateChange={handleDateChange}
            />
          )}

          <Button title="Save" onPress={() => console.log('Selected DOB:', dob)} />
            <TextInput
              style={styles.input}
              placeholder="motherTongue"
              value={userData.motherTongue}
              onChangeText={(text) => handleInputChange('motherTongue', text)}
            />
             <Text style={styles.Text}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="subcaste"
              value={userData.subCaste}
              onChangeText={(text) => handleInputChange('subcaste', text)}
            />
      </View>
      <Text style={styles.Text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.Text}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    margin:10
  },
  buttonRow: {
    flexDirection: 'row',
    gap:10,
    marginBottom: 10, // You can adjust this value to add space between the rows
  },
  element:{
    
  },
  Text:{
    color: '#000000'
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#BA0F6B', // Change the color for selected state
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: 'white',
    marginRight: 10,
  },
  radioButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Change the color for the label text
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  calendarIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePicker: {
    marginBottom: 12,
  },
});

export default RegisterScreen;
