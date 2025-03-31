import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/home/Home';
import Wallet from './src/Wallet'; // Assuming you have a Wallet component
import Refer from './src/Refer';   // Assuming you have a Refer component
import Board from './src/Board';   // Assuming you have a Board component
import Ionicons from 'react-native-vector-icons/Ionicons';
import Splash from './src/Splash';
import Register from './src/Register';
import Login from './src/Login';

// Create the Tab and Stack navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create Bottom Tab Navigator
const TabsApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline'; // Changed 'person' to 'wallet'
          } else if (route.name === 'Refer') {
            iconName = focused ? 'share-social' : 'share-social-outline'; // Example icon for Refer
          } else if (route.name === 'Board') {
            iconName = focused ? 'clipboard' : 'clipboard-outline'; // Example icon for Board
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
      <Tab.Screen name="Refer" component={Refer} options={{ headerShown: false }} />
      <Tab.Screen name="Board" component={Board} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="TabsApp" component={TabsApp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
