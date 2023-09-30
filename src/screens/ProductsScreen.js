import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet, Image, Alert, TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchProducts = async () => {
      try {
          const userIdString = await AsyncStorage.getItem('userId');
          const userId = JSON.parse(userIdString);
          setUserId(userId);
          const response = await axios.get(`http://10.0.2.2:3000/products?userId=${userId}`);
          setProducts(response.data);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
  };

  useEffect(() => {
      fetchProducts();
  }, []);

  useFocusEffect(
      React.useCallback(() => {
          fetchProducts();
          return () => {}; // cleanup, if necessary
      }, [])
  );

  return (
      <View style={styles.container}>
          <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.productContainer}>
                  <Image source={{ uri: `http://10.0.2.2:3000/${item.imageUrl}` }} style={styles.productImage} />
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productDescription}>{item.description}</Text>
                  <Text style={styles.productPrice}>${item.pricePerFoot}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => navigation.navigate('EditProductScreen', item)}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={async () => {
                        try {
                          const userToken = await AsyncStorage.getItem('userToken');
                          await axios.delete(`http://10.0.2.2:3000/product/${item.id}`, {
                            headers: {
                              Authorization: userToken,
                            },
                          });
                          setProducts(prevProducts => prevProducts.filter(p => p.id !== item.id));
                        } catch (error) {
                          Alert.alert('Error', 'Failed to delete product.');
                        }
                      }}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
          />
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    productContainer: {
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    productImage: {
        width: '100%',
        height: 200,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDescription: {
        color: '#666',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton: {
        backgroundColor: '#4CAF50', 
        padding: 10,
        flex: 1,
        marginRight: 5,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#F44336', 
        padding: 10,
        flex: 1,
        marginLeft: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ProductsScreen;
