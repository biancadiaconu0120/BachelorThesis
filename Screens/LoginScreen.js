import React, {useState} from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        // Add your actual login logic here
        // If login is successful, navigate to the Home screen
        console.log("Login button pressed");
        navigation.navigate('HomeScreen'); // Make sure 'Home' matches the screen name in your navigator setup
    };

    const handleForgotPassword = () => {
        // Logic for forgotten password
        console.log('Forgot Password Pressed');
        // For example, navigate to a different screen
        // navigation.navigate('ForgotPasswordScreen');
    };
    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
        console.log('Remember Me:', !rememberMe);
    };

    return (
        <SafeAreaView style={styles.container}>
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

                <View style={styles.fieldRow}>
                    <Image
                        source={require('../assets/lock.png')}
                        style={styles.icon}
                    />
                    <View style={styles.fieldContainer}>
                        <TextInput
                            style={[styles.input, {flexGrow: 1}]}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={styles.showButton}>
                            <Image
                                source={require('../assets/Show.png')}
                                style={styles.showButtonImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity onPress={toggleRememberMe}>
                        <Text style={[styles.optionText, rememberMe ? styles.optionSelected : null]}>
                            Remember Me
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.optionText}>Forget password?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.registerContainer}>
                    <Text style={styles.loginText}>Don’t have an account yet?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={[styles.loginText, {fontWeight: 'bold'}]}>Register Now</Text>
                    </TouchableOpacity>
                </View>
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
    content: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop:60,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 80,
    },
    fieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        flex: 1, // Ensures that each row (email and password) has equal width
    },
    // fieldContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     backgroundColor: 'white',
    //     borderRadius: 30,
    //     borderWidth: 1,
    //     borderColor: 'white',
    //     overflow: 'hidden',
    //     flex: 1, // Make sure it takes up the remaining space
    // },

    // input: {
    //     height: 48,
    //     paddingLeft: 10,
    //     fontSize: 16,
    //     color: 'grey',
    //     flex: 1, // Ensure input fills the space within its container
    // },

    button: {
        width: '50%',
        height: 40,
        backgroundColor: '#FC8585',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 100,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,

    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    loginText: {
        color: 'black',
        fontSize: 16,
    },
// Adjust icon style if needed
    icon: {
        width: 24,
        height: 24,
        marginHorizontal: 16, // Increase spacing to visually separate the icon from the input field
    },
    showButton: {
        padding: 5, // Adjust the padding as needed
    },
    showButtonImage: {
        width: 24,
        height: 24, // Adjust size as necessary
    },
    // Adjust the input style to allow space for the Show button
    input: {
        height: 48,
        paddingLeft: 10,
        fontSize: 16,
        color: 'grey',
        flex: 1, // Ensures input fills the space within its container
    },
    // Make sure fieldContainer supports the inline Show button
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        overflow: 'hidden',
        flex: 1, // This ensures that the container takes up the full width available after the icon
    },
    emailFieldAdjustment: {
        marginLeft: -40, // Or any other value that suits your design
    },
    emailFieldContainer: {
        flex: 200, // Increase flex value to make the email field longer
        width: '80%',
    },
    forgotPasswordContainer: {
        width: '80%',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: 'darkblue', // Sets the color to dark blue
        fontWeight: 'bold', // Makes the text bold
        right:40,

    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Maintains space between but can be adjusted further if necessary
        width: '85%', // Reduce or adjust width to control space between options
        marginTop:10,
        marginBottom: 30,
        paddingHorizontal: 10, // Adding padding to the sides might help in reducing the overall space
        left:20,
    },
    optionText: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',

    },
    optionSelected: {
        color: 'light blue', // Or any indication that it's selected
    },
});

export default LoginScreen;