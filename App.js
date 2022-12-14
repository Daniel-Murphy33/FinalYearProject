import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from './firebase';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/loggedIn/HomeScreen';
import AnalyticsScreen from './screens/loggedIn/AnalyticsScreen';
import ProfileScreen from './screens/loggedIn/ProfileScreen';
import WorkoutScreen from './screens/loggedIn/WorkoutScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import NutritionScreen from './screens/loggedIn/NutritionScreen';
import RegisterScreen from './screens/RegisterScreen';

export default function App() {

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDetailsfilled, setIsDetailsFilled] = useState(true);

  //for signout button
  const handleSignOut = () => {
    auth
    .signOut()
    .catch(error => alert(error.message))
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
    })
  }, [])

  function HomeTabs () {
    return (
    <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = focused? 'home' : 'home-outline';
                }
                else if (route.name === 'Nutrition') {
                  iconName = focused ? 'nutrition-sharp' : 'nutrition-outline';
                }  
                else if (route.name === 'Workouts') {
                  iconName = focused ? 'ios-list' : 'ios-list-outline';
                }
                else if (route.name === 'Analytics') {
                  iconName = focused ? 'analytics' : 'analytics-outline';
                }
                else if (route.name === 'Profile') {
                  iconName =focused ? 'ios-person' : 'ios-person-outline';
                }
                return <Ionicons name={iconName} size={30} color={color} />;
              },
              tabBarActiveTintColor: '#0792F9',
              tabBarInactiveTintColor: 'black',
            })}
          
          >
            {/* Home Screen */}
            <Tab.Screen name="Home"
             component={HomeScreen}
             options={{headerRight: () => (
              <Button
                onPress={handleSignOut}
                title="Sign Out"
                color="#0792F9"
              />
            ),}}
             />
             {/* Nutrition Screen  */}
            <Tab.Screen name="Nutrition"
            component={NutritionScreen}
            options={{headerRight: () => (
              <Button
                onPress={handleSignOut}
                title="Sign Out"
                color="#0792F9"
              />
            ),}}
            />
            {/* Workout Screen  */}
            <Tab.Screen name="Workouts"
            component={WorkoutScreen}
            options={{headerRight: () => (
              <Button
                onPress={handleSignOut}
                title="Sign Out"
                color="#0792F9"
              />
            ),}}
            />
            {/* Analytics Screen  */}
            <Tab.Screen name="Analytics" 
            component={AnalyticsScreen}
            options={{headerRight: () => (
              <Button
                onPress={handleSignOut}
                title="Sign Out"
                color="#0792F9"
              />
            ),}}
            />
            {/* Profile Screen  */}
            <Tab.Screen name="Profile" 
            component={ProfileScreen} 
            options={{headerRight: () => (
              <Button
                onPress={handleSignOut}
                title="Sign Out"
                color="#0792F9"
              />
            ),}}
            />
          </Tab.Navigator>
  )}

    if(isLoggedIn==true) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="HomeTabs"
              component={HomeTabs}
              options={{headerShown:false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    
    else {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            {/* Login Screen  */}
            <Stack.Screen name="Login" 
            component={LoginScreen} 
            options={{headerShown: false}}
            />
            <Stack.Screen name="ForgotPassword"
            component={ForgotPasswordScreen}
            />
            <Stack.Screen name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
            />
        </Stack.Navigator>
      </NavigationContainer>
      )

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


