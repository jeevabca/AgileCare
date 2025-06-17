import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import DiabietsScreen from '../screens/DiabietsScreen';
import DiabietsResultScreen from '../screens/DiabietsResultScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();
const AppRouter = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'SplashScreen'}
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
                <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
                <Stack.Screen name={'DiabietsScreen'} component={DiabietsScreen} />
                <Stack.Screen name={'DiabietsResultScreen'} component={DiabietsResultScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppRouter

const styles = StyleSheet.create({})