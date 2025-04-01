
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { loginUser } from './services/api';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { storeLoginRes } from './redux/userSlice';

const Login = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    const userData = { email, password };
    try {
      const result = await loginUser(userData);
      setSuccessMessage(result.message);
      console.log("login res : ", result)
      dispatch(storeLoginRes(result.user))
      navigation.navigate('TabsApp'); 
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      {successMessage && <Text style={styles.success}>{successMessage}</Text>}

      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.registerText}>
        Don't have an account? <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Register</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  success: {
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Login;
