import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";
import LearningCourseScreen from "./Screens/LearningCourseScreen";
import ASLInterpreterScreen from "./Screens/ASLInterpreterScreen";
import ASLFingerspellScreen from "./Screens/ASLFingerspellScreen";
import InterpreterChooseScreen from "./Screens/InterpreterChooseScreen";
import ABCScreen from "./Screens/ABCScreen";
import WordScreen from "./Screens/WordScreen";
import QuizScreen from "./Screens/QuizScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import InformationScreen from "./Screens/InformationScreen";
import BlogScreen1 from "./Screens/BlogScreen1";
import BlogScreen2 from "./Screens/BlogScreen2";
import ForgotPasswordScreen from "./Screens/ForgotPasswordScreen";

const Stack = createStackNavigator();

export default function App() {
    const userEmail = "Aaa@gmail.com"; // Replace with actual logic to get the user's email

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="LoginScreen"
                screenOptions={{
                    headerShown: false  // Disables the headers globally for all screens
                }}
            >
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="LearningCourseScreen" component={LearningCourseScreen} />
                <Stack.Screen name="ASLInterpreterScreen" component={ASLInterpreterScreen} />
                <Stack.Screen name="ASLFingerspellScreen" component={ASLFingerspellScreen} />
                <Stack.Screen name="InterpreterChooseScreen" component={InterpreterChooseScreen} />
                <Stack.Screen name="ABCScreen" component={ABCScreen} />
                <Stack.Screen name="WordScreen" component={WordScreen} />
                <Stack.Screen name="QuizScreen" component={QuizScreen} />
                <Stack.Screen name="ProfileScreen">
                    {props => <ProfileScreen {...props} userEmail={userEmail} />}
                </Stack.Screen>
                <Stack.Screen name="InformationScreen" component={InformationScreen} />
                <Stack.Screen name="BlogScreen1" component={BlogScreen1} />
                <Stack.Screen name="BlogScreen2" component={BlogScreen2} />
                <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                {/* Continue to add other screens as needed */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
