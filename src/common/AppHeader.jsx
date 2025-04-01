import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AppHeader = ({ title, onPressBack, showBackButton = true }) => {
  const navigation = useNavigation();
  const scale = new Animated.Value(1);

  // Animate back button on press
  const animateButtonPress = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View >
      <StatusBar barStyle="light-content" backgroundColor="#6200ea" />
      
      <View style={styles.headerContainer}>
         {showBackButton && (
        <TouchableOpacity
          onPress={() => {
            animateButtonPress();
            onPressBack || navigation.goBack();
          }}
          style={styles.backButton}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#6200ea', 
    height: 100, 
    justifyContent: 'center',
    elevation: 4,
    paddingTop:35
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top:45,
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20, // Slightly larger font
    fontWeight: '700', // Bold but not too aggressive
    textAlign: 'center',
    letterSpacing: 1, // Spacing between letters for better readability
  },
});

export default AppHeader;
