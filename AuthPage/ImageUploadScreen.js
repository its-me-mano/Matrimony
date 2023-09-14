import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ImageUploadScreen = () => {


  return (
    <View style={styles.container}>
      <Text>Image</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default ImageUploadScreen;
