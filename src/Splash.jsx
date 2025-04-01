import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Splash = () => {
  const navigation = useNavigation();

  const opacity = useRef(new Animated.Value(0)).current; 
  const scale = useRef(new Animated.Value(0.8)).current;  

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1, 
      duration: 2000, 
      useNativeDriver: true,
    }).start();

    Animated.timing(scale, {
      toValue: 1, 
      duration: 2000, 
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.replace('Login');
    }, 3000); 
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      {/* Animated Text */}
      <Animated.Text
        style={[
          styles.text,
          {
            opacity: opacity,  
            transform: [{ scale: scale }],
          },
        ]}
      >
        Quiz App
      </Animated.Text>
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
  text: {
    fontSize: 40,   // Increase font size for better visibility
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Splash;
