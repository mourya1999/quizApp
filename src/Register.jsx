import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { registerUser } from './services/api';

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dateOfBirth: new Date(),
    pincode: '',
    password: '',
    referralCode: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const handleChange = (name, value) => setFormData({ ...formData, [name]: value });

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
    setOpenDatePicker(false);
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobile ||
      !formData.dateOfBirth ||
      !formData.pincode ||
      !formData.password
    ) {
      setErrorMessage('All fields are required apart from referral code!');
      ToastAndroid.show('All fields are required apart from referral code!', ToastAndroid.SHORT);
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage('Invalid email!');
      ToastAndroid.show('Invalid email!', ToastAndroid.SHORT);
      return false;
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      setErrorMessage('Invalid mobile number!');
      ToastAndroid.show('Invalid mobile number!', ToastAndroid.SHORT);
      return false;
    }
    if (formData.password.length < 6) {
      setErrorMessage('Password too short!');
      ToastAndroid.show('Password too short!', ToastAndroid.SHORT);
      return false;
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      setErrorMessage('Invalid pincode!');
      ToastAndroid.show('Invalid pincode!', ToastAndroid.SHORT);
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    if (!validateForm()) return;

    try {
      const result = await registerUser(formData);
      console.log('register res : ', result);
      setSuccessMessage(result.message);
      ToastAndroid.show(result.message, ToastAndroid.LONG);
      navigation.navigate('Login');
    } catch (error) {
      setErrorMessage(error.message);
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); 
    const day = (`0${date.getDate()}`).slice(-2); 
    return `${year}-${month}-${day}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <ScrollView>
        {[
          'firstName',
          'lastName',
          'email',
          'mobile',
          'pincode',
          'password',
          'referralCode',
        ].map(field => (
          <TextInput
            key={field}
            style={styles.input}
            placeholder={field.replace(/([A-Z])/g, ' $1').toUpperCase()}
            value={field === 'dateOfBirth' ? formatDate(formData.dateOfBirth) : formData[field]}
            onChangeText={value => handleChange(field, value)}
            secureTextEntry={field === 'password'}
            keyboardType={field === 'email' ? 'email-address' : 'default'}
            editable={field !== 'dateOfBirth'}
          />
        ))}
        <View style={styles.datePickerContainer}>
          <Button title="Select Date of Birth" onPress={() => setOpenDatePicker(true)} />
        </View>

        {openDatePicker && (
          <DatePicker
            modal
            open={openDatePicker}
            date={formData.dateOfBirth}
            onConfirm={handleDateChange}
            onCancel={() => setOpenDatePicker(false)}
            mode="date"
            maximumDate={new Date()} // Prevent future dates
          />
        )}

        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        {successMessage && <Text style={styles.success}>{successMessage}</Text>}
      </ScrollView>
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 30, textAlign: 'center', marginBottom: 20 },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
  success: { color: 'green', marginBottom: 10, textAlign: 'center' },
  datePickerContainer: { marginVertical: 10 },
});

export default Register;
