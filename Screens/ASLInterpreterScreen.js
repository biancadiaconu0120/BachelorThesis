import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';

const ASLInterpreterScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Image
                source={require('../assets/circles.png')}
                style={styles.logo}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>ASL Interpreter</Text>
                <Text style={styles.instruction}>In order to start interpreting you need to start the camera.</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
                    <Text style={styles.buttonText}>Start Camera!</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.translationLabel}>Your Translation:</Text>
            <TextInput
                style={styles.translationInput}
                placeholder="Translated text appears here..."
                placeholderTextColor="#999"
                editable={false}
            />
            <TouchableOpacity style={styles.imageButton} onPress={() => { /* Define what happens when button is pressed */ }}>
                <Image
                    style={styles.buttonImage}
                    source={require('../assets/innter-mic-btn.png')}
                />
                <Image
                    style={styles.overlayIcon}
                    source={require('../assets/Speaker.png')}
                />
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
        top: 150,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    instruction: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginTop: 20,
    },
    button: {
        marginTop: 30,
        backgroundColor: '#DE6969',
        padding: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    translationLabel: {
        position: 'absolute',
        left: 10,
        top: '50%',
        fontSize: 25,
        color: 'black',
    },
    translationInput: {
        position: 'absolute',
        top: '58%',
        left: 10,
        right: 10,
        backgroundColor: '#F9A4A4',
        fontSize: 20,
        color: 'black',
        paddingVertical: 60,
        paddingHorizontal: 15,
        borderRadius: 30,
    },
    imageButton: {
        position: 'absolute',
        top: '80%',
        alignSelf: 'center',
        padding: 10,
    },
    buttonImage: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
    overlayIcon: {
        position: 'absolute',
        top: 25,
        left: 25,
        width: 40,
        height: 40,
        resizeMode: 'contain',
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
        textAlign: 'center',  // Ensure text is centered within the button
    }
});

export default ASLInterpreterScreen;
