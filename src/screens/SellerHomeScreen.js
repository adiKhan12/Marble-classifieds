// SellerHomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, RefreshControl } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const SellerHomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchProducts();
      return () => { };  // Cleanup, if necessary
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Seller!</Text>
      {products.length ? (
        <FlatList
          contentContainerStyle={styles.list}
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Image source={{ uri: `http://10.0.2.2:3000/${item.imageUrl}` }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription}>{item.category}</Text>
              <Text style={styles.productPrice}>${item.pricePerFoot}</Text>
            </View>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : (
        <Text style={styles.emptyText}>Your catalogue is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  list: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  productContainer: {
    width: '90%',
    minHeight: 250,  // Added a minimum height to ensure better spacing
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
    aspectRatio: 16 / 9,  // This ensures the image maintains a 16:9 ratio
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,  // Added margin for spacing
  },
  productDescription: {
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  emptyText: {
    fontSize: 20,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SellerHomeScreen;