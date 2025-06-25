import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import DiabietsScreen from '../screens/DiabietsScreen';
import DiabietsResultScreen from '../screens/DiabietsResultScreen';
import HomeScreen from '../screens/HomeScreen';
import BmiScreen from '../screens/BMI/BmiScreen';
import BmiResultScreen from '../screens/BMI/BmiResultScreen';
import BmiChartScreen from '../screens/BMI/BmiChartScreen';

const Stack = createStackNavigator();
const AppRouter = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'SplashScreen'}
                screenOptions={{
                    headerShown: false, animation: 'slide_from_right', // or 'fade', 'flip', 'slide_from_bottom'
                }}>
                <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
                <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
                <Stack.Screen name={'BmiScreen'} component={BmiScreen} />
                <Stack.Screen name={'BmiResultScreen'} component={BmiResultScreen} />
                <Stack.Screen name={'BmiChartScreen'} component={BmiChartScreen} />
                <Stack.Screen name={'DiabietsScreen'} component={DiabietsScreen} />
                <Stack.Screen name={'DiabietsResultScreen'} component={DiabietsResultScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppRouter

const styles = StyleSheet.create({})