//ProductsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProductsScreen = ({navigation}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:3000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                         <Image source={{ uri: `http://10.0.2.2:3000/${item.imageUrl}` }} style={{ width: 150, height: 150 }} />
                        <Text>{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Text>${item.pricePerFoot} per foot</Text>
                        <Button 
                            title="Edit" 
                            onPress={() => navigation.navigate('EditProductScreen', item)}
                        />
                        <Button 
                            title="Delete" 
                            onPress={async () => {
                                try {
                                    // get the user token
                                    const userToken = await AsyncStorage.getItem('userToken');

                                    // send a DELETE request to the server
                                    await axios.delete(`http://10.0.2.2:3000/product/${item.id}`, {
                                        headers: {
                                            Authorization: userToken,
                                        },
                                    });

                                    // Reload or remove the deleted item from the list
                                    setProducts(prevProducts => prevProducts.filter(p => p.id !== item.id));
                                } catch (error) {
                                    Alert.alert('Error', 'Failed to delete product.');
                                }
                            }} 
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f2f2f2',
    },
    productContainer: {
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default ProductsScreen;
