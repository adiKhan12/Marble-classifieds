// SellerHomeScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SellerHomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Seller!</Text>
        <View style={styles.buttonContainer}>
          <Button 
            title="View Products Catalogue" 
            onPress={() => navigation.navigate('ProductsScreen')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            title="Add New Product" 
            onPress={() => navigation.navigate('AddProductScreen')}
          />
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f7f7f7',
      padding: 16,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
    },
    buttonContainer: {
      width: '80%',
      marginVertical: 10,
    }
  });

export default SellerHomeScreen;
