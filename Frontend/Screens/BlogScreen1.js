import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const BlogScreen1 = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/circles.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>How do deaf people communicate?</Text>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                <Text style={styles.bodyText}>
                    American Sign Language (ASL) is a complete, natural language that has the same
                    linguistic properties as spoken languages, with grammar that differs from English.
                    ASL is expressed by movements of the hands and face. It is the primary language
                    of many North Americans who are deaf and hard of hearing, and is used by many hearing people as
                    well.
                </Text>
                <Image
                    source={require('../assets/images/topic3.jpg')}
                    style={styles.blogImage}
                    resizeMode="contain"
                />
                <Text style={styles.bodyText}>
                    One of the most remarkable things about ASL is its use of space and facial expressions
                    to convey meaning. This allows for a rich tapestry of expression that is not often found
                    in spoken languages.
                </Text>
                <Image
                    source={require('../assets/images/topic4.jpg')}
                    style={styles.blogImage}
                    resizeMode="contain"
                />
                <Text style={styles.bodyText}>
                    The community of deaf and hard of hearing individuals is diverse and vibrant.
                    With the advent of technology, communication for ASL users has become more accessible.
                    Video calls and messaging apps have transformed the way ASL users connect with others.
                </Text>
                <Image
                    source={require('../assets/images/topic5.jpg')}
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
        position: 'absolute',
        bottom: 500,
        left: -50,
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

export default BlogScreen1;
