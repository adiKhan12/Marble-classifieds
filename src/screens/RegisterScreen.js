//RegisterScreen.js
import React from 'react';
import axios from 'axios';
import { View, Text, Button, StyleSheet, TextInput, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
const logo = require('../assets/logo.png'); // Adjust the path accordingly

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
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
            <Text style={{ color: 'red' }}>{form.errors[field.name]}</Text>
        )}
    </View>
);

const handleRegistration = async (values, { setSubmitting, setErrors }) => {
    try {
        const response = await axios.post('http://10.0.2.2:3000/register', {
            email: values.email,
            password: values.password
        });

        if (response.data.userId) {
            Alert.alert('Registration Successful', 'You have registered successfully!');
        } else {
            Alert.alert('Registration Error', 'An error occurred during registration.');
        }
    } catch (error) {
        setErrors({ email: 'Email already in use' });
    } finally {
        setSubmitting(false);
    }
};

const RegisterScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Logo Placeholder */}
            <View style={styles.logoContainer}>
                <View style={styles.logo}>
                    <Image source={logo} style={styles.logoImage} resizeMode="contain" />
                </View>
            </View>
            <Text style={styles.title}>Seller Registration</Text>
            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={RegisterSchema}
                onSubmit={handleRegistration}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <>
                        <Field name="email" placeholder="Email" component={CustomInput} />
                        <Field name="password" placeholder="Password" secureTextEntry component={CustomInput} />
                        <Field name="confirmPassword" placeholder="Confirm Password" secureTextEntry component={CustomInput} />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                            >
                                <Text style={styles.buttonText}>Register</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Added Login Message */}
                        <Text style={styles.loginText}>
                            Already have an account?{' '}
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{ color: '#2A2A2A', fontWeight: 'bold' }}>Login</Text>
                            </TouchableOpacity>
                        </Text>
                    </>
                )}
            </Formik>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333333', // Dark Gray for Titles
    },
    input: {
        height: 50, // Increased height for a bigger touch area
        backgroundColor: 'white',
        borderRadius: 8, // Rounded Corners
        borderColor: '#DDDDDD',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 15,
        elevation: 3, // Shadow for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, // Subtle shadow for iOS
        shadowRadius: 2,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 5,
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
        marginBottom: 15, // Added a little spacing below the button
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
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#666666',
    },
    // Logo styles (same as LoginScreen)
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
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
    logoText: {
        color: '#2A2A2A',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
