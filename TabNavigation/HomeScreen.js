import React, { useEffect, useState, useContext } from 'react';
import { Text, View, FlatList, StyleSheet,Dimensions,Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../AuthPage/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import ShortListScreen from './ShortListScreen';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const [otherUsers, setOtherUsers] = useState([]);
  const TabNavigator = createBottomTabNavigator();
  const { width, height } = Dimensions.get('window');
  const boxWidth =width * 0.87;
  const boxHeight = height * 0.25; 
  const currentUser = auth().currentUser;
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(currentUser.uid);
        const usersCollection = firestore().collection('UserData');
        const querySnapshot = await usersCollection
          .where(firestore.FieldPath.documentId(), '!=', user.uid)
          .get();

        const users = querySnapshot.docs.map((doc) => doc.data());
        setOtherUsers(users);
      } 
      catch (error) {
        console.error('Error fetching other users:', error);
      }
    };
    fetchData();
  }, [user]);
  function calculateAge(dobString) {
    if(dobString==undefined || dobString==null)
      return 0;
    // Parse the DOB string into a Date object
    const dob = new Date(dobString);
  
    // Calculate the current date
    const currentDate = new Date();
  
    // Calculate the difference between current date and DOB in milliseconds
    const ageInMilliseconds = currentDate - dob;
  
    // Convert milliseconds to years
    const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);
  
    // Round down the age to the nearest whole number
    const age = Math.floor(ageInYears);
  
    return age;
  }
  function Home() {
    return (
      <View style={styles.container}>
        <Text style={styles.Header}>Hey Welcome!</Text>
        <Text style={styles.Text}>Step into the world of love and connection</Text>
        <Text style={styles.Header}>Let's get Started</Text>
        <View >
        <FlatList
  data={otherUsers}
  keyExtractor={(item) => item.uid} 
  renderItem={({ item }) => (
    <View style={[styles.box, { width: boxWidth, height: boxHeight }]} key={item.uid}>
      <View style={styles.column1}>
      <Image style={styles.image} source={{ uri:'https://firebasestorage.googleapis.com/v0/b/matrimony-3b624.appspot.com/o/profile_images%2F1696678439736.jpg?alt=media&token=169791c1-deb8-4fc6-8fce-2e85653f042c' }}   resizeMode="fit" onError={(error) => console.error('Image loading error:', error)} key={item.uid} />
      </View>
      <View style={styles.column2}>
      <Text style={styles.Text}>{item.fullName}</Text>
      <Text>{item.address}</Text>
      <Text>{calculateAge(item.dob)}</Text>
      </View>
    </View>
  )}
/>


        </View>
      </View>
    );
  }

  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: null,
          headerShown: true,
          headerStyle:{
                      backgroundColor:'#BA0F6B',
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
    </TabNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  container:{
    marginLeft:10,
    marginTop:10,
    padding:10
  },
  customHeaderTitle: {
    fontSize: 18, // Adjust the font size as needed
    fontWeight:"bold", // Apply any desired text styles
    color: '#FFFFFF', // Set the desired text color
  },
  image:{
       width:150,
       height:150,
       borderRadius:50
  },
  Header: {
    fontFamily:'Poppins',
    fontSize:18,
    fontWeight: "bold",
    color:"#000000"
  },
  column1:{
    flex:35,
    padding:20
  },
  column2:{
    flex:65,
    padding:20
  },
  box:{
    display:'flex',
    flexDirection:'column',
    backgroundColor:'#d9d9d9',
    marginBottom:20
  },
  Text: {
    fontFamily:'Poppins',
    fontSize:18,
    color:"#000000"
  }
});

export default HomeScreen;
