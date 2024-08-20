import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const NextPatientBtn = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>NEXT PATIENT</Text>
    </TouchableOpacity>
  )
}

export default NextPatientBtn

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#167ADF', // Blue background
    paddingVertical: 12,        // Vertical padding
    paddingHorizontal: 25,      // Horizontal padding
    borderRadius: 8,            // Rounded corners
    alignItems: 'center',       // Center text horizontally
    justifyContent: 'center',   // Center text vertically
    width: '348px',
    height: '58px',
    shadowColor: '#1961B4',        // Shadow color (black)
    shadowOffset: { width: 0, height: 4 },  // Shadow offset (only bottom)
    shadowOpacity: 0.25,        // Shadow opacity
    shadowRadius: 4,            // Shadow radius
    elevation: 5,               // Elevation for Android shadow
  },
  buttonText: {
    color: 'white',             // White text color
    fontSize: 16,               // Font size
    fontWeight: 'bold',         // Bold text
  },
})
