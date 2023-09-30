// LoginScreen.js
import React from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
import { Formik, Field } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import axios from 'axios';
// If you're planning on using AsyncStorage for token storage, also import it:
// import AsyncStorage from '@react-native-async-storage/async-storage';
const logo = require('../assets/logo.png'); // Adjust the path accordingly


const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const CustomInput = ({ field, form, ...props }) => (
    <View style={{ marginBottom: 10 }}>
        <TextInput
            style={styles.input}
            onChangeText={form.handleChange(field.name)}
            onBlur={form.handleBlur(field.name)}
            {...props}
        />
        {form.touched[field.name] && form.errors[field.name] && (
            <Text style={styles.errorText}>{form.errors[field.name]}</Text>
        )}
    </View>
);


const handleLogin = async (values, { setSubmitting, setErrors }, navigation) => {
    try {
        const response = await axios.post('http://10.0.2.2:3000/login', values);

        if (response.data.token) {
            // Here, you can store the token and navigate the user to the main app:
            AsyncStorage.setItem('userToken', response.data.token);
            // Store User ID in AsyncStorage
            AsyncStorage.setItem('userId', JSON.stringify(response.data.userId));
            // await AsyncStorage.setItem('@userToken', response.data.token);
            // navigation.navigate('MainAppScreen'); 
            navigation.navigate('SellerDashboard');
        } else {
            setErrors({ email: 'Invalid credentials', password: 'Invalid credentials' });
        }
    } catch (error) {
        Alert.alert('Login Error', 'An error occurred during login. Please try again.');
    } finally {
        setSubmitting(false);
    }
};

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Logo Placeholder */}
            <View style={styles.logoContainer}>
                <View style={styles.logo}>
                    <Image source={logo} style={styles.logoImage} resizeMode="contain" />
                </View>
            </View>

            <Text style={styles.title}>Welcome To Granites & Marbles</Text>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values, formikBag) => handleLogin(values, formikBag, navigation)}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <>
                        <Field name="email" placeholder="Email" component={CustomInput} />
                        <Field
                            name="password"
                            placeholder="Password"
                            secureTextEntry
                            component={CustomInput}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                            >
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Added Register Message */}
                        <Text style={styles.registerText}>
                            No account? Please register. {' '}
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={{ color: '#2A2A2A', fontWeight: 'bold' }}>Register</Text>
                            </TouchableOpacity>
                        </Text>
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#FAFAFA',
    },
    title: {
        fontSize: 32, // Slightly Larger
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333333',
    },
    input: {
        height: 54,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#DDDDDD',
        borderWidth: 1.2,
        marginBottom: 15,
        paddingLeft: 18,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    errorText: {
        color: '#FF5252', // A more alerting shade of red
        fontSize: 13, // A tiny bit larger
        marginBottom: 8,
    },
    buttonContainer: {
        flexDirection: 'row', // added to center the buttons
        justifyContent: 'center', // added to center the buttons
    },
    button: {
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        width: '48%', // added width to make the buttons touch each other
        marginLeft: '2%', // added margin to separate the buttons
    },
    buttonText: {
        color: 'white',
        fontSize: 18, // Larger text for buttons
        fontWeight: 'bold',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 60, // More spacing
    },
    logo: {
        width: 160, // Slightly larger
        height: 160,
        backgroundColor: '#DDDDDD',
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    logoImage: {
        maxWidth: '100%',
        height: 'auto',
        aspectRatio: 1.5,
    },
    registerText: {
        marginTop: 25, // More spacing
        textAlign: 'center',
        color: '#888888', // A more muted tone
        fontSize: 16, // A bit larger for readability
    },
});

export default LoginScreen;