// SellerHomeScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SellerHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Seller!</Text>
      <Button 
        title="View Products Catalogue" 
        onPress={() => navigation.navigate('ProductsScreen')}
      />
      <Button 
        title="Add New Product" 
        onPress={() => navigation.navigate('AddProductScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7'
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  }
});

export default SellerHomeScreen;
