/* eslint-disable prettier/prettier */
import React, {useState,useContext} from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthProvider';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

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

const RegisterScreen1 = ({ userData, updateUserData }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate('Step2',{userData});
  };
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
      handleInputChange("dob",selectedDate.toString());
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleInputChange = (fieldName, value) => {
    setSelectedOption(value);
    // Update userData in RegisterMainScreen
    updateUserData({ [fieldName]: value });
  };


  // const handleRegister = async () => {
  //   try {
  //     const userCredential = await auth().createUserWithEmailAndPassword(
  //       email,
  //       password,
  //     );
  //     console.log('Registration successful', userCredential.user);

  //     // Get the user's unique ID
  //     const userId = userCredential.user.uid;

  //     // Create a reference to the Firestore collection where you want to store user data
  //     const usersCollection = firestore().collection('UserData');

  //     // Define the data you want to store
  //     const userDataToStore = {
  //       fullName: userData.fullName,
  //       dob: dob.toISOString(), // Convert to a string or any desired format
  //       address: userData.address,
  //       details: userData.details,
  //       gender: userData.gender,
  //       motherTongue: userData.motherTongue,
  //       subCaste: userData.subCaste,
  //       theoneRegistered: userData.theoneRegistered,
  //       // Add other user data properties here
  //     };

  //     // Use the user's ID as the document ID in Firestore
  //     await usersCollection.doc(userId).set(userDataToStore);

  //     // Navigate to the main app screen upon successful registration
  //   } catch (error) {
  //     console.error('Registration failed', error);
  //   }
  // };
  const routeLogin = () => {
    navigation.navigate('Step2');
  };
  return (
    <View style={styles.container}>
        <Text>Welcome to Manamaalai!</Text>
      <View style={styles.buttonRow}>
            <Text>Already have an account</Text>
            <CustomButton style={styles.button} title="Login" onPress={routeLogin} />
      </View>
      <Text>Register</Text>
      <Text>Select who is creating profile</Text>
      <View style={styles.buttonRow}>
        <SquareRadioButton
          label="Self"
          selected={selectedOption === 'Self'}
          onPress={() => handleInputChange('theoneRegistered', 'Self')}
        />
        <SquareRadioButton
          label="Parent"
          selected={selectedOption === 'Parent'}
          onPress={() => handleInputChange('theoneRegistered', 'Parent')}
        />
        <SquareRadioButton
          label="Sibiling"
          selected={selectedOption === 'Sibiling'}
          onPress={() => handleInputChange('theoneRegistered', 'Sibiling')}
        />
      </View>

      <View style={styles.buttonRow}>
        <SquareRadioButton
          label="Relative"
          selected={selectedOption === 'Relative'}
          onPress={() => handleInputChange('theoneRegistered', 'Relative')}
        />
        <SquareRadioButton
          label="Friend"
          selected={selectedOption === 'Friend'}
          onPress={() => handleInputChange('theoneRegistered', 'Friend')}
        />
      </View>

      <View style={styles.element}>
        <Text style={styles.Text}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="fullName"
          value={userData.fullName}
          onChangeText={text => handleInputChange('fullName', text)}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={dob.toDateString()} // Display the selected date as a string
            editable={false} // Prevent manual editing of the date
          />
          <TouchableOpacity
            style={styles.calendarIcon}
            onPress={toggleDatePicker}>
            <Text>calendar</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Add the "Save" button here if needed */}
        {/* <Button title="Save" onPress={() => console.log('Selected DOB:', dob)} /> */}

        <Text style={styles.Text}>Mother Tongue</Text>
        <TextInput
          style={styles.input}
          placeholder="motherTongue"
          value={userData.motherTongue}
          onChangeText={text => handleInputChange('motherTongue', text)}
        />
        <Text style={styles.Text}>Subcaste</Text>
        <TextInput
          style={styles.input}
          placeholder="subcaste"
          value={userData.subCaste}
          onChangeText={text => handleInputChange('subCaste', text)}
        />
      </View>
      <Text style={styles.Text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userData.email}
        onChangeText={text=>handleInputChange('email',text)}
      />
      <Text style={styles.Text}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={userData.password}
        onChangeText={text=>handleInputChange('password',text)}
      />
      <Button title="Continue" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  element: {},
  Text: {
    color: '#000000',
  },
  button:{
    width: 70, // Set the width
    height: 25, // Set the height
    backgroundColor: '#BA0F6B', // Customize the button's appearance
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
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
    width: 8,
    height: 8,
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  calendarIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePicker: {
    marginBottom: 12,
  },
});

export default RegisterScreen1;
