import React, { useState, useEffect } from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../constants';

const LoginScreen = ({ navigation, setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleEmailChange = (text) => {
        const lowercaseEmail = text.toLowerCase();
        setEmail(lowercaseEmail);
    };

    useEffect(() => {
        const loadCredentials = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('email');
                const savedPassword = await AsyncStorage.getItem('password');
                const savedRememberMe = await AsyncStorage.getItem('rememberMe');

                if (savedEmail && savedPassword && savedRememberMe === 'true') {
                    setEmail(savedEmail);
                    setPassword(savedPassword);
                    setRememberMe(true);
                } else {
                    await AsyncStorage.removeItem('email');
                    await AsyncStorage.removeItem('password');
                    await AsyncStorage.removeItem('rememberMe');
                }
            } catch (error) {
                console.error('Failed to load credentials', error);
            }
        };

        loadCredentials();
    }, []);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleLogin = async () => {
        if (!email || !password) {
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

        setLoading(true);
        setMessage('');
        try {
            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage("Login successful.");
                setMessageType('success');
                setIsModalVisible(true);

                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('password', password);
                await AsyncStorage.setItem('rememberMe', rememberMe.toString());

                setTimeout(() => {
                    setIsModalVisible(false);
                    setIsLoggedIn(true);
                    // navigation.navigate('HomeScreen');
                }, 2000);
            } else {
                const errorText = await response.text();
                setMessage("Login failed. Please check your credentials.");
                setMessageType('error');
                setIsModalVisible(true);
            }
        } catch (error) {
            console.error("Login Error:", error);
            setMessage("An error occurred. Please try again later.");
            setMessageType('error');
            setIsModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
                <Image
                    source={require('../assets/circles.png')}
                    style={styles.logo}
                />
                <View style={styles.content}>
                    <Text style={styles.title}>Login</Text>
                    <View style={[styles.fieldRow, styles.emailFieldAdjustment]}>
                        <Image
                            source={require('../assets/mail3.png')}
                            style={styles.icon}
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

                    <View style={[styles.fieldRow, styles.emailFieldAdjustment]}>
                        <Image
                            source={require('../assets/lock3.png')}
                            style={styles.icon}
                        />
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!passwordVisible}
                            />
                            <TouchableOpacity
                                onPress={() => setPasswordVisible(!passwordVisible)}
                                style={styles.showButton}
                            >
                                <Ionicons
                                    name={passwordVisible ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="grey"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.rememberMeContainer}>
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => setRememberMe(!rememberMe)}>
                            <Ionicons
                                name={rememberMe ? 'checkbox' : 'square-outline'}
                                size={24}
                                color={rememberMe ? '#FC8585' : 'grey'}
                            />
                            <Text style={styles.checkboxLabel}>Remember Me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ForgotPasswordScreen')}
                            style={styles.forgotPassword}>
                            {/*<Text style={styles.forgotPasswordText}>Forgot your password?</Text>*/}
                        </TouchableOpacity>
                    </View>

                    {loading ? <ActivityIndicator size="large" color="#FC8585" /> : (
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    )}

                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>
                            You don't have an account?{' '}
                            <Text onPress={() => navigation.navigate('RegisterScreen')} style={styles.registerLink}>
                                Register Now
                            </Text>
                        </Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
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
    container: {
        flex: 1,
        backgroundColor: '#ffecf2',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 260,
        height: 250,
        position: 'absolute',
        bottom: 650,
        left: -50,
    },
    content: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 10,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        marginTop: -80,
        marginBottom: 80,
    },
    fieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
        width: 300,
        right: 9,
    },
    icon: {
        width: 24,
        height: 24,
        marginHorizontal: 16,
    },
    input: {
        height: 48,
        paddingLeft: 10,
        fontSize: 16,
        color: 'grey',
        flex: 1,
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'white',
        overflow: 'hidden',
        flex: 1,
    },
    button: {
        width: '50%',
        height: 40,
        backgroundColor: '#FC8585',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
        marginBottom: 40,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: 'grey',
    },
    forgotPassword: {
        marginLeft: 20,
    },
    forgotPasswordText: {
        fontSize: 16,
        color: '#FC8585',
        fontWeight: 'bold',
    },
    showButton: {
        padding: 10,
    },
    showButtonImage: {
        width: 24,
        height: 24,
    },
    registerContainer: {
        marginTop: 70,
    },
    registerText: {
        fontSize: 16,
        color: 'grey',
    },
    registerLink: {
        fontSize: 16,
        color: '#FC8585',
        fontWeight: 'bold',
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

export default LoginScreen;
