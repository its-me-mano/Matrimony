import React from 'react';
import { View, Text,Image } from 'react-native';

const ShortListScreen = () => {
  return (
    <View>
      <Text>Short List Screen</Text>
      <Image
          source={{
            uri: 'https://legacy.reactjs.org/logo-og.png',
            cache: 'only-if-cached',
          }}
          style={{width: 400, height: 400}}
        />
    </View>
  );
};

export default ShortListScreen;
