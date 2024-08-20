import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import DoctorImg from "../assets/images/juniorDoctor.png";

const Doctor = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>YOU</Text>
      <Image source={DoctorImg} style={styles.image} />
    </View>
  );
}

export default Doctor;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',        // Aligns items in a row (horizontally)
    justifyContent: 'flex-end',  // Pushes items to the right side
    alignItems: 'center',        // Vertically centers the items
    padding: 10,                 // Adds some padding around the container
  },
  image: {
    width: 40,                   // Sets the width of the image
    height: 40,      
    borderRadius: '0.3rem',      // Sets the height of the image
    marginLeft: 10,              // Adds some space between the text and the image
  },
  text: {
    color: 'gray',               // Sets the text color to gray
    fontSize: 16,                // Sets the font size of the text
    fontWeight: 'bold',          // Makes the text bold
  },
});
