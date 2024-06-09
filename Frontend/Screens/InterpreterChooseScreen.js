import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const InterpreterChooseScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* New Back button at the top right */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}  // Assumes navigation.goBack is the desired action
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <Image
                source={require('../assets/circles.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>ASL Interpretor</Text>
            <View style={[styles.middleRectangle, { top: '40%' }]}>
                <Text style={styles.rectangleText}>Real-time interpretor</Text>
                <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => navigation.navigate('ASLInterpreterScreen')}
                >
                    <Text style={styles.buttonText}>Start!</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.middleRectangle, { top: '50%' }]}>
                <Text style={styles.rectangleText}>Practice FingerSpelling</Text>
                <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => navigation.navigate('ASLFingerspellScreen')}
                >
                    <Text style={styles.buttonText}>Start!</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>
                Select your ASL focus: Interpreting or Fingerspelling.
            </Text>
            <Image
                source={require('../assets/imagesign.png')}
                style={styles.bottomImage}
            />
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
        marginTop: 15,
        marginBottom: 20,
        // left:20,
        top:40,
    },
    middleRectangle: {
        width: 350,
        height: 80,
        backgroundColor: '#FFDADA',
        borderColor: 'white',
        borderWidth: 2,
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -175 }, { translateY: -40 }],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    rectangleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    startButton: {
        backgroundColor: '#DE6969',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        paddingHorizontal: 40,
        marginBottom: 580,
        top:40,
    },
    bottomImage: {
        width: 450,
        height: 300,
        position: 'absolute',
        bottom:0,
        left: '30%',
        transform: [{ translateX: -150 }],
    },
    backButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#DE6969',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    }
});

export default InterpreterChooseScreen;
