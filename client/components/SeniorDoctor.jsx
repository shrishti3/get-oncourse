import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import SeniorDocImg from "../assets/images/seniorDocImg.png";

const SeniorDoctor = () => {
  return (
    <View style={styles.container}>
      <Image source={SeniorDocImg} style={styles.image} />
      <Text style={styles.text}>SENIOR AI DOCTOR</Text>
    </View>
  );
}

export default SeniorDoctor;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',      
    alignItems: 'center',      
    padding: 10,               
  },
  image: {
    width: 40,                
    height: 40,      
    borderRadius:'0.3rem',         
    marginRight: 10,           
  },
  text: {
    color: 'gray',             
    fontSize: 16,             
    fontWeight: 'bold',        
  },
});
