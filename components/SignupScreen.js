import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import usersData from '../users.json';

function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Check if username already exists
    if (usersData.users.some(user => user.username === username)) {
      setErrorMessage('Username already exists.');
      return;
    }

    // Create a new user object
    const newUser = { username, password };
    usersData.users.push(newUser);

    // TODO: Save the updated usersData to the JSON file (not shown here)

    setErrorMessage('');
    navigation.navigate('Login'); // Navigate to the login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5F3FE",
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 2,
    borderColor: '#0080FF', // Light blue color
    borderRadius: 8, // Rounded corners
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0080FF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default SignupScreen;
