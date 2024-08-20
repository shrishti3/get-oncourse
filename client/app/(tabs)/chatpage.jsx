import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import io from 'socket.io-client';
import Header from "@/components/Header";
import Input from "@/components/Input";
import SeniorDoctor from '@/components/SeniorDoctor';
import Doctor from '@/components/Doctor';
import { useNavigation } from '@react-navigation/native';

const ChatPage = () => {
  const [totalScore, setTotalScore] = useState(0);

  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);// Update with your server's IP if needed

  useEffect(() => {
    socketRef.current = io('http://localhost:3000'); // Update with your server's IP if needed

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
    });

    socketRef.current.on('updateScore', (data) => {
      setTotalScore(data.totalScore);
    });


    socketRef.current.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);


  const sendMessage = (text) => {
    const message = { sender: 'doctor', text };
    setMessages((prevMessages) => [...prevMessages, message]);
    if (socketRef.current) {
      socketRef.current.emit('message', message);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header totalScore={totalScore} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.chatSection}>
          {messages.map((msg, index) => (
            <View 
              key={index} 
              style={[
                styles.messageBubble, 
                msg.sender === "doctor" && styles.doctorBubble,
                msg.sender === "seniorDoctor" && styles.seniorDoctorBubble
              ]}
            >
              {msg.sender === "seniorDoctor" ? <SeniorDoctor /> : msg.sender === "doctor" ? <Doctor /> : null}
              <Text 
                style={[
                  styles.msgText, 
                  msg.sender === "doctor" && styles.doctorText,
                  msg.sender === "seniorDoctor" && styles.seniorDoctorText
                ]}
              >
                {msg.text}
              </Text>
              
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputSection}>
          <Input onSubmit={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  chatSection: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageBubble: {
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  doctorBubble: {
    alignItems: 'flex-end', // Aligns the bubble to the right
  },
  seniorDoctorBubble: {
    alignItems: 'flex-start', // Aligns the bubble to the left
  },
  inputSection: {
    justifyContent: 'flex-end',
  },
  msgText: {
    fontSize: 16,
    paddingLeft: 10,
  },
  doctorText: {
    textAlign: 'right',
    fontSize:16, 
    paddingRight: 10, // Adds padding on the right side
  },
  seniorDoctorText: {
    textAlign: 'left', // Aligns text to the left for senior doctor
    paddingLeft: 10,  // Adds padding on the left side
  },
});
