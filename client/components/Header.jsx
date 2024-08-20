import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import user from "../assets/images/patient.png";
import Infoicon from "../assets/images/Iicon.png";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { router } from 'expo-router';

const Header = ({ totalScore }) => {
  const navigation = useNavigation();

  const handleGradesPageNavigation = () => {
    navigation.navigate('gradespage', { totalScore });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.userInfo}>
          <Image source={user} style={styles.userImage} />
          <Text style={styles.userName}>MR. AMIT</Text>
          <Text style={styles.userAge}>(60/YO)</Text>
        </View>
        <View style={styles.pointsContainer}>
          
        <TouchableOpacity onPress={handleGradesPageNavigation} style={styles.pointsContainer}>
          <Text style={styles.points}>{ totalScore } points</Text>
          <Image source={Infoicon} style={styles.infoImage} />
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b90f3',
    paddingTop: 48, 
    height:122, 
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', 
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%', 
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    backgroundColor: "white",
   
    padding: 12, 
    width: 40,
    paddingLeft:24,
    height: 40,
    borderRadius:'0.3rem', 
    marginRight: 10,
  },
  userName: {
    color: "#d1e5f9",
    fontSize: 16,
  },
  userAge: {
    fontSize: 14,
    color: '#d1e5f9',
    marginLeft: 8,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#3D78EA",
    borderRadius: 12, 
    paddingHorizontal: 10,
    gap: 8,
  },
  points: {
    fontSize: 16,
    color: '#d1e5f9',
    paddingVertical: 4, 
  },
  infoImage: {
    width: 20,
    height: 20,
  },
});


export default Header;
