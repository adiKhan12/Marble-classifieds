//RegisterScreen.js
import React from 'react';
import axios from 'axios';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

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

const RegisterScreen = () => {
    return (
        <View style={styles.container}>
            {/* Logo Placeholder */}
            <View style={styles.logoContainer}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>LOGO</Text>
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
                        <Button title="Register" onPress={handleSubmit} disabled={isSubmitting} />
                        {/* Added Login Message */}
                        <Text style={styles.loginText}>
                            Already have an account? Login.
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
        backgroundColor: '#FAFAFA', // Light grayish-white for the background
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
    button: {
        backgroundColor: '#2A2A2A', // Dark Gray for primary actions
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        elevation: 3, // Shadow for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2, // Shadow for iOS
        shadowRadius: 2,
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
        width: 150,
        height: 150,
        backgroundColor: '#DDDDDD',
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: '#2A2A2A',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
