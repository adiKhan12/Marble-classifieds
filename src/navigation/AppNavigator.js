// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SellerHomeScreen from '../screens/SellerHomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import AddProductScreen from '../screens/AddProductScreen';
import EditProductScreen from '../screens/EditProductScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen 
                name="SellerHome" 
                component={SellerHomeScreen} 
                options={{ title: 'Seller Dashboard' }}
            />
            <Stack.Screen 
                name="ProductsScreen" 
                component={ProductsScreen} 
                options={{ title: 'Products Catalogue' }}
            />
            <Stack.Screen 
                name="AddProductScreen" 
                component={AddProductScreen} 
                options={{ title: 'Add New Product' }}
            />
            <Stack.Screen 
                name="EditProductScreen" 
                component={EditProductScreen} 
                options={{ title: 'Edit Product' }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
