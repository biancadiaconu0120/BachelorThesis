import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View, Modal } from 'react-native';

const quizData = [
    {
        questionImage: require('../assets/Quiz1.png'),
        questionText: "What letter is represented in the image?",
        choices: ['A', 'E', 'G', 'H'],
        correctAnswer: 'A'
    },
    {
        questionImage: require('../assets/hello.png'),
        questionText: "Which is the word represented in this photo?",
        choices: ['hello', 'ball', 'poll', 'same'],
        correctAnswer: 'hello'
    },
    {
        questionImage: require('../assets/quiz3.png'),
        questionText: "What is the 4th letter in this word?",
        choices: ['I', 'V', 'K', 'L'],
        correctAnswer: 'V'
    },
];

const QuizzScreen = ({ navigation }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const handleChoice = (choice) => {
        if (choice === quizData[currentQuestionIndex].correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setModalVisible(true);
        }
    };

    const getImageForScore = (score) => {
        switch(score) {
            case 1:
                return require('../assets/sademotion.png');
            case 2:
                return require('../assets/noemotion.png');
            case 3:
                return require('../assets/crown.png');
            default:
                return require('../assets/sademotion.png');
        }
    };

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
                source={quizData[currentQuestionIndex].questionImage}
                style={styles.imageBelowProgress}
            />

            <Text style={styles.descriptionText}>
                {quizData[currentQuestionIndex].questionText}
            </Text>

            <View style={styles.buttonContainer}>
                {quizData[currentQuestionIndex].choices.map((choice, index) => (
                    <TouchableOpacity key={index} style={styles.choiceButton} onPress={() => handleChoice(choice)}>
                        <Text style={styles.buttonText}>{choice}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.navigationContainer}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0))}
                >
                    <Text style={styles.navButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => handleChoice(quizData[currentQuestionIndex].correctAnswer)}
                >
                    <Text style={styles.navButtonText}>Next</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Quiz Completed!</Text>
                        <Text style={styles.modalText}>Your final score is: {score}</Text>
                        <Image
                            source={getImageForScore(score)}
                            style={styles.congratulationsImage}
                        />
                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                navigation.goBack();
                            }}
                        >
                            <Text style={styles.textStyle}>Close Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        bottom: 5,
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
        minWidth: '45%',
        margin: 5,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "#ffecf2",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxWidth: '80%',
        borderColor: '#DE6969',
        borderWidth: 2,
    },

    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: '#333'
    },
    modalText: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: "center",
        color: '#555'
    },
    buttonClose: {
        backgroundColor: '#DE6969',
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    congratulationsImage: {
        width: 60,
        height: 60,
        marginTop: 20,
        marginBottom: 20,
        bottom:20,
    }
});

export default QuizzScreen;
