import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ImageBackground, // Import ImageBackground
} from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        console.log("Login button pressed");
        navigation.navigate('HomeScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Set an image as the background and apply a blur effect */}
            <ImageBackground
                source={require('../assets/login.png')}
                style={styles.backgroundImage}
                blurRadius={5} // You can adjust the blur radius
            >
                <Image
                    source={require('../assets/circles.png')}
                    style={styles.logo}
                />
                <View style={styles.content}>
                    <Text style={styles.title}>Login</Text>
                    <View style={[styles.fieldRow, styles.emailFieldAdjustment]}>
                        <Image
                            source={require('../assets/mail.png')}
                            style={styles.icon}
                        />
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />
                        </View>
                    </View>

                    <View style={[styles.fieldRow, styles.emailFieldAdjustment]}>
                        <Image
                            source={require('../assets/lock.png')}
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
                                <Image
                                    source={require('../assets/Show.png')}
                                    style={styles.showButtonImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.rememberMeContainer}>
                        <TouchableOpacity
                            style={styles.checkbox}
                            onPress={() => setRememberMe(!rememberMe)}>
                            <Text style={styles.checkboxLabel}>Remember Me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ForgotPasswordScreen')}
                            style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffecf2', // This might be overridden by the ImageBackground
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        justifyContent: 'center', // Ensure content is centered
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
        width: 350,
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
        backgroundColor: '#FFC0CB', // Light pink background color
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
    checkbox: {
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
        textDecorationLine: 'underline',
    },
    showButton: {
        padding: 10,
    },
    showButtonImage: {
        width: 24,
        height: 24,
    },
});

export default LoginScreen;
