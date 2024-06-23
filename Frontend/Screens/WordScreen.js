import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Modal, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Video } from 'expo-av';

const categories = {
    'Simple Signs': ['Hello', 'Please', 'Bye'],
    'Animals': ['Dog', 'Cat', 'Bird'],
    'Colors': ['Red', 'Blue', 'Green'],
    'Food and Drinks': ['Apple', 'Bread', 'Water'],
    'Numbers': ['One', 'Two', 'Three'],
};

const videoSources = {
    'Hello': require('../assets/videos/24851.mp4'),
    'Please': require('../assets/videos/21530.mp4'),
    'Bye': require('../assets/videos/22741.mp4'),


};

const WordScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [videoModalVisible, setVideoModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedWord, setSelectedWord] = useState('');

    const handlePress = (category) => {
        setSelectedCategory(category);
        setModalVisible(true);
    };

    const openVideoModal = (word) => {
        setSelectedWord(word);
        setVideoModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <Image
                source={require('../assets/circles.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Learn ASL Terms!</Text>

            {Object.keys(categories).map((category, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.middleRectangle, { top: `${30 + 10 * index}%` }]}
                    onPress={() => handlePress(category)}
                >
                    <Text style={styles.rectangleText}>{category}</Text>
                </TouchableOpacity>
            ))}

            {/* First modal for category items */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{selectedCategory}</Text>
                        <FlatList
                            data={categories[selectedCategory]}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.listItem}>
                                    <Text style={styles.itemText}>{item}</Text>
                                    <TouchableOpacity onPress={() => openVideoModal(item)}>
                                        <AntDesign name="playcircleo" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Second modal for video */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={videoModalVisible}
                onRequestClose={() => {
                    setVideoModalVisible(!videoModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Video for {selectedWord}</Text>
                        <Video
                            source={videoSources[selectedWord]}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="contain"  // Ensures video fits within the component bounds
                            shouldPlay={true}
                            isLooping
                            style={styles.videoStyle}
                        />
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setVideoModalVisible(!videoModalVisible)}
                        >
                            <Text style={styles.textStyle}>Close Video</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
        bottom: 650,
        left: -50,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 15,
        marginBottom: 550,
        left:10,
    },
    middleRectangle: {
        width: 350,
        height: 80,
        backgroundColor: '#FFDADA',
        borderColor: 'white',
        borderWidth: 2,
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -175 }, { translateY: -40 }],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,

    },
    rectangleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        position:'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        maxHeight: '80%',

    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    itemText: {
        fontSize: 18,
        marginVertical: 4,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    videoPlaceholder: {
        width: 300,
        height: 200,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'left',
        borderRadius: 10,
        marginVertical: 20,
        right:50,
    },
    videoText: {
        color: 'black',
        fontSize: 16,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#DE6969',
        top:20,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    videoStyle: {
        width: '100%',
        height: 190,
        borderRadius: 10,
    },
});

export default WordScreen;
