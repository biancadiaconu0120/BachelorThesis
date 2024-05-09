// import React, { useState } from 'react';
// import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Alert, TextInput, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
//
// const ProfileScreen = ({ navigation }) => {
//     const [profileImage, setProfileImage] = useState(require('../assets/usericon.png'));
//     const [name, setName] = useState("");
//     const [date, setDate] = useState(new Date());
//     const [country, setCountry] = useState("");
//     const [showDatePicker, setShowDatePicker] = useState(false);
//
//     const handlePickImage = async () => {
//         const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (!permissionResult.granted) {
//             Alert.alert("Permission Required", "Permission to access camera roll is required!");
//             return;
//         }
//
//         const pickerResult = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [1, 1],
//             quality: 1,
//         });
//
//         if (!pickerResult.cancelled) {
//             setProfileImage({ uri: pickerResult.uri });
//         }
//     };
//
//     const onChangeDate = (event, selectedDate) => {
//         const currentDate = selectedDate || date;
//         setShowDatePicker(false); // This will hide the DatePicker
//         if (selectedDate) { // Ensures that the date is set only if the picker has not been cancelled.
//             setDate(currentDate);
//         }
//     };
//
//     const onSaveChanges = () => {
//         Alert.alert("Changes Saved", "Your profile changes have been saved successfully.");
//     };
//
//     return (
//         <SafeAreaView style={styles.container}>
//             <TouchableOpacity
//                 style={styles.backButton}
//                 onPress={() => navigation.goBack()}
//             >
//                 <Text style={styles.buttonText}>Back</Text>
//             </TouchableOpacity>
//             <Image
//                 source={require('../assets/circles.png')}
//                 style={styles.logo}
//             />
//             <Text style={styles.title}>Profile Page</Text>
//             <Text style={styles.nameLabel}>Name:</Text>
//             <TextInput
//                 style={styles.nameInput}
//                 onChangeText={setName}
//                 value={name}
//                 placeholder="Enter your name"
//                 placeholderTextColor="#666"
//             />
//             <Text style={styles.dateLabel}>Date:</Text>
//             <TouchableOpacity
//                 style={styles.dateInput}
//                 onPress={() => setShowDatePicker(true)}
//             >
//                 <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
//             </TouchableOpacity>
//             {showDatePicker && (
//                 <DateTimePicker
//                     value={date}
//                     mode="date"
//                     display="default"
//                     onChange={onChangeDate}
//                     maximumDate={new Date(2300, 12, 31)}
//                     minimumDate={new Date(1900, 1, 1)}
//                 />
//             )}
//             <Text style={styles.countryLabel}>Country/Region:</Text>
//             <TextInput
//                 style={styles.countryInput}
//                 onChangeText={setCountry}
//                 value={country}
//                 placeholder="Enter your country"
//                 placeholderTextColor="#666"
//             />
//             <View style={styles.userIconContainer}>
//                 <Image
//                     source={profileImage}
//                     style={styles.userIcon}
//                 />
//                 <TouchableOpacity
//                     style={styles.photoButton}
//                     onPress={handlePickImage}
//                 >
//                     <Image
//                         source={require('../assets/camera.png')}
//                         style={styles.addPhotoIcon}
//                     />
//                 </TouchableOpacity>
//             </View>
//             <TouchableOpacity
//                 style={styles.saveButton}
//                 onPress={onSaveChanges}
//             >
//                 <Text style={styles.saveButtonText}>Save Changes</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffecf2',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     logo: {
//         width: 260,
//         height: 250,
//         position: 'absolute',
//         bottom: 730,
//         left: -50,
//     },
//     title: {
//         fontSize: 35,
//         fontWeight: 'bold',
//         color: 'black',
//         marginTop: 15,
//         marginBottom: 650,
//     },
//     nameLabel: {
//         fontSize: 22,
//         color: 'black',
//         fontWeight: 'bold',
//         position: 'absolute',
//         bottom: 540,
//         left: 70,
//     },
//     nameInput: {
//         height: 40,
//         width: 250,
//         borderWidth: 0,
//         padding: 10,
//         backgroundColor: '#F9D4D4',
//         color: 'black',
//         fontSize: 18,
//         position: 'absolute',
//         bottom: 490,
//         left: 80,
//         borderRadius: 5,
//     },
//     dateLabel: {
//         fontSize: 22,
//         color: 'black',
//         fontWeight: 'bold',
//         position: 'absolute',
//         bottom: 440,
//         left: 70,
//     },
//     dateInput: {
//         height: 40,
//         width: 250,
//         padding: 10,
//         backgroundColor: '#F9D4D4',
//         justifyContent: 'center',
//         position: 'absolute',
//         bottom: 390,
//         left: 80,
//         borderRadius: 5,
//     },
//     dateText: {
//         color: 'black',
//         fontSize: 18,
//     },
//     countryLabel: {
//         fontSize: 22,
//         color: 'black',
//         fontWeight: 'bold',
//         position: 'absolute',
//         bottom: 340,
//         left: 70,
//     },
//     countryInput: {
//         height: 40,
//         width: 250,
//         borderWidth: 0,
//         padding: 10,
//         backgroundColor: '#F9D4D4',
//         color: 'black',
//         fontSize: 18,
//         position: 'absolute',
//         bottom: 290,
//         left: 80,
//         borderRadius: 5,
//     },
//     backButton: {
//         position: 'absolute',
//         top: 20,
//         right: 20,
//         backgroundColor: '#DE6969',
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//         borderRadius: 20,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     userIconContainer: {
//         position: 'absolute',
//         bottom: 600,
//         left: '50%',
//         transform: [{ translateX: -60 }],
//     },
//     userIcon: {
//         width: 120,
//         height: 120,
//     },
//     photoButton: {
//         position: 'absolute',
//         right: 0,
//         bottom: 0,
//         padding: 5,
//     },
//     addPhotoIcon: {
//         width: 30,
//         height: 30,
//     },
//     saveButton: {
//         height: 50,
//         width: 150,
//         backgroundColor: '#DE6969',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 25,
//         position: 'absolute',
//         bottom: 200,
//     },
//     saveButtonText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });
//
// export default ProfileScreen;
