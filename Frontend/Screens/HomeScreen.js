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


            <TouchableOpacity
                style={styles.topIconButton}
                onPress={() => {
                    console.log("Top icon button pressed");
                    navigation.navigate('InformationScreen');
                }}
            >
                <Image
                    source={require('../assets/question.png')}
                    style={styles.topIcon}
                />
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                    console.log("Icon button pressed");
                    navigation.navigate('ProfileScreen');
                }}
            >
                <Image
                    source={require('../assets/usericon.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>


            <View style={styles.sectionContainer}>
                <Image
                    source={require('../assets/Technology (1).png')}
                    style={styles.sectionImage}
                />
                <Text style={styles.sectionText}>Fingerspell And</Text>
                <Text style={styles.sectionText4}>Sign Language Interpreter</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('InterpreterChooseScreen')}
                >
                    <Text style={styles.buttonText}>Start Signing!</Text>
                </TouchableOpacity>
                <Image
                    source={require('../assets/2.png')}
                    style={styles.additionalImage1}
                />
                <Image
                    source={require('../assets/SIGN.png')}
                    style={styles.additionalImage2}
                />
            </View>


            <View style={styles.sectionContainer}>
                <Image
                    source={require('../assets/Technology (1).png')}
                    style={styles.sectionImage}
                />
                <Text style={styles.sectionText3}>Master ASL</Text>
                <Text style={styles.sectionText2}>Begin Your Journey!</Text>
                <Image
                    source={require('../assets/ASL.png')}
                    style={styles.additionalImage}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('LearningCourseScreen')}
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
        bottom: 650,
        left: -50,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20,
        top:20,
        left:10,
    },
    sectionContainer: {
        width: '120%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        top: 60,
    },
    sectionImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        position: 'absolute',
    },
    sectionText: {
        color: 'white',
        fontSize: 33,
        fontWeight: 'bold',
        marginBottom: 20,
        zIndex: 1,
        right: 80,
        top:80,
    },
    sectionText2: {
        color: 'white',
        fontSize: 33,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        zIndex: 1,
        top:10,
        right: 45,
    },
    sectionText3: {
        color: 'white',
        fontSize: 33,
        fontWeight: 'bold',
        marginBottom: 60,
        zIndex: 1,
        right: 110,
        top:70,
    },
    sectionText4: {
        color: 'white',
        fontSize: 33,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        zIndex: 1,
        top:60,
    },
    button: {
        padding: 12,
        borderRadius: 25,
        backgroundColor: '#DE6969',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 55,
        left: 50,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    additionalImage: {
        width: 250,
        height: 200,
        // resizeMode: 'contain',
        // position: 'absolute',
        bottom: 40,
        left: 75,
    }
    ,
    additionalImage1: {
        width: 100,
        height: 145,
        // resizeMode: 'contain',
        // position: 'absolute',
        top:45,
        left: 150,
    },
    additionalImage2: {
        width: 220,
        height: 115,
        // resizeMode: 'contain',
        // position: 'absolute',
        bottom: 90,
        left: 30,
    },


    iconButton: {
        position: 'absolute',
        right: 10,
        top: 40,
        padding: 10,
    },
    icon: {
        width: 45,
        height: 45,
    },
    topIconButton: {
        position: 'absolute',
        right: 75,
        top: 40,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topIcon: {
        width: 45,
        height: 45,
    },
    buttonIcon: {
        width: 20,
        height: 30,
        bottom: 35,
    },
});

export default HomeScreen;
