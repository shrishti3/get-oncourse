import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from "./indexStyles.js";
import { router } from 'expo-router';
import logo from "../assets/images/logo.png";
const index = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching with a timeout
        setTimeout(() => {
            setIsLoading(false); // Data is "loaded"
        }, 3000); // 3 seconds delay to simulate data loading
    }, []);

    useEffect(() => {
        if (!isLoading) {
            router.push("/chatpage"); // Navigate after loading is complete
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.landingSection}>
                <View style={styles.logoSection}>
                    <View style={styles.titleDiv}>
                        <Image source={logo} style={styles.logoImg} />
                        <Text style={styles.textSection}>ONCOURSE</Text>

                    </View>
                    <Text style={styles.logoTitleTxt}>ASSIGNMENT</Text>

                </View>


            </SafeAreaView>
        )
    }
    return null;
};
export default index

