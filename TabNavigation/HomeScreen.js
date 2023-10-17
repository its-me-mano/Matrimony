import React, { useEffect, useState, useContext } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, Image, Button, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../AuthPage/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ShortListScreen from './ShortListScreen';
import SettingScreen from './SettingScreen';

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const [otherUsers, setOtherUsers] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const TabNavigator = createBottomTabNavigator();
  const { width, height } = Dimensions.get('window');
  const boxWidth = width * 0.87;
  const boxHeight = height * 0.25;
  const currentUser = auth().currentUser;

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleEndReached = () => {
    if (!loading && lastDocument) {
      fetchData();
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true
      const usersCollection = firestore().collection('UserData');
      let query = usersCollection
        .where(firestore.FieldPath.documentId(), '!=', user.uid);

      if (lastDocument) {
        query = query.startAfter(lastDocument);
      }

      query
        .limit(10)
        .get()
        .then((querySnapshot) => {
          setLoading(false); // Set loading to false
          if (!querySnapshot.empty) {
            setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
            MakeUserData(querySnapshot.docs);
          }
        })
        .catch((error) => {
          setLoading(false); // Set loading to false on error
          console.error('Error fetching other users:', error);
        });
    } catch (error) {
      setLoading(false); // Set loading to false on error
      console.error('Error fetching other users:', error);
    }
  };

  function MakeUserData(docs) {
    let tempList = [];
    docs.forEach((doc, i) => {
      const data = doc.data();
      let temp = {
        uid: doc.id,
        name: data.fullName,
        age: data.age,
        dob: data.dob,
        address: data.address,
        profilePic: data.profilePic
      };
      tempList.push(temp);
    });
    setOtherUsers((prevData) => [...prevData, ...tempList]);
  }

  function Home() {
    const handleShortlistUser = (userId) => {
      // Check if the user is logged in
      if (user) {
        const userShortlistRef = firestore().collection('shortlisted').doc(user.uid);
  
        // Update the shortlist data for the logged-in user
        userShortlistRef.set({
          [userId]: true, // Store the user ID as the key with a value of true
        }, { merge: true });
      }
    };

    return (
      <ScrollView
        style={styles.container}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            handleEndReached();
          }
        }}
        scrollEventThrottle={400}
      >
        <Text style={styles.Header}>Hey Welcome!</Text>
        <Text style={styles.Text}>Step into the world of love and connection</Text>
        <Text style={styles.Header}>Let's get Started</Text>
        <View>
          <FlatList
            data={otherUsers}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => (
              <View>
                <View style={[styles.box, { width: boxWidth, height: boxHeight }]} key={item.uid}>
                  <View style={styles.column1}>
                    <Image
                      style={[styles.image, { height: boxHeight / 1.25, width: boxWidth / 2.3 }]}
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/matrimony-3b624.appspot.com/o/profile_images%2F1696678439736.jpg?alt=media&token=169791c1-deb8-4fc6-8fce-2e85653f042'
                      }}
                      resizeMode="cover"
                      onError={(error) => console.error('Image loading error:', error)}
                      key={item.uid}
                    />
                  </View>
                  <View style={styles.column2}>
                    <Text style={styles.Text}>{item.name}</Text>
                    <Text>{item.age}</Text>
                  </View>
                </View>
                <View style={styles.feature}>
                  <Button style={styles.btn} title="Shortlisted" onPress={() => handleShortlistUser(item.uid)} />
                  <Button style={styles.btn} title="Chat now" />
                  <Button style={styles.btn} title="Interested" />
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <TabNavigator.Navigator tabBarOptions={{
      style: {
        backgroundColor: '#BA0F6B', // Set your desired background color here
      },
    }}>
      <TabNavigator.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: null,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#BA0F6B',
          },
          headerTitle: () => (
            <Text style={styles.customHeaderTitle}>HOME</Text>
          )
        }}
      />
      <TabNavigator.Screen
        name="ShortList"
        component={ShortListScreen}
        options={{
          headerLeft: null,
          headerShown: false,
          headerTitle: () => (
            <Text style={styles.customHeaderTitle}>MANAMALAI</Text>
          )
        }}
      />
      <TabNavigator.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerLeft: null,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#BA0F6B',
          },
          headerTitle: () => (
            <Text style={styles.customHeaderTitle}>Settings</Text>
          )
        }}
      />
    </TabNavigator.Navigator>
  );
};

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 10,
    padding: 15
  },
  customHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#FFFFFF',
  },
  btn: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
  Header: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000"
  },
  column1: {
    flex: 35,
    padding: 20
  },
  column2: {
    flex: 35,
    padding: 20
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#d9d9d9',
  },
  feature: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  Text: {
    fontFamily: 'Poppins',
    fontSize: 18,
    color: "#000000"
  }
});

export default HomeScreen;
