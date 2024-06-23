import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { synthesizeSpeech } from '../SpeechSynthesis';

const ResultScreen = ({ route, navigation }) => {
    const { result: initialResult } = route.params;
    const [result, setResult] = useState(initialResult);
    const [topResult, setTopResult] = useState('');

    useEffect(() => {
        const top = getTopResult(result);
        setTopResult(top);
    }, [result]);

    const formatResults = (result) => {
        if (result.predicted_labels) {
            const total = Object.values(result.predicted_labels).reduce((acc, value) => acc + value, 0);
            return Object.entries(result.predicted_labels)
                .map(([label, value]) => ({ label, percentage: (value / total * 100).toFixed(2) }))
                .filter(({ percentage }) => percentage > 10) // Filter entries with percentage over 10%
                .map(({ label, percentage }) => `${label}: ${percentage}%`) // Format as label: percentage
                .join('\n');
        }
        return '';
    };

    const getTopResult = (result) => {
        if (result.predicted_labels) {
            const total = Object.values(result.predicted_labels).reduce((acc, value) => acc + value, 0);
            return Object.entries(result.predicted_labels)
                .map(([label, value]) => ({ label, percentage: (value / total * 100).toFixed(2) }))
                .filter(({ percentage }) => percentage > 50) // Filter entries with percentage over 50%
                .map(({ label }) => label) // Return label
                .join('\n');
        }
        return '';
    };

    const formattedText = formatResults(result);

    const handleSpeak = async () => {
        try {
            console.log("Top result to be synthesized:", topResult);
            await synthesizeSpeech(topResult);
            console.log("Speech synthesis completed.");
        } catch (error) {
            console.error("Error synthesizing speech:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <Image
                    source={require('../assets/circles.png')}
                    style={styles.logo}
                />
            </View>
            <Text style={styles.title}>Results</Text>
            <Text style={styles.subtitle}>Your Translation:</Text>
            <View style={styles.textBox}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.resultText}>{formattedText}</Text>
                </ScrollView>
            </View>
            <Image
                source={require('../assets/interpr.png')}
                style={styles.image}
            />
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('InterpreterChooseScreen')}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.iconButton}
                onPress={handleSpeak}
            >
                <Image
                    source={require('../assets/buttonspeak.png')}
                    style={styles.buttonIcon}
                />
                <Image
                    source={require('../assets/SPEAKERICON.png')}
                    style={styles.overlayIcon}
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
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
        bottom: 60,
    },
    subtitle: {
        fontSize: 25,
        color: 'black',
        marginBottom: 20,
        bottom: 30,
        right: 90,
    },
    textBox: {
        borderWidth: 2,
        borderColor: '#DE6969',
        backgroundColor: '#FFDADA',
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 40,
        marginBottom: 20,
        width: '90%',
        bottom: 20,
        maxHeight: 200,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    resultText: {
        fontSize: 20,
        color: 'black',
        padding: 10,
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
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 0,
        top: 150,
    },
    iconButton: {
        marginBottom: 20,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        top: -200,
    },
    buttonIcon: {
        width: 70,
        height: 70,
    },
    overlayIcon: {
        width: 40,
        height: 40,
        position: 'absolute',
    },
});

export default ResultScreen;
