import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../AuthPage/AuthProvider';

const ShortListScreen = () => {
  const { user } = useContext(AuthContext);
  const [shortlistedUsers, setShortlistedUsers] = useState([]);

  useEffect(() => {
    fetchShortlistedUsers();
  }, []);

  const fetchShortlistedUsers = async () => {
    try {
      const shortlistCollection = firestore()
        .collection('shortlisted')
        .doc(user.uid)
        .collection('users');

      const querySnapshot = await shortlistCollection.get();

      const shortlistedData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          uid: doc.id,
          name: data.fullName, // Adjust this to match your data structure
          age: data.age, // Adjust this to match your data structure
          // Add other fields as needed
        };
      });

      setShortlistedUsers(shortlistedData);
    } catch (error) {
      console.error('Error fetching shortlisted users:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shortlisted Users</Text>
      <FlatList
        data={shortlistedUsers}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Image
              source={{ uri: item.profilePic }} // You should use the appropriate image source field
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.age} years old</Text>
              {/* Add other fields as needed */}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShortListScreen;
