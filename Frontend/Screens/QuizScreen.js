import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';

const quizData = [
    {
        questionImage: require('../assets/Quiz1.png'), // First question image
        questionText: "What letter is represented in the image?",
        choices: ['A', 'E', 'G', 'H']
    },
    {
        questionImage: require('../assets/hello.png'), // Second question image
        questionText: "Which is the word represented in this photo?",
        choices: ['hello', 'ball', 'poll', 'same']
    },
    {
        questionImage: require('../assets/quiz3.png'), // Third question image
        questionText: "What is the 4 th letter in this word?",
        choices: ['I', 'V', 'K', 'L']
    },
    // Add more questions as needed
];

const QuizzScreen = ({ navigation }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const nextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert('End of Quiz!'); // Or navigate to a results screen
        }
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const currentData = quizData[currentQuestionIndex];

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/circles.png')}
                style={styles.logo}
            />
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Exercise</Text>

            {/* Progress Indicator with page numbers */}
            <View style={styles.progressContainer}>
                {quizData.map((item, index) => (
                    <View key={index} style={styles.progressItem}>
                        <Image
                            source={currentQuestionIndex === index ? require('../assets/Ellipse 19.png') : require('../assets/Ellipse 15.png')}
                            style={styles.progressIcon}
                        />
                        <Text style={styles.progressText}>{index + 1}</Text>
                    </View>
                ))}
            </View>

            <Image
                source={currentData.questionImage}
                style={styles.imageBelowProgress}
            />

            <Text style={styles.descriptionText}>
                {currentData.questionText}
            </Text>

            <View style={styles.buttonContainer}>
                {currentData.choices.map((choice, index) => (
                    <TouchableOpacity key={index} style={styles.choiceButton}>
                        <Text style={styles.buttonText}>{choice}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.navigationContainer}>
                <TouchableOpacity style={styles.navButton} onPress={previousQuestion}>
                    <Text style={styles.navButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={nextQuestion}>
                    <Text style={styles.navButtonText}>Next</Text>
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
        textAlign: 'center',
        bottom:5,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#DE6969',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        zIndex: 10,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    progressItem: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    progressIcon: {
        width: 20,
        height: 20,
    },
    progressText: {
        fontSize: 14,
        color: '#000',
        marginTop: 5,
    },
    imageBelowProgress: {
        width: 300,
        height: 400,
        resizeMode: 'contain',
        marginTop: 10,
        marginBottom: 20,
    },
    descriptionText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        color: '#000',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    choiceButton: {
        backgroundColor: '#DE6969',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '45%', // Adjusted for 2x2 layout
        margin: 5, // Added some margin to space out the buttons
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        position: 'absolute',
        bottom: 10,
    },
    navButton: {
        backgroundColor: '#52190a',
        padding: 15,
        borderRadius: 25,
    },
    navButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default QuizzScreen;
