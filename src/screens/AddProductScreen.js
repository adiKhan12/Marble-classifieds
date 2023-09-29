//AddProductScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// image picker
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

const AddProductScreen = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [marbleType, setMarbleType] = useState('');
    const [category, setCategory] = useState(''); // default to Marbles
    const [pricePerFoot, setPricePerFoot] = useState('');
    const [showSubCategory, setShowSubCategory] = useState(false);
    const [imageResponse, setImageResponse] = useState(null);

    const selectImage = () => {
        //ReactImageView: Image source "null" doesn't exist after i slect image
        launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
          }, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              setImageResponse(response);
            }
          });          
    };

    const handleAddProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('pricePerFoot', pricePerFoot);
            // WARN  ReactImageView: Image source "null" doesn't exist
            if (imageResponse?.assets?.[0]?.uri) {
                formData.append('productImage', {
                  uri: imageResponse.assets[0].uri,
                  name: 'product.jpg',
                  type: 'image/jpeg',
                });
              }
                     

            const userToken = await AsyncStorage.getItem('userToken');

            const response = await axios.post('http://10.0.2.2:3000/product', formData, {
                headers: {
                    Authorization: userToken,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data) {
                Alert.alert('Product Added', 'You have added a new product!');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />

            <Picker
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => {
                    setCategory(itemValue);
                    setShowSubCategory(true);
                }}>
                <Picker.Item label="Select a category" value="" />
                <Picker.Item label="Marbles" value="Marbles" />
                <Picker.Item label="Granites" value="Granites" />
            </Picker>

            {showSubCategory && (category === "Marbles" ? (
                <Picker
                    selectedValue={marbleType}
                    onValueChange={setMarbleType}>
                    <Picker.Item label="Ziarat white" value="Ziarat white" />
                    <Picker.Item label="Ziarat white gray" value="Ziarat white gray" />
                    <Picker.Item label="Ziarat gray" value="Ziarat gray" />
                    <Picker.Item label="Badil" value="Badil" />
                    <Picker.Item label="Chetha white" value="Chetha white" />
                    <Picker.Item label="Silky" value="Silky" />
                    <Picker.Item label="Jet black" value="Jet black" />
                    <Picker.Item label="Sunny gray" value="Sunny gray" />
                    <Picker.Item label="Sunny white" value="Sunny white" />
                    <Picker.Item label="Red and white" value="Red and white" />
                    <Picker.Item label="Strawberry" value="Strawberry" />
                </Picker>
            ) : (
                <Picker
                    selectedValue={marbleType}
                    onValueChange={setMarbleType}>
                    <Picker.Item label="Black granite" value="Black granite" />
                    <Picker.Item label="Trapical gray" value="Trapical gray" />
                    <Picker.Item label="Indus gold" value="Indus gold" />
                    <Picker.Item label="Imperial white" value="Imperial white" />
                    <Picker.Item label="Golden Jibrana" value="Golden Jibrana" />
                    <Picker.Item label="Black jibrana" value="Black jibrana" />
                    <Picker.Item label="Sado pink" value="Sado pink" />
                    <Picker.Item label="Sado gray" value="Sado gray" />
                </Picker>
        ))}

        <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
        <TextInput placeholder="Price Per Foot" value={pricePerFoot} onChangeText={setPricePerFoot} keyboardType="numeric" style={styles.input} />

        <Button title="Select Image" onPress={selectImage} />

        {imageResponse?.assets?.[0]?.uri && (
            <Image source={{ uri: imageResponse.assets[0].uri }} style={styles.image} />
        )}

        <View style={styles.buttonContainer}>
            <Button title="Add Product" onPress={handleAddProduct} />
        </View>
    </View>

    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f2f2f2',
    },
    input: {
      padding: 10,
      backgroundColor: '#fff',
      marginBottom: 10,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 2,
    },
    buttonContainer: {
      marginVertical: 10,
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 5,
      marginVertical: 10,
      alignSelf: 'center',
    },
  });


export default AddProductScreen;
