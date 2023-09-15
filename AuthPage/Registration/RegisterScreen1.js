/* eslint-disable prettier/prettier */
import React, {useState,useContext} from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthProvider';
import Icon from 'react-native-vector-icons/Feather';

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
import { ScrollView } from 'react-native-gesture-handler';

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

const GenderSquareRadioButton = ({label, selected, onPress}) => {
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
  const [selectedGender, setSelectedGender] = useState(null);
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

  const handlegenderInputChange = (fieldName, value) => {
    setSelectedGender(value);
    // Update userData in RegisterMainScreen
    updateUserData({ [fieldName]: value });
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
    navigation.navigate('Login');
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.greeting}>Welcome to <Text style={styles.greetingManamalai}>Manamaalai!</Text></Text>
        <View style={styles.buttonRow}>
              <Text>Already have an account?</Text>
              <TouchableOpacity style={styles.button} onPress={routeLogin}>
                <Text style={styles.btitle}>Log in</Text>
              </TouchableOpacity>
        </View>
        <View style={styles.containerDetails}>
          <Text style={styles.detailsTitle}>Select who is creating profile</Text>
          <View style={styles.buttonRow}>
            <SquareRadioButton
              label="Self"
              style={styles.brBtn}
              selected={selectedOption === 'Self'}
              onPress={() => handleInputChange('theoneRegistered', 'Self')}
            />
            <SquareRadioButton
              label="Parent"
              style={styles.brBtn}
              selected={selectedOption === 'Parent'}
              onPress={() => handleInputChange('theoneRegistered', 'Parent')}
            />
            <SquareRadioButton
              label="Sibiling"
              style={styles.brBtn}
              selected={selectedOption === 'Sibiling'}
              onPress={() => handleInputChange('theoneRegistered', 'Sibiling')}
            />
          </View>

          <View style={styles.buttonRow}>
            <SquareRadioButton
              label="Relative"
              style={styles.brBtn}
              selected={selectedOption === 'Relative'}
              onPress={() => handleInputChange('theoneRegistered', 'Relative')}
            />
            <SquareRadioButton
              label="Friend"
              style={styles.brBtn}
              selected={selectedOption === 'Friend'}
              onPress={() => handleInputChange('theoneRegistered', 'Friend')}
            />
          </View>
            <Text style={styles.detailsTitle}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="fullName"
              value={userData.fullName}
              onChangeText={text => handleInputChange('fullName', text)}
            />

            <Text style={styles.detailsTitle}>Date of Birth</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={dob.toDateString()} // Display the selected date as a string
                editable={false} // Prevent manual editing of the date
              />
              <TouchableOpacity
                style={styles.calendarIcon}
                onPress={toggleDatePicker}>
                <Icon style={styles.calendarFIcon} name="calendar" size={30} color="#999" />
              </TouchableOpacity>
              {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            </View>
            <View style={styles.subContainers}>
              <Text style={styles.detailsTitle}>Gender</Text>
                <View style={styles.buttonRow}>
                  <GenderSquareRadioButton
                    label="Male"
                    style={styles.brBtn}
                    selected={selectedGender === 'Male'}
                    onPress={() => handlegenderInputChange('Gender', 'Male')}
                  />
                  <GenderSquareRadioButton
                    label="Female"
                    style={styles.brBtn}
                    selected={selectedGender === 'Female'}
                    onPress={() => handlegenderInputChange('Gender', 'Female')}
                  />
                </View>
            </View>
            <View style={styles.subContainers}>
              <Text style={styles.detailsTitle}>Mother Tongue</Text>
              <TextInput
                style={styles.input}
                placeholder="motherTongue"
                value={userData.motherTongue}
                onChangeText={text => handleInputChange('motherTongue', text)}
              />
            </View>
            <View style={styles.subContainers}>
              <Text style={styles.detailsTitle}>Subcaste</Text>
              <TextInput
                style={styles.input}
                placeholder="subcaste"
                value={userData.subCaste}
                onChangeText={text => handleInputChange('subCaste', text)}
              />
            </View>
            <View style={styles.subContainers}>
            <Text style={styles.detailsTitle}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={userData.email}
              onChangeText={text=>handleInputChange('email',text)}
            />
          </View>
          <View style={styles.subContainers}>
            <Text style={styles.detailsTitle}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={userData.password}
              onChangeText={text=>handleInputChange('password',text)}
            />
          </View>
          <TouchableOpacity
              style={[styles.continueButton, { backgroundColor: '#BA0F6B' }]}
              onPress={handleRegister}
            >
              <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          </View>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    marginTop:20,
    marginBottom:20,
    gap:10,
  },
  greeting:{
    color:"black",
    fontFamily:"Poppins-Bold",
    fontSize:25,
  },
  greetingManamalai:{
    color:"#EEC219",
    fontFamily:"Poppins-Bold",
    fontSize:26,
  },
  subContainers:{
    flex:1,
    gap:10,
  },
  containerDetails:{
    flex:1,
    alignItems:"flex-start",
    gap:10,
    flex:1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
  },
  detailsTitle:{
    color:"black",
    fontSize:16,
  },
  element: {},
  Text: {
    color: '#000000',
  },
  calendarFIcon:{
    position:"absolute",
    left:-40,
    top:-20,
  },
  button:{
     // Set the height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  btitle:{
    color:"#BA0F6B",
    fontFamily:"Poppins-Regular",
    fontWeight:"bold",
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily:"Poppins-Regular",
    justifyContent:'center',
    borderWidth: 2.5,
    borderColor: '#BA0F6B',
    borderRadius: 4,
    width:100,
    padding: 10,
    marginBottom: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#BA0F6B',
     // Change the color for selected state
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
    borderColor:'#D9D9D9',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    fontFamily:"Poppins-Regular",
    width: 335,
  },
  calendarIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePicker: {
    marginBottom: 12,
    fontFamily:"Poppins-Regular",
    color:"#D9D9D9",
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

export default RegisterScreen1;