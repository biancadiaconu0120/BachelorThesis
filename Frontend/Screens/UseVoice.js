import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import {synthesizeSpeech} from "../SpeechSynthesis";


const UseVoice = () => {
    const [text, setText] = useState('');

    const handleSpeak = async () => {
        try {
            await synthesizeSpeech(text);
        } catch (error) {
            console.error("Error synthesizing speech: ", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.background}>
                <Image
                    source={require('../assets/circles.png')}
                    style={styles.logo}
                />
            </View>
            <Text style={styles.title}>Words to Voice</Text>
            <Text style={styles.subtitle}>Convert Your Text into Clear Speech</Text>
            <View style={styles.textBox}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <TextInput
                        style={styles.resultText}
                        placeholder="Enter your text here"
                        multiline
                        textAlignVertical="top"
                        value={text}
                        onChangeText={setText}
                    />
                </ScrollView>
            </View>
            <TouchableOpacity
                style={styles.iconButton}
                onPress={handleSpeak}
            >
                <Image
                    source={require('../assets/buttonspeak.png')}
                    style={styles.buttonIcon}
                />
                <Image
                    source={require('../assets/SPEAKERICON.png')}
                    style={styles.overlayIcon}
                />
            </TouchableOpacity>
            <Image
                source={require('../assets/interpr.png')}
                style={styles.image}
            />
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
        bottom: 40,
    },
    subtitle: {
        fontSize: 20,
        color: 'grey',
        marginBottom: 20,
        bottom: 20,
        right: 0,
    },
    textBox: {
        borderWidth: 2,
        borderColor: '#DE6969',
        backgroundColor: '#FFDADA',
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 40,
        marginBottom: 20,
        width: '90%',
        maxHeight: 200,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    resultText: {
        fontSize: 20,
        color: 'black',
        padding: 10,
        textAlign: 'center',
    },
    iconButton: {
        marginBottom: 20,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        top: 150,
    },
    buttonIcon: {
        width: 70,
        height: 70,
    },
    overlayIcon: {
        width: 40,
        height: 40,
        position: 'absolute',
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 0,
        top: 150,
    },
});

export default UseVoice;
