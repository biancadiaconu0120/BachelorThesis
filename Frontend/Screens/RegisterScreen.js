import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API_BASE_URL } from '../constants';

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const navigateToLogin = () => {
        navigation.navigate('LoginScreen');
    };
    const handleEmailChange = (text) => {
        const lowercaseEmail = text.toLowerCase();
        setEmail(lowercaseEmail);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            setMessage("Please complete all fields.");
            setMessageType('error');
            setIsModalVisible(true);
            return;
        }

        if (!validateEmail(email)) {
            setMessage("Please enter a valid email address.");
            setMessageType('error');
            setIsModalVisible(true);
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setMessageType('error');
            setIsModalVisible(true);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    confirm_password: confirmPassword
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage("Registration Successful. You can now login.");
                setMessageType('success');
                setIsModalVisible(true);
                setTimeout(() => {
                    setIsModalVisible(false);
                    navigateToLogin();
                }, 2000);
            } else {
                const errorText = await response.text();
                setMessage("An error occurred during registration.");
                setMessageType('error');
                setIsModalVisible(true);
            }
        } catch (error) {
            setMessage("An error occurred. Please try again later.");
            setMessageType('error');
            setIsModalVisible(true);
        }
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/circles.png')}
                style={styles.logo}
            />
            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollViewContent}
                enableOnAndroid={true}
                extraHeight={150}
                keyboardOpeningTime={0}
            >
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <ImageBackground
                            source={require('../assets/handlast.png')}
                            style={styles.titleBackground}
                            resizeMode="cover"
                        >
                        </ImageBackground>
                        <Text style={styles.title}> Sign  ME  up!</Text>
                    </View>
                    <View style={styles.fieldsContainer}>
                        <View style={styles.iconAndFieldContainer}>
                            <Image
                                source={require('../assets/mail3.png')}
                                style={styles.sideIcon}
                            />
                            <View style={styles.fieldContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={handleEmailChange}
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>
                        <View style={styles.iconAndFieldContainer}>
                            <Image
                                source={require('../assets/lockfinal.png')}
                                style={styles.sideIcon}
                            />
                            <View style={styles.fieldContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!passwordVisible}
                                />
                                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                    <Ionicons
                                        name={passwordVisible ? "eye-off" : "eye"}
                                        size={24}
                                        color="grey"
                                        style={styles.showIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.iconAndFieldContainer}>
                            <Image
                                source={require('../assets/lockfinal.png')}
                                style={styles.sideIcon}
                            />
                            <View style={styles.fieldContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!confirmPasswordVisible}
                                />
                                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                    <Ionicons
                                        name={confirmPasswordVisible ? "eye-off" : "eye"}
                                        size={24}
                                        color="grey"
                                        style={styles.showIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginPrompt}>Already have an account?</Text>
                        <TouchableOpacity onPress={navigateToLogin}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </KeyboardAwareScrollView>
            <View>

            </View>
            <Modal isVisible={isModalVisible}>
                <View style={[
                    styles.modalContent,
                    messageType === 'success' ? styles.successModal : styles.errorModal
                ]}>
                    <Text style={styles.modalText}>{message}</Text>
                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 260,
        height: 250,
        position: 'absolute',
        bottom: 650,
        left: -50,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 80,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffecf2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fieldsContainer: {
        alignItems: 'center',
        width: '100%',
    },
    iconAndFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '130%',
        marginBottom: 20,
        paddingHorizontal: 20,
        bottom: 50,
    },
    sideIcon: {
        width: 27,
        height: 28,
        marginRight: 10,
    },
    showIcon: {
        marginLeft: -5,
        right: 2,
    },
    fieldContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'white',
        overflow: 'hidden',
        paddingLeft: 10,
        width: '100%',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '200%',
    },
    titleBackground: {
        width: 120,
        height: 120,
        marginBottom: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        bottom: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 20,
        right: 2,
    },
    loginPrompt: {
        fontSize: 16,
        color: 'black',
    },
    loginText: {
        fontSize: 16,
        color: '#FC8585',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        height: 48,
        paddingLeft: 0,
        fontSize: 16,
        backgroundColor: 'transparent',
        color: 'grey',
        paddingHorizontal: 10,
    },
    button: {
        width: 90, // Set width to 95% of the screen width
        height: 50, // Maintain height for better touch area
        backgroundColor: '#FC8585',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25, // Maintain the border radius for a more rounded button
        marginTop: 50,
    },
    successMessage: {
        color: 'green',
        marginTop: 10,
    },
    errorMessage: {
        color: 'red',
        marginTop: 10,
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    successModal: {
        backgroundColor: 'green',
    },
    errorModal: {
        backgroundColor: 'red',
    },
    modalText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default RegisterScreen;
