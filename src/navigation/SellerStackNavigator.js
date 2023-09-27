// SellerStackNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SellerHomeScreen from '../screens/SellerHomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import AddProductScreen from '../screens/AddProductScreen';

const Seller_Stack = createStackNavigator();

const SellerStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SellerHome">
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
    </Stack.Navigator>
  );
}

export default SellerStackNavigator;
