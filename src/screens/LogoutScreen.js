// Logout.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({ navigation }) => {
    const handleLogout = async () => {
        // Remove the token or other session details from AsyncStorage
        await AsyncStorage.removeItem('userToken');
        // Navigate the user to the Login screen or any other initial screen
        navigation.navigate('Login');
    };

    return (
        <TouchableOpacity onPress={handleLogout}>
            <Icon name="power-off" size={25} color="red" style={{ marginRight: 15 }} />
        </TouchableOpacity>
    );
};

export default Logout;
