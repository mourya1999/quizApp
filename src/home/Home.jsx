import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../common/AppHeader';
import {useDispatch, useSelector} from 'react-redux';
import { clearAuth } from '../redux/userSlice';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const user = useSelector(state => state?.user?.data);
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [toggleButton, setToggleButton] = useState('Bonus'); 
  const handleToggle = button => {
    setToggleButton(button); 
  };

  const handleLogout = () =>{
    dispatch(clearAuth())
    navigation.navigate('Splash')
  }
  return (
    <> <View style={styles.container}>
      <AppHeader onPressBack={false} title={'Home'} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleToggle('Bonus')} 
          style={[
            styles.button,
            toggleButton === 'Bonus' ? styles.buttonActive : {},
          ]} 
        >
          <Text style={styles.buttonText}>Daily Bonus</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleToggle('Quiz')} 
          style={[
            styles.button,
            toggleButton === 'Quiz' ? styles.buttonActive : {},
          ]} 
        >
          <Text style={styles.buttonText}>Quiz Time</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.userInfoContainer, {marginTop: 20}]}>
        <Text
          style={[
            styles.userInfoText,
            {textDecorationLine: 'underline', color: 'blue'},
          ]}>
          User Name
        </Text>
        <Text
          style={[
            styles.userInfoText,
            {textDecorationLine: 'underline', color: 'blue'},
          ]}>
          Rewards
        </Text>
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoText}>{user?.firstName}</Text>
        <Text style={styles.userInfoText}>{user?.rewardPoints}</Text>
      </View>
      <Text style={styles.activeButtonText}>Active Button: {toggleButton}</Text>
    </View>
    <Button title='Logout' onPress={handleLogout}/>
    </>
   
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  userInfoText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    borderWidth: 1,
    borderRadius:10
  },
  button: {
    width: '48%', 
    backgroundColor: 'skyblue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: 'blue',
  
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  activeButtonText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: 'blue',
    fontWeight: 'bold',
  },
});
