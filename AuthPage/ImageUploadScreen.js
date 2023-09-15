import React, { useState, useEffect,useContext } from 'react';
import { View, Image, Button, Text, Platform, PermissionsAndroid } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from './AuthProvider';
import { useNavigation } from '@react-navigation/native';
const ImageUploadScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { logout,updateProfile } = useContext(AuthContext);
  const navigation = useNavigation();
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

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri,navigation);
      }
    });
  };

  const handleContinue = () => {
      updateProfile(selectedImage,navigation);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
      )}
      <Button title="SignOut" onPress={()=>logout(navigation)} />
      <Button title="Choose Image" onPress={handleImageUpload} />
      {selectedImage && <Button title="Continue" onPress={handleContinue} />}
    </View> 
  );
};

export default ImageUploadScreen;
