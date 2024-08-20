import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import xrayImg from "../assets/images/xrayimg.png";
import DoctorImg from "../assets/images/doctorImg.png";
const ScoreSection = () => {
  return (
    <View style={styles.scoreSection}>
      <View style={styles.content}>
                <Text style={styles.checkmark}>✅</Text>
                <Text style={styles.yourScore}>YOUR SCORE</Text>
                <Text style={styles.score}>7/10 Points</Text>
            </View>
            <View style={styles.details}>
                <View style={styles.detailItem}>
                    <Image source={xrayImg} />
                    <Text style={styles.label}>LAB TEST</Text>
                    <Text style={styles.points}>2/5 Points</Text>
                </View>
                <View style={styles.detailItem}>
                <Image source={DoctorImg} />
                    <Text style={styles.label}>DIAGNOSIS</Text>
                    <Text style={styles.points}>5/5 Points</Text>
                </View>
            </View>
    </View>
  )
}

export default ScoreSection;

const styles = StyleSheet.create({

    scoreSection:{
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        fontSize: '36px',
        marginBottom: '12px',
    },
    yourScore: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 14,
    },
    score: {
        fontSize: 28,
        color: '#333',
        fontWeight:'bold',
        marginBottom:'3rem'
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 40,
    },
    detailItem: {
        alignItems: 'center',
    },
    icon: {
        fontSize: 30,
        marginBottom: 10,
    },
    label: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    points: {
        fontSize: '16px',
        color: '#555',
    
    }
})