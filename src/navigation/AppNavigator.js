import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SellerHomeScreen from '../screens/SellerHomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import AddProductScreen from '../screens/AddProductScreen';
import EditProductScreen from '../screens/EditProductScreen';
import Logout from '../screens/LogoutScreen';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const SellerTabNavigator = () => {
    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'home';

                    if (route.name === 'SellerHome') {
                        iconName = 'home';
                    } else if (route.name === 'ProductsScreen') {
                        iconName = 'product-hunt';
                    } else if (route.name === 'AddProductScreen') {
                        iconName = 'plus-square';
                    }

                    // Return the icon component
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: [
                    {
                        display: 'flex'
                    },
                    null
                ]
            })}
        >
            <BottomTab.Screen 
                name="SellerHome" 
                component={SellerHomeScreen} 
                options={{ title: 'Home' }} 
            />
            <BottomTab.Screen 
                name="ProductsScreen" 
                component={ProductsScreen} 
                options={{ title: 'Manage Products' }}
            />
            <BottomTab.Screen 
                name="AddProductScreen" 
                component={AddProductScreen} 
                options={{ title: 'Add Product' }} 
            />
        </BottomTab.Navigator>
    );
};



const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen 
                name="SellerDashboard" 
                component={SellerTabNavigator} 
                options={({ navigation }) => ({ 
                    headerShown: true,
                    title: 'Seller Dashboard',
                    headerRight: () => <Logout navigation={navigation} />,
                    headerLeft: () => null
                })} 
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
