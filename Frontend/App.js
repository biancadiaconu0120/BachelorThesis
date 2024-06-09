import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import LearningCourseScreen from './Screens/LearningCourseScreen';
import ASLInterpreterScreen from './Screens/ASLInterpreterScreen';
import ASLFingerspellScreen from './Screens/ASLFingerspellScreen';
import InterpreterChooseScreen from './Screens/InterpreterChooseScreen';
import ABCScreen from './Screens/ABCScreen';
import WordScreen from './Screens/WordScreen';
import QuizScreen from './Screens/QuizScreen';
import ProfileScreen from './Screens/ProfileScreen';
import InformationScreen from './Screens/InformationScreen';
import BlogScreen1 from './Screens/BlogScreen1';
import BlogScreen2 from './Screens/BlogScreen2';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import ResultScreen from './Screens/ResultScreen';

const Stack = createStackNavigator();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const savedEmail = await AsyncStorage.getItem('email');
            if (savedEmail) {
                setIsLoggedIn(true);
            }
        };

        checkLoginStatus();
    }, []);

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <Stack.Navigator
                    initialRouteName="HomeScreen"
                    screenOptions={{
                        headerShown: false  // Disables the headers globally for all Screens
                    }}
                >
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="LearningCourseScreen" component={LearningCourseScreen} />
                    <Stack.Screen name="ASLInterpreterScreen" component={ASLInterpreterScreen} />
                    <Stack.Screen name="Result" component={ResultScreen} />
                    <Stack.Screen name="ASLFingerspellScreen" component={ASLFingerspellScreen} />
                    <Stack.Screen name="InterpreterChooseScreen" component={InterpreterChooseScreen} />
                    <Stack.Screen name="ABCScreen" component={ABCScreen} />
                    <Stack.Screen name="WordScreen" component={WordScreen} />
                    <Stack.Screen name="QuizScreen" component={QuizScreen} />
                    <Stack.Screen name="ProfileScreen">
                        {props => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
                    </Stack.Screen>
                    <Stack.Screen name="InformationScreen" component={InformationScreen} />
                    <Stack.Screen name="BlogScreen1" component={BlogScreen1} />
                    <Stack.Screen name="BlogScreen2" component={BlogScreen2} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator
                    initialRouteName="LoginScreen"
                    screenOptions={{
                        headerShown: false  // Disables the headers globally for all Screens
                    }}
                >
                    <Stack.Screen name="LoginScreen">
                        {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
                    </Stack.Screen>
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}
