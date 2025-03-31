import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Navigate to the next screen after the splash screen duration
    setTimeout(() => {
      navigation.replace('Login');  // Replace 'Home' with the name of your main screen
    }, 3000); 
  }, [navigation]);

  return (
    <View style={styles.container}>
    
      <Text style={styles.text}>Quiz App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E3B55',  // Customize background color
  },
  animation: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 24,
    color: 'white',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default Splash;
