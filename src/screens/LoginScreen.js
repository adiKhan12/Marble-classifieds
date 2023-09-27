import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// If you're planning on using AsyncStorage for token storage, also import it:
// import AsyncStorage from '@react-native-async-storage/async-storage';

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
            <Text style={{ color: 'red' }}>{form.errors[field.name]}</Text>
        )}
    </View>
);

const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
        const response = await axios.post('http://10.0.2.2:3000/login', values);

        if (response.data.token) {
            // Here, you can store the token and navigate the user to the main app:
            // await AsyncStorage.setItem('@userToken', response.data.token);
            // navigation.navigate('MainAppScreen'); 
            Alert.alert('Login Successful', 'You have logged in successfully!');
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
            <Text style={styles.title}>Seller Login</Text>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
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
                        <Button title="Login" onPress={handleSubmit} disabled={isSubmitting} />
                        <Button 
                            title="Register" 
                            onPress={() => navigation.navigate('Register')} 
                        />
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
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
});

export default LoginScreen;
