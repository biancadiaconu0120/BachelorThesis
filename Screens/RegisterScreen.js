import React, {useState} from 'react';
import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        // Registration logic here
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/circles.png')}
                style={styles.logo}
            />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                                  style={styles.keyboardAvoidingView}>
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <ImageBackground
                            source={require('../assets/hand-sign.png')}
                            style={styles.titleBackground}
                            resizeMode="cover"
                        >

                        </ImageBackground>
                        <Text style={styles.title}>Sign ME up!</Text>
                    </View>
                    {/* Icon on the middle left side */}
                    <Image
                        source={require('../assets/mail.png')} // Replace 'your-icon.png' with your icon's file name
                        style={styles.sideIcon}
                    />
                    {/* Second icon below the first one */}
                    <Image
                        source={require('../assets/lock.png')} // Replace with your second icon's file name
                        style={[styles.sideIcon, styles.secondIcon]}
                    />
                    {/* Third icon below the second one */}
                    <Image
                        source={require('../assets/lock.png')} // Replace with your third icon's file name
                        style={[styles.sideIcon, styles.thirdIcon]}
                    />
                    <View style={styles.fieldContainer}>

                        <View style={styles.inputWithButton}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />
                            {/* If you have an icon/button for the email input, include it here, else this can be omitted */}
                        </View>
                    </View>
                    <View style={styles.fieldContainer}>

                        <View style={styles.inputWithButton}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                            />
                            <TouchableOpacity style={styles.iconButtonInsideInput}>
                                <Image
                                    source={require('../assets/Show.png')}
                                    style={styles.buttonImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.fieldContainer}>

                        <View style={styles.inputWithButton}>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={true}
                            />
                            <TouchableOpacity style={styles.iconButtonInsideInput}>
                                <Image
                                    source={require('../assets/Show.png')}
                                    style={styles.buttonImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', marginTop: 30}}>
                        <Text style={styles.loginText}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style={[styles.loginText, {fontWeight: 'bold'}]}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    inputWrapper: {
        flexDirection: 'row', // Align items in a row
        alignItems: 'center', // Center items vertically in the row
        width: '75%', // Match the width of your TextInput components
        height: 40, // Match the height of your TextInput components
        marginBottom: 40, // Keep your existing margin
        paddingLeft: 10, // Padding to the left of the logo
        borderRadius: 20, // Match the border radius of your TextInput components
        borderWidth: 1,
        borderColor: 'white', // Border color set to white to blend with the background
        backgroundColor: 'white', // Match the background color of your TextInput components
    },
    inputLogo: {
        width: 20, // Set a fixed width for your logo
        height: 20, // Set a fixed height for your logo
        marginRight: 10, // Add some space between the logo and the TextInput
    },


    logo: {
        width: 260,
        height: 250,
        position: 'absolute',
        bottom: 730,
        left: -50,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        padding: 20,
        marginTop: 80,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffecf2',
        alignItems: 'center', // Added to center content, adjust as necessary
        justifyContent: 'center', // Added to center content, adjust as necessary
    },
    sideIcon: {
        position: 'absolute',
        left: 0, // Adjust based on how far from the left edge you want the icon
        top: '33%', // Adjust if necessary to move the icon up or down
        width: 25, // Adjust according to the size of your icon
        height: 25, // Adjust according to the size of your icon
        // transform: [{ translateY: -25 }], // Adjusts the icon to be centered vertically based on its height

    },
    secondIcon: {
        top: '42%', // Adjust the position under the first icon
    },
    thirdIcon: {
        top: '52%', // Adjust the position under the second icon
    },
    titleContainer: {
        justifyContent: 'top',
        alignItems: 'center',
        width: '150%',
    },
    titleBackground: {
        width: 115,
        height: 115,
        marginBottom: 80,
        justifyContent: 'top',
        alignItems: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        bottom: 150,
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginText: {
        marginTop: 30,
        color: 'black',
        fontSize: 16,
    },


    inputWithLogo: {
        // Now only used for the actual TextInput styling
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
        flex: 1, // Takes the remaining space in the flexDirection row
        height: 40,
        paddingLeft: 10,
    },


    iconButton: {
        padding: 10,
    },


    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: 'white',
        borderRadius: 30, // Makes the container rounded
        borderWidth: 1,
        borderColor: 'white',
        overflow: 'hidden',
    },
    logoStyle: {
        marginLeft: 15, // Adjust as needed
        marginRight: 5, // Spacing between icon and input field
        width: 24,
        height: 24,
    },
    inputWithButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20, // Adjust the space for the icon inside the input if needed
    },
    input: {
        flex: 1,
        height: 48, // Increased height for a slightly bigger input
        paddingLeft: 10,
        fontSize: 16, // Optionally adjust font size if needed
        backgroundColor: 'transparent', // Keeps the TextInput transparent to show the container's background
        color: 'grey', // Text color
    },
    iconButtonInsideInput: {
        // Intentionally left blank since the button does not have functionality yet
    },
    buttonImage: {
        width: 24,
        height: 24,
    },
    button: {
        width: '50%', // Makes the button smaller
        height: 40, // Reduces the height to make it smaller
        backgroundColor: '#FC8585', // Changes the button color to #FC8585
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20, // Increases the border radius to make it rounded
        marginTop: 50,
    },

});

export default RegisterScreen;