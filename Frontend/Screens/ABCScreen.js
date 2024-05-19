import React from 'react';
import {SafeAreaView, StyleSheet, Text, Image, ScrollView, View, TouchableOpacity} from 'react-native';

const images = [
    require('../assets/ImageA.png'),
    require('../assets/ImageB.png'),
    require('../assets/ImageC.png'),
    require('../assets/ImageD.png'),
    require('../assets/ImageE.png'),
    require('../assets/ImageF.png'),
    require('../assets/ImageG.png'),
    require('../assets/ImageH.png'),
    require('../assets/ImageI.png'),
    require('../assets/ImageJ.png'),
    require('../assets/ImageK.png'),
    require('../assets/ImageL.png'),
    require('../assets/ImageM.png'),
    require('../assets/ImageN.png'),
    require('../assets/ImageO.png'),
    require('../assets/ImageP.png'),
    require('../assets/ImageQ.png'),
    require('../assets/ImageR.png'),
    require('../assets/ImageS (2).png'),
    require('../assets/ImageT.png'),
    require('../assets/ImageU.png'),
    require('../assets/ImageV.png'),
    require('../assets/ImageW.png'),
    require('../assets/ImageX.png'),
    require('../assets/ImageY.png'),
    require('../assets/ImageZ.png')
];

const ABCScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('LearningCourseScreen')} // Navigate back to LearningCourseScreen
            >
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.header}>
                <Image
                    source={require('../assets/circles.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Let's learn the ABC!</Text>
                <Text style={styles.subtitle}>
                    With practice you will get to know the ASL alphabet!
                </Text>
            </View>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                {Array.from({ length: 9 }, (_, i) => (
                    <View style={styles.imageRow} key={i}>
                        {images.slice(i * 3, i * 3 + 3).map((img, index) => (
                            <Image key={index} source={img} style={styles.rowImage} />
                        ))}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffecf2',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 80,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    logo: {
        width: 260,
        height: 250,
        position: 'absolute',
        bottom: 60,
        left: -50,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    scrollView: {
        width: '100%',
        marginTop: 250,
        paddingHorizontal: 30,
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    rowImage: {
        width: 100,
        height: 100,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#DE6969',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        zIndex: 2,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ABCScreen;
