// import React, { useState } from 'react';
// import {
//     SafeAreaView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
//     ActivityIndicator,
// } from 'react-native';
// import Modal from 'react-native-modal';
// import { Ionicons } from '@expo/vector-icons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { API_BASE_URL } from '../constants';
//
// const ForgotPasswordScreen = ({ navigation }) => {
//     const [email, setEmail] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');
//     const [messageType, setMessageType] = useState('');
//     const [isModalVisible, setIsModalVisible] = useState(false);
//
//     const validateEmail = (email) => {
//         const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return re.test(String(email).toLowerCase());
//     };
//
//     const handleForgotPassword = async () => {
//         if (!email) {
//             setMessage("Please enter your email address.");
//             setMessageType('error');
//             setIsModalVisible(true);
//             return;
//         }
//
//         if (!validateEmail(email)) {
//             setMessage("Please enter a valid email address.");
//             setMessageType('error');
//             setIsModalVisible(true);
//             return;
//         }
//
//         setLoading(true);
//         setMessage('');
//         try {
//             const response = await fetch(`${API_BASE_URL}/user/forgot-password`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email }),
//             });
//
//             if (response.ok) {
//                 setMessage("Password reset instructions have been sent to your email.");
//                 setMessageType('success');
//                 setIsModalVisible(true);
//                 setTimeout(() => {
//                     setIsModalVisible(false);
//                     navigation.navigate('LoginScreen');
//                 }, 2000);
//             } else {
//                 const errorText = await response.text();
//                 setMessage("Failed to send password reset instructions. Please try again.");
//                 setMessageType('error');
//                 setIsModalVisible(true);
//             }
//         } catch (error) {
//             console.error("Forgot Password Error:", error);
//             setMessage("An error occurred. Please try again later.");
//             setMessageType('error');
//             setIsModalVisible(true);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const closeModal = () => {
//         setIsModalVisible(false);
//     };
//
//     return (
//         <SafeAreaView style={styles.container}>
//             <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
//                 <View style={styles.content}>
//                     <Text style={styles.title}>Forgot Password</Text>
//                     <View style={[styles.fieldRow, styles.emailFieldAdjustment]}>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Email"
//                             value={email}
//                             onChangeText={setEmail}
//                             keyboardType="email-address"
//                         />
//                     </View>
//
//                     {loading ? <ActivityIndicator size="large" color="#FC8585" /> : (
//                         <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
//                             <Text style={styles.buttonText}>Send Reset Instructions</Text>
//                         </TouchableOpacity>
//                     )}
//                 </View>
//             </KeyboardAwareScrollView>
//             <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
//                 <View style={[
//                     styles.modalContent,
//                     messageType === 'success' ? styles.successModal : styles.errorModal
//                 ]}>
//                     <Text style={styles.modalText}>{message}</Text>
//                     <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
//                         <Ionicons name="close" size={24} color="white" />
//                     </TouchableOpacity>
//                 </View>
//             </Modal>
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffecf2',
//     },
//     scrollView: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     content: {
//         width: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//         marginTop: 10,
//     },
//     title: {
//         fontSize: 40,
//         fontWeight: 'bold',
//         color: 'black',
//         marginBottom: 80,
//     },
//     fieldRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 30,
//         marginBottom: 10,
//         width: 300,
//         right: 9,
//     },
//     input: {
//         height: 48,
//         paddingLeft: 10,
//         fontSize: 16,
//         color: 'grey',
//         flex: 1,
//         backgroundColor: 'white',
//         borderRadius: 30,
//         borderWidth: 1,
//         borderColor: 'white',
//         overflow: 'hidden',
//     },
//     button: {
//         width: '80%',
//         height: 40,
//         backgroundColor: '#FC8585',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 20,
//         marginTop: 20,
//     },
//     buttonText: {
//         color: 'white',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     modalContent: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//         borderRadius: 10,
//         marginHorizontal: 20,
//     },
//     successModal: {
//         backgroundColor: 'green',
//     },
//     errorModal: {
//         backgroundColor: 'red',
//     },
//     modalText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     closeButton: {
//         position: 'absolute',
//         top: 10,
//         right: 10,
//     },
// });
//
// export default ForgotPasswordScreen;
