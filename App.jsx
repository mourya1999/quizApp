import React, {useEffect} from 'react';
import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Splash from './src/Splash';
import Register from './src/Register';
import Login from './src/Login';
import {useDispatch, useSelector} from 'react-redux';

// Create the Tab and Stack navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create Bottom Tab Navigator
const TabsApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
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
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Wallet"
        component={Home}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Refer"
        component={Home}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Board"
        component={Home}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const user = useSelector(state => state?.user?.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.email) {
      dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'TabsApp'}],
        }),
      );
    }
  }, [user?.email, dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabsApp"
          component={TabsApp}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
