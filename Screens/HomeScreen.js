import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/circles.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Ready to Sign?</Text>

            {/* New Top Icon Button */}
            <TouchableOpacity
                style={styles.topIconButton}
                onPress={() => {
                    console.log("Top icon button pressed");
                    navigation.navigate('InformationScreen');  // Navigates to InformationScreen
                }}
            >
                <Image
                    source={require('../assets/images/Info.png')}
                    style={styles.topIcon}
                />
                <Image
                    source={require('../assets/images/help.png')} // Adjust the path to your image file
                    style={styles.buttonIcon}
                />
            </TouchableOpacity>

            {/* Existing Icon Button */}
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                    console.log("Icon button pressed");
                    navigation.navigate('ProfileScreen');  // Navigates to ProfileScreen
                }}
            >
                <Image
                    source={require('../assets/images/Profile Circle.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>

            {/* First Image Section with Button */}
            <View style={styles.sectionContainer}>
                <Image
                    source={require('../assets/firstsection.png')}
                    style={styles.sectionImage}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('InterpreterChooseScreen')} // Navigates to InterpreterChooseScreen
                >
                    <Text style={styles.buttonText}>Start Signing!</Text>
                </TouchableOpacity>
            </View>

            {/* Second Image Section with Button */}
            <View style={styles.sectionContainer}>
                <Image
                    source={require('../assets/secondsection.png')}
                    style={styles.sectionImage}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('LearningCourseScreen')} // Navigates to LearningCourseScreen
                >
                    <Text style={styles.buttonText}>Start Learning!</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffecf2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 260,
        height: 250,
        position: 'absolute',
        bottom: 730,
        left: -50,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 15,
    },
    sectionContainer: {
        width: '120%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    sectionImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        position: 'absolute',
    },
    button: {
        padding: 15,
        borderRadius: 25,
        backgroundColor: '#DE6969',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 45,
        left: 55,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    iconButton: {
        position: 'absolute',
        right: 20,
        top: 80,
        padding: 10,
    },
    icon: {
        width: 50,
        height: 50,
    },
    topIconButton: {
        position: 'absolute',
        right: 20,
        top: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topIcon: {
        width: 50,
        height: 50,
    },
    buttonIcon: {
        width: 20,
        height: 30,
        bottom: 35,
    },
});

export default HomeScreen;
