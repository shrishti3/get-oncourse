import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import NextPatientBtn from '@/components/NextPatientBtn';
import ScoreSection from '@/components/ScoreSection';

const gradespage = () => {
    return (
        <View style={styles.container}>
            <Header style={styles.header} />
            <View style={styles.content}>
                <ScoreSection />
            </View>
            <View style={styles.footer}>
                <NextPatientBtn />
            </View>
        </View>
    );
};

export default gradespage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    content: {
        flex: 1,
        justifyContent: 'center', // Center the content vertically
    },
    footer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 30,
    },
});
