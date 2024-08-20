import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import sendMessageBtn from "../assets/images/sendMessageBtn.png";

const Input = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText(''); 
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your response"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Image source={sendMessageBtn} style={styles.submitBtn} />
      </TouchableOpacity>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  submitBtn: {
    width: 40,
    height: 40,
  },
});
