import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_BASE_URL } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from '@react-navigation/native';

const ProfileScreen = ({ navigation, setIsLoggedIn }) => {
    const [profileImage, setProfileImage] = useState(require('../assets/usericon.png'));
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());
    const [country, setCountry] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [userProfileNotFound, setUserProfileNotFound] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const getUserEmailAndFetchProfile = async () => {
            const savedEmail = await AsyncStorage.getItem('email');
            if (savedEmail) {
                setUserEmail(savedEmail);
                try {
                    const response = await fetch(
                        `${API_BASE_URL}/user/get-profile/${encodeURIComponent(savedEmail)}`
                    );
                    if (response.ok) {
                        const profile = await response.json();
                        setName(profile.name);
                        setDate(new Date(profile.date_of_birth));
                        setCountry(profile.country);
                    } else {
                        const errorData = await response.json();
                        if (response.status === 404 && errorData.detail === "User profile not found") {
                            setUserProfileNotFound(true);
                        } else {
                            Alert.alert("Error", "1 - Failed to load profile data.");
                        }
                    }
                } catch (error) {
                    Alert.alert("Error", "2 - Failed to load profile data.");
                }
            }
        };

        getUserEmailAndFetchProfile();
    }, []);

    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permission Required", "Permission to access camera roll is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!pickerResult.cancelled) {
            setProfileImage({ uri: pickerResult.uri });
        }
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(currentDate);
        }
    };

    const formatDateToString = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleSaveProfile = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: userEmail,
                    name: name,
                    date_of_birth: formatDateToString(date),
                    country: country,
                }),
            });

            if (response.ok) {
                Alert.alert('Profile updated successfully!');
            } else {
                const data = await response.json();
                Alert.alert('Error updating profile:', data.detail || 'Unknown error');
            }
        } catch (error) {
            Alert.alert('An error occurred. Please try again later.');
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('email');
        setIsLoggedIn(false);
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            })
        );
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
            <Text style={styles.title}>Profile Page</Text>
            {userProfileNotFound && (
                <Text style={styles.errorText}>User profile not found. Please enter your details above.</Text>
            )}
            <Text style={styles.nameLabel}>Name:</Text>
            <TextInput
                style={styles.nameInput}
                onChangeText={setName}
                value={name}
                placeholder="Enter your name"
                placeholderTextColor="#666"
            />
            <Text style={styles.dateLabel}>Date:</Text>
            <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
            >
                <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                    maximumDate={new Date(2300, 12, 31)}
                    minimumDate={new Date(1900, 1, 1)}
                />
            )}
            <Text style={styles.countryLabel}>Country/Region:</Text>
            <TextInput
                style={styles.countryInput}
                onChangeText={setCountry}
                value={country}
                placeholder="Enter your country"
                placeholderTextColor="#666"
            />
            <View style={styles.userIconContainer}>
                <Image
                    source={profileImage}
                    style={styles.userIcon}
                />
                <TouchableOpacity
                    style={styles.photoButton}
                    onPress={handlePickImage}
                >
                    <Image
                        source={require('../assets/camera.png')}
                        style={styles.addPhotoIcon}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveProfile}
            >
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 16,
        margin: 10,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffecf2',
        alignItems: 'center',
        justifyContent: 'center',
    } ,
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
        marginBottom: 650,
    },
    nameLabel: {
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 540,
        left: 70,
    },
    nameInput: {
        height: 40,
        width: 250,
        borderWidth: 0,
        padding: 10,
        backgroundColor: '#F9D4D4',
        color: 'black',
        fontSize: 18,
        position: 'absolute',
        bottom: 490,
        left: 80,
        borderRadius: 5,
    },
    dateLabel: {
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 440,
        left: 70,
    },
    dateInput: {
        height: 40,
        width: 250,
        padding: 10,
        backgroundColor: '#F9D4D4',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 390,
        left: 80,
        borderRadius: 5,
    },
    dateText: {
        color: 'black',
        fontSize: 18,
    },
    countryLabel: {
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 340,
        left: 70,
    },
    countryInput: {
        height: 40,
        width: 250,
        borderWidth: 0,
        padding: 10,
        backgroundColor: '#F9D4D4',
        color: 'black',
        fontSize: 18,
        position: 'absolute',
        bottom: 290,
        left: 80,
        borderRadius: 5,
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
    userIconContainer: {
        position: 'absolute',
        bottom: 600,
        left: '50%',
        transform: [{ translateX: -60 }],
    },
    userIcon: {
        width: 120,
        height: 120,
    },
    photoButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        padding: 5,
    },
    addPhotoIcon: {
        width: 30,
        height: 30,
    },
    saveButton: {
        height: 50,
        width: 150,
        backgroundColor: '#DE6969',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        position: 'absolute',
        bottom: 200,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutButton: {
        height: 50,
        width: 150,
        backgroundColor: '#DE6969',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        position: 'absolute',
        bottom: 130,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
