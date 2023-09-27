import React from 'react';
import { View, Text, Button, StyleSheet, TextInput  } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

// Yup is used to validate the form 
//formik is used to handle the form
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

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seller Login</Text>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values) => console.log(values)}
            >
                {({ handleSubmit }) => (
                    <>
                        <Field name="email" placeholder="Email" component={CustomInput} />
                        <Field 
                            name="password" 
                            placeholder="Password" 
                            secureTextEntry 
                            component={CustomInput} 
                        />
                        <Button title="Login" onPress={handleSubmit} />
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
