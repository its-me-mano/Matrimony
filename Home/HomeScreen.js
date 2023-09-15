import { useEffect, useState,useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../AuthPage/AuthProvider'; // Import your authentication context
import { FlatList,Text,View } from 'react-native';
// import { Text, View } from 'react-native-reanimated/lib/typescript/Animated';

const HomeScreen = () => {
  const { user } = useContext(AuthContext) ; // Get the authenticated user
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user.uid);
        const usersCollection = firestore().collection('UserData');
        const querySnapshot = await usersCollection
          .where(firestore.FieldPath.documentId(), '!=', user.uid) // Exclude the authenticated user
          .get();

        const users = querySnapshot.docs.map((doc) => doc.data());
        setOtherUsers(users);
      } catch (error) {
        console.error('Error fetching other users:', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    // <View>
    //     <Text>user.uid</Text>
    // </View>
    <FlatList
    data={otherUsers}
    keyExtractor={(item) => item.uid} // Assuming 'id' is a unique identifier
    renderItem={({ item }) => (
      <View key={item.uid}>
        <Text>{item.fullName}</Text>
        {/* Render other user information */}
      </View>
    )}
  />
  
  );
  
};

export default HomeScreen;
