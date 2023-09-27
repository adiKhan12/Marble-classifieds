import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

// Yup is used to validate the form. for example, we can set the minimum length of the password to 6 characters
//formik is used to handle the form
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

const RegisterScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seller Registration</Text>
            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={RegisterSchema}
                onSubmit={(values) => alert('Registered with values:', values)}
            >
                {({ handleSubmit }) => (
                    <>
                        <Field name="email" placeholder="Email" component={CustomInput} />
                        <Field name="password" placeholder="Password" secureTextEntry component={CustomInput} />
                        <Field name="confirmPassword" placeholder="Confirm Password" secureTextEntry component={CustomInput} />
                        <Button title="Register" onPress={handleSubmit} />
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

export default RegisterScreen;
