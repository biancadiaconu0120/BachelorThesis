import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const InformationScreen = ({ navigation }) => {
    const topics = [
        { key: '1', title: 'How do deaf people communicate?', image: require('../assets/images/topic1.jpg'), screen: 'BlogScreen1' },
        { key: '2', title: 'A day in the life of a deaf person', image: require('../assets/images/topic2.jpg'), screen: 'BlogScreen2' }

    ];

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/circles.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>ASL Information</Text>
            <ScrollView style={styles.scrollView}>
                {topics.map(topic => (
                    <TouchableOpacity
                        key={topic.key}
                        style={styles.card}
                        onPress={() => navigation.navigate(topic.screen, { topicId: topic.key })}
                    >
                        <Image source={topic.image} style={styles.cardImage} resizeMode="contain" />
                        <Text style={styles.cardText}>{topic.title}</Text>
                    </TouchableOpacity>
                ))}
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
        width: '100%',
        marginTop: 100,
    },
    logo: {
        width: 260,
        height: 250,
        position: 'absolute',
        bottom: 750,
        left: -50,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 80,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
    },
    cardImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 10,
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

export default InformationScreen;
