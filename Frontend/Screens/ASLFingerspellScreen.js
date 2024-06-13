import React, { useEffect, useRef, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { API_BASE_URL } from "../constants";
import { Ionicons } from '@expo/vector-icons';

const ASLFingerspellScreen = ({ navigation }) => {
    const images = [
        require('../assets/know.png'),
        require('../assets/look.png'),
        require('../assets/start.png'),
    ];

    const targetWords = ["know", "look", "start"];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [targetWord, setTargetWord] = useState(targetWords[0]);
    const [cameraPermissionInfo, requestCameraPermission] = useCameraPermissions();
    const [microphonePermissionInfo, requestMicrophonePermission] = useMicrophonePermissions();
    const [isRecording, setIsRecording] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [cameraFacing, setCameraFacing] = useState('front');
    const cameraRef = useRef(null);
    const [predictedLetters, setPredictedLetters] = useState([]);
    const [isWordComplete, setIsWordComplete] = useState(false);

    useEffect(() => {
        (async () => {
            const cameraStatus = await requestCameraPermission();
            const microphoneStatus = await requestMicrophonePermission();
            if (!cameraStatus.granted || !microphoneStatus.granted) {
                Alert.alert("Permissions required", "Camera and microphone permissions are needed to record video.");
            }
        })();
    }, []);

    if (!cameraPermissionInfo || !microphonePermissionInfo) {
        return <View style={styles.container}><Text>Requesting permissions...</Text></View>;
    }

    if (!cameraPermissionInfo.granted || !microphonePermissionInfo.granted) {
        return (
            <View style={styles.container}>
                <Text>No access to camera or microphone</Text>
                <TouchableOpacity onPress={() => {
                    requestCameraPermission();
                    requestMicrophonePermission();
                }}>
                    <Text>Grant Permissions</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % images.length;
            setTargetWord(targetWords[newIndex]);
            setPredictedLetters([]);
            setIsWordComplete(false);
            return newIndex;
        });
    };

    const retakeWord = () => {
        setPredictedLetters([]);
        setIsWordComplete(false);
    };

    const startRecording = async () => {
        if (cameraRef.current && !isRecording) {
            setIsRecording(true);
            setIsButtonVisible(true);
            try {
                const video = await cameraRef.current.recordAsync();
                await uploadVideo(video.uri);
            } catch (error) {
                console.error('Error recording video:', error);
                Alert.alert('Error', `Failed to record video: ${error.message}`);
                setIsRecording(false);
            }
        }
    };

    const stopRecording = () => {
        if (cameraRef.current && isRecording) {
            cameraRef.current.stopRecording();
            setIsRecording(false);
        }
    };

    const handlePredictionResult = (result) => {
        if (result.predicted_labels) {
            const total = Object.values(result.predicted_labels).reduce((acc, value) => acc + value, 0);
            const topPrediction = Object.entries(result.predicted_labels)
                .map(([label, value]) => ({ label, percentage: (value / total * 100).toFixed(2) }))
                .filter(({ percentage }) => percentage > 50)
                .sort((a, b) => b.percentage - a.percentage)[0];

            if (topPrediction) {
                setPredictedLetters((prevLetters) => {
                    const newLetters = [...prevLetters, topPrediction.label];
                    if (newLetters.length === targetWord.length) {
                        setIsWordComplete(true);
                    }
                    return newLetters;
                });
            }
        }
    };

    const uploadVideo = async (uri) => {
        try {
            const response = await FileSystem.uploadAsync(
                `${API_BASE_URL}/asl/predict`,
                uri,
                {
                    fieldName: 'video',
                    httpMethod: 'POST',
                    headers: {
                        'Content-Type': 'video/mp4',
                    },
                    uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
                }
            );

            const result = JSON.parse(response.body);
            console.log('Prediction result:', result);
            handlePredictionResult(result);
        } catch (error) {
            console.error('Error uploading video:', error);
            Alert.alert('Error', `Failed to upload video: ${error.message}`);
        }
    };

    const goBack = () => {
        navigation.navigate('InterpreterChooseScreen');
    };

    const toggleCameraFacing = () => {
        setCameraFacing((prevFacing) => (prevFacing === 'front' ? 'back' : 'front'));
    };

    const LetterBox = ({ letter, index }) => {
        const isFilled = letter !== undefined && letter !== '';
        const isCorrect = isFilled && letter.toLowerCase() === targetWord[index].toLowerCase();
        const boxStyle = isFilled ? (isCorrect ? styles.correctLetterBox : styles.incorrectLetterBox) : styles.emptyLetterBox;

        return (
            <View style={[styles.letterBox, boxStyle]}>
                <Text style={styles.letterText}>{letter}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/circles.png')}
                style={styles.logo}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>ASL Fingerspelling</Text>
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
            <View style={styles.predictionContainer}>
                <View style={styles.letterBoxContainer}>
                    {Array.from({ length: targetWord.length }).map((_, index) => (
                        <LetterBox key={index} letter={predictedLetters[index] || ''} index={index} />
                    ))}
                </View>
            </View>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={cameraFacing}
                onCameraReady={() => console.log('Camera is ready')}
                onMountError={(error) => console.log('Camera mount error:', error.message)}
                videoStabilizationMode={'auto'}
                videoQuality={'720p'}
                mute={true}
                mode={'video'}
            >
                <View style={styles.buttonContainer}>
                    {isButtonVisible && (
                        isRecording ? (
                            <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopRecording}>
                                <Text style={styles.text}>Stop Recording</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={[styles.button, styles.startButton]} onPress={startRecording} disabled={isWordComplete}>
                                <Text style={styles.text}>Start Recording</Text>
                            </TouchableOpacity>
                        )
                    )}
                </View>
            </CameraView>
            {isWordComplete && (
                <TouchableOpacity onPress={retakeWord} style={styles.retakeButton}>
                    <Text style={styles.retakeButtonText}>Retake Word</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={toggleCameraFacing} style={styles.reverseButton}>
                <Ionicons name="camera-reverse" size={30} color="white" />
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
        bottom: 650,
        left: -50,
    },
    textContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: 100,
        left: 18,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        left: 70,
        top: -20,
    },
    changeableImageContainer: {
        marginTop: 10,
        width: 250,
        height: 240,
        alignItems: 'center',
        top: 35,
    },
    changeableImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    nextButton: {
        position: 'absolute',
        right: 20,
        top: 300,
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
    backButton: {
        position: 'absolute',
        top: 40,
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
    camera: {
        flex: 1,
        maxHeight: '50%',
        width: '100%',
        top: 25,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    startButton: {
        backgroundColor: '#4CAF50',
    },
    stopButton: {
        backgroundColor: '#F44336',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    reverseButton: {
        position: 'absolute',
        top: 440,
        left: 20,
        backgroundColor: '#DE6969',
        padding: 10,
        borderRadius: 20,
    },
    predictionContainer: {
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    letterBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        left: 0,
    },
    letterBox: {
        width: 40,
        height: 40,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        top: 20,
    },
    emptyLetterBox: {
        backgroundColor: 'gray',
    },
    correctLetterBox: {
        backgroundColor: 'green',
    },
    incorrectLetterBox: {
        backgroundColor: 'red',
    },
    letterText: {
        color: 'white',
        fontSize: 23,
        fontWeight: 'bold',
    },
    retakeButton: {
        position: 'absolute',
        bottom: 490,
        backgroundColor: '#DE6969',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        right: 283,
    },
    retakeButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ASLFingerspellScreen;
