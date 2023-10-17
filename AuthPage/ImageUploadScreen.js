import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Button, Text, Platform, PermissionsAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from './AuthProvider';
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage'; // Import Firebase Storage
import firestore from '@react-native-firebase/firestore'; // Import Firestore

const ImageUploadScreen = ({ route }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { logout } = useContext(AuthContext);
  const { register } = useContext(AuthContext);
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const userData = route.params.userData;
  
  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      const cameraPermission = PermissionsAndroid.PERMISSIONS.CAMERA;
      const storagePermission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

      const cameraGranted = await PermissionsAndroid.check(cameraPermission);
      const storageGranted = await PermissionsAndroid.check(storagePermission);

      if (!cameraGranted || !storageGranted) {
        requestPermissions();
      }
    }
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const cameraPermission = PermissionsAndroid.PERMISSIONS.CAMERA;
      const storagePermission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

      const cameraResult = await PermissionsAndroid.request(cameraPermission);
      const storageResult = await PermissionsAndroid.request(storagePermission);

      if (cameraResult === PermissionsAndroid.RESULTS.GRANTED && storageResult === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissions granted');
      } else {
        console.log('Permissions denied');
      }
    }
  };

  const handleImageUpload = () => {
    const options = {
      title: 'Select Image',
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageUri = response.uri || response.assets?.[0]?.uri;

        // Generate a unique filename for the image in Firebase Storage
        const filename = `profile_images/${Date.now()}.jpg`;
        const storageRef = storage().ref(filename);
        userData.profilePic=imageUri;
        setSelectedImage(imageUri);
        console.log(storageRef);
        console.log(imageUri);
      }
    });
  }; 

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <TouchableOpacity
          style={[styles.chooseBtn]}
          onPress={handleImageUpload}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Button style={styles.signoutBtn} title="SignOut" onPress={() => logout(navigation)} />
      {selectedImage &&
        <TouchableOpacity
          style={[styles.continueBtn]}
          onPress={() =>register(userData,navigation)} // Navigate to the next screen
        >
          <Text style={styles.buttonContinue}>Continue</Text>
        </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 145,
    height: 145,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
    backgroundColor: "#ffffff",
    alignItems: 'center',
  },
  containerImage: {
    flexWrap: 'wrap',
    flexDirection: "row",
    gap: 20,
  },
  signoutBtn: {},
  chooseBtn: {
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  continueBtn: {
    flex: 1,
    width: 335,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 10,
    backgroundColor: '#BA0F6B'
  },
  buttonText: {
    backgroundColor: "#ffffff",
    fontWeight: "bold",
    fontSize: 30,
    borderRadius: 100,
    height: 45,
    width: 45,
    textAlign: "center",
  },
  buttonContinue: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  }
});

export default ImageUploadScreen;