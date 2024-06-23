import 'react-native-get-random-values';
import { Audio } from 'expo-av';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { SPEECH_KEY, SPEECH_REGION } from './constants';
import { Buffer } from 'buffer';

// This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
const speechConfig = sdk.SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
speechConfig.speechSynthesisVoiceName = "en-US-AvaNeural"; // Set the desired voice

const synthesizeSpeech = async (text) => {
    return new Promise((resolve, reject) => {
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

        synthesizer.speakTextAsync(
            text,
            async (result) => {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    console.log("Synthesis finished.");
                    const audioData = result.audioData;
                    const sound = new Audio.Sound();

                    try {
                        const base64String = Buffer.from(audioData).toString('base64');
                        await sound.loadAsync({ uri: `data:audio/wav;base64,${base64String}` });
                        await sound.playAsync();
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    console.error("Speech synthesis canceled: " + result.errorDetails);
                    reject(new Error(result.errorDetails));
                }
                synthesizer.close();
            },
            (error) => {
                console.error("Error during synthesis: " + error);
                synthesizer.close();
                reject(error);
            }
        );
    });
};

// Export the function
export { synthesizeSpeech };
