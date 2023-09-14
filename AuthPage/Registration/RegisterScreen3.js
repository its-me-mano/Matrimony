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
    <View style={styles.container}>
       {/* Height */}
       <Text>Height</Text>
      <TextInput
        style={styles.input}
        placeholder="Height"
        value={userData.height}
        onChangeText={text => handleInputChange('height', text)}
      />

       {/* Education */}
       <Text>Education</Text>
      <TextInput
        style={styles.input}
        placeholder="Education"
        value={userData.education}
        onChangeText={text => handleInputChange('education', text)}
      />

         {/* Employed */}
         <Text>Employed</Text>
      <TextInput
        style={styles.input}
        placeholder="Employed"
        value={userData.employed}
        onChangeText={text => handleInputChange('employed', text)}
      />

         {/* Occupation */}
         <Text>Occupation</Text>
      <TextInput
        style={styles.input}
        placeholder="Occupation"
        value={userData.occupation}
        onChangeText={text => handleInputChange('occupation', text)}
      />

     <Text>PhysicalStatus</Text>
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
    <Text>FamilyStatus</Text>
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
      <SquareRadioButton
        label="Rich/Alluent"
        selected={familyStatus === 'Rich/Alluent'}
        onPress={() => handleInputChange('familyStatus', 'Rich/Alluent')}
      />
      </View>
      <Text>FamilyType</Text>
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

export default RegisterScreen3;
