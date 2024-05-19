import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CameraView, useCameraPermissions, useMicrophonePermissions} from 'expo-camera';

export default function App() {
    const [cameraPermissionInfo, requestCameraPermission] = useCameraPermissions();
    const [microphonePermissionInfo, requestMicrophonePermission] = useMicrophonePermissions();
    const [isRecording, setIsRecording] = useState(false);
    const cameraRef = useRef(null);

    // Request camera and microphone permissions on component mount
    useEffect(() => {
        (async () => {
            const cameraStatus = await requestCameraPermission();
            const microphoneStatus = await requestMicrophonePermission();
            if (!cameraStatus.granted || !microphoneStatus.granted) {
                Alert.alert("Permissions required", "Camera and microphone permissions are needed to record video.");
            }
        })();
    }, []);

    // Check permission status and request if not granted
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

    // Function to start recording

    const startRecording = async () => {
        if (cameraRef.current && !isRecording) {
            console.log("Trying to start recording...");
            setIsRecording(true); // Set recording to true immediately to block any overlapping starts
            try {
                const video = await cameraRef.current.recordAsync();
                console.log('Video recorded:', video.uri);
            } catch (error) {
                console.error('Error recording video:', error);
                Alert.alert('Error', `Failed to record video: ${error.message}`);
            }
            setIsRecording(false); // Set recording to false after the recording process is complete or fails
        } else {
            if (isRecording) {
                console.log("Recording is already in progress");
            } else {
                console.log("Camera not ready");
            }
        }
    };

// Function to stop recording
    const stopRecording = () => {
        if (cameraRef.current && isRecording) {
            console.log("Stopping recording...");
            cameraRef.current.stopRecording(); // Attempt to stop the recording
            setIsRecording(false); // Always set isRecording to false
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                onCameraReady={() => console.log('Camera is ready')}
                onMountError={(error) => console.log('Camera mount error:', error.message)}
                // videoQuality={'1080p'}
                mute={true}
                mode={'video'}
                facing={'front'}  // TODO: Allow the user to change this
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={startRecording}>
                        <Text style={styles.text}>Start Recording</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={stopRecording}>
                        <Text style={styles.text}>Stop Recording</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        width: '100%',
        aspectRatio: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        color: '#000',
    },
});
