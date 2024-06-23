import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const BlogScreen2 = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/circles.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>A day in the life of a deaf person</Text>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                <Text style={styles.bodyText}>
                    Life as a deaf person can be challenging but is also filled with unique experiences and communities.
                    From waking up in the morning to the end of the day, technology and specialized tools play a vital role
                    in navigating the hearing world.
                </Text>
                <Image
                    source={require('../assets/images/topic6.jpg')}
                    style={styles.blogImage}
                    resizeMode="contain"
                />
                <Text style={styles.bodyText}>
                    Mornings often start with the aid of a vibrating alarm clock. Visual alerts replace traditional auditory cues
                    for doorbells or phone calls. Each tool helps bridge the communication gap that exists in a primarily hearing society.
                </Text>
                <Image
                    source={require('../assets/images/topic7.jpg')}
                    style={styles.blogImage}
                    resizeMode="contain"
                />
                <Text style={styles.bodyText}>
                    Throughout the day, interactions might include using sign language interpreters or speech-to-text applications
                    for clearer communication. In a world designed for the hearing, the deaf community fosters a sense of identity
                    and belonging through these shared experiences.
                </Text>
                <Image
                    source={require('../assets/images/topic8.jpg')}
                    style={styles.blogImage}
                    resizeMode="contain"
                />
                {/* ... additional content */}
            </ScrollView>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffecf2',
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingTop: 5,
        alignItems: 'center',
    },
    logo: {
        width: 260,
        height: 250,
        bottom: 30,
        marginLeft: -50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        paddingHorizontal: 20,
        textAlign: 'center',
        bottom: 100,
    },
    bodyText: {
        fontSize: 18,
        color: 'black',
        marginBottom: 20,
        alignSelf: 'stretch',
        paddingHorizontal: 20,
    },
    blogImage: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#DE6969',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BlogScreen2;
