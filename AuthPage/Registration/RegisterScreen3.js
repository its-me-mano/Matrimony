/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet ,ScrollView} from 'react-native';
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

const RegisterScreen3 = ({ userData, updateUserData }) => {
  const { register } = useContext(AuthContext);
  const [physicalStatus, setPhysicalStatus] = useState(null);
  const [familyStatus, setFamilyStatus] = useState(null);
  const [familyType, setFamilyType] = useState(null);

  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate('Step4');
  };
  const handleInputChange = (category, value) => {
    switch (category) {
      case 'physicalStatus':
        setPhysicalStatus(value);
        break;
      case 'familyStatus':
        setFamilyStatus(value);
        break;
      case 'familyType':
        setFamilyType(value);
        break;
      default:
        break;
    }
    updateUserData({ [category]: value });
  };
  

  return (
    <ScrollView>
    <View style={styles.container}>
       {/* Height */}
       <View style={styles.inputContainer}>
        <Text style={styles.detailsTitle}>Height</Text>
        <TextInput
          style={styles.input}
          placeholder="Height"
          value={userData.height}
          onChangeText={text => handleInputChange('height', text)}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.detailsTitle}>Education</Text>
        <TextInput
          style={styles.input}
          placeholder="Education"
          value={userData.education}
          onChangeText={text => handleInputChange('education', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.detailsTitle}>Employed</Text>
        <TextInput
          style={styles.input}
          placeholder="Yes / No"
          value={userData.employed}
          onChangeText={text => handleInputChange('employed', text)}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.detailsTitle}>Occupation</Text>
        <TextInput
          style={styles.input}
          placeholder="Occupation"
          value={userData.occupation}
          onChangeText={text => handleInputChange('occupation', text)}
        />
      </View>
      <Text style={styles.detailsTitle}>PhysicalStatus</Text>
      <View style={styles.inputContainer}>
          <View style={styles.buttonRow}>
        <SquareRadioButton
            label="Normal"
            selected={physicalStatus === 'Normal'}
            onPress={() => handleInputChange('physicalStatus', 'Normal')}
          />
          <SquareRadioButton
            label="Physically Challenged"
            selected={physicalStatus === 'Physically Challenged'}
            onPress={() => handleInputChange('physicalStatus', 'Physically Challenged')}
          />

          </View>
      </View>

      <Text style={styles.detailsTitle}>FamilyStatus</Text>
      <View style={styles.inputContainer}>
        <View style={styles.buttonRow}>
          <SquareRadioButton
            label="Middle Class"
            selected={familyStatus === 'Middle Class'}
            onPress={() => handleInputChange('familyStatus', 'Middle Class')}
          />
          <SquareRadioButton
            label="Upper Middle Class"
            selected={familyStatus === 'Upper Middle Class'}
            onPress={() => handleInputChange('familyStatus', 'Upper Middle Class')}
          />
        </View>
        <View style={styles.buttonRow}>
          <SquareRadioButton
              label="Rich/Alluent"
              selected={familyStatus === 'Rich/Alluent'}
              onPress={() => handleInputChange('familyStatus', 'Rich/Alluent')}
            />
        </View>
      </View>

      <Text style={styles.detailsTitle}>FamilyType</Text>
      <View style={styles.inputContainer}>
        <View style={styles.buttonRow}>
          <SquareRadioButton
              label="Join Family"
              selected={familyType === 'Join Family'}
              onPress={() => handleInputChange('familyType', 'Join Family')}
            />
            <SquareRadioButton
              label="Nuclear Family"
              selected={familyType === 'Nuclear Family'}
              onPress={() => handleInputChange('familyType', 'Nuclear Family')}
            />
        </View>
      </View>
     
      <TouchableOpacity
              style={[styles.continueButton, { backgroundColor: '#BA0F6B' }]}
              onPress={handleRegister}
            >
              <Text style={styles.buttonText}>Next</Text>
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

export default RegisterScreen3;