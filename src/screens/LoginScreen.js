import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { Formik, Field } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
            // await AsyncStorage.setItem('@userToken', response.data.token);
            // navigation.navigate('MainAppScreen'); 
            // hy chat gpt here i f i write alert login success then it works  i am also getting correct response from backend but if i wrote navigation like below then it is not working
            navigation.navigate('SellerHome');
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
                    <Text style={styles.logoText}>LOGO</Text>
                </View>
            </View>

            <Text style={styles.title}>Seller Login</Text>
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
                        <Button title="Login" onPress={handleSubmit} disabled={isSubmitting} />
                        <Button 
                            title="Register" 
                            onPress={() => navigation.navigate('Register')} 
                        />

                        {/* Added Register Message */}
                        <Text style={styles.registerText}>
                            No account? Please register.
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
        color: 'white',
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

    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logo: {
        width: 150,
        height: 150,
        backgroundColor: '#DDDDDD',  // This is just a placeholder, replace with your actual logo
        borderRadius: 75,  // Half of width and height to make it circular
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: '#2A2A2A',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#666666',
    },
});


export default LoginScreen;
