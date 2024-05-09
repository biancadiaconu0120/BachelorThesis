import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const ASLFingerspellScreen = ({ navigation }) => {
    // Define a list of images to cycle through
    const images = [
        require('../assets/know.png'),
        require('../assets/look.png'),
        require('../assets/start.png'),
        // Add more images as needed
    ];

    // State to manage the current image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to cycle to the next image in the list
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Function that could be used to start camera
    const startCamera = () => {
        console.log("Camera started"); // Placeholder function
    };

    // Function to navigate back to the InterpreterChooseScreen
    const goBack = () => {
        navigation.navigate('InterpreterChooseScreen'); // Use the correct screen name as per your navigation setup
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/circles.png')}
                style={styles.logo}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>ASL Fingerspelling</Text>
                <Text style={styles.instruction}>
                    Practice fingerspelling by copying the word below. Start the camera to begin.
                </Text>
            </View>
            <View style={styles.changeableImageContainer}>
                <Image
                    source={images[currentImageIndex]}
                    style={styles.changeableImage}
                />
            </View>
            <TouchableOpacity onPress={nextImage} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Next Word</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={startCamera} style={styles.startCameraButton}>
                <Text style={styles.startCameraButtonText}>Start Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
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
    textContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: 100,
        left: 18,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    instruction: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        marginTop: 20,
    },
    changeableImageContainer: {
        marginTop: 10,
        width: 300,
        height: 200,
        alignItems: 'center',
        bottom: 70,
    },
    changeableImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    nextButton: {
        position: 'absolute',
        right: 20,
        bottom: 400,
        backgroundColor: '#DE6969',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    startCameraButton: {
        marginTop: 60,
        backgroundColor: '#DE6969',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        alignSelf: 'center',
    },
    startCameraButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#DE6969',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ASLFingerspellScreen;
