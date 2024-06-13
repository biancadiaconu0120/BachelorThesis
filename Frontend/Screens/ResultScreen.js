import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
    const { result } = route.params;

    const formatResults = (result) => {
        if (result.predicted_labels) {
            const total = Object.values(result.predicted_labels).reduce((acc, value) => acc + value, 0);
            return Object.entries(result.predicted_labels)
                .map(([label, value]) => ({ label, percentage: (value / total * 100).toFixed(2) }))
                .filter(({ percentage }) => percentage > 10) // Filter entries with percentage over 10%
                .map(({ label, percentage }) => `${label}: ${percentage}%`) // Format as label: percentage
                .join('\n'); // Join labels with newline character
        }
        return '';
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
                    <Text style={styles.resultText}>{formatResults(result)}</Text>
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
        borderColor: '#DE6969', // Dark pink border color
        backgroundColor: '#FFDADA', // Light pink background color
        borderRadius: 20, // Rounded corners
        paddingVertical: 30, // Vertical padding
        paddingHorizontal: 40, // Horizontal padding
        marginBottom: 20,
        width: '90%',
        bottom: 20,
        maxHeight: 200, // Set maximum height for the textbox
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    resultText: {
        fontSize: 20, // Increase font size
        color: 'black',
        padding: 10,
        textAlign: 'center', // Center the text horizontally
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
        marginBottom: 0, // Adjust margin as needed
        top: 150,
    },
});

export default ResultScreen;
