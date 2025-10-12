import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import './global.css';
import { Login } from 'components/Auth';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Home from 'components/Home';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#84DC8E',
    primary: 'rgb(255, 45, 85)',
  },
};
function MainTabNavigator() {

 
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'person';

          if (route.name === 'Login') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })} 
    
      
      >
      <Tab.Screen name="Auth" component={Login}  />
      <Tab.Screen name="Home" component={Home}  />
      
    </Tab.Navigator>
  );
}

export default function App() {
   const [queryClient] = useState(()=>new QueryClient())
  return (
   <QueryClientProvider client={queryClient}>
     <NavigationContainer theme={MyTheme}>
      <MainTabNavigator/> 
    </NavigationContainer>
   </QueryClientProvider>
  );
}
