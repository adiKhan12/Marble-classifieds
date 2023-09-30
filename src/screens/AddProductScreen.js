import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

const AddProductScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [marbleType, setMarbleType] = useState('');
  const [category, setCategory] = useState('');
  const [pricePerFoot, setPricePerFoot] = useState('');
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [imageResponse, setImageResponse] = useState(null);
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [marbleTypeError, setMarbleTypeError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [pricePerFootError, setPricePerFootError] = useState('');

  const selectImage = () => {
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
    // Check if all fields are filled out
    if (!name || !description || !marbleType || !category || !pricePerFoot || !imageResponse?.assets?.[0]?.uri) {
      return;
    }

    const userIdString  = await AsyncStorage.getItem('userId');
    const userId = JSON.parse(userIdString);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('pricePerFoot', pricePerFoot);
      formData.append('subCategory', marbleType);
      formData.append('userId', userId);
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

  const validateName = () => {
    if (!name) {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  const validateDescription = () => {
    if (!description) {
      setDescriptionError('Description is required');
    } else {
      setDescriptionError('');
    }
  };

  const validateMarbleType = () => {
    if (!marbleType) {
      setMarbleTypeError('Marble type is required');
    } else {
      setMarbleTypeError('');
    }
  };

  const validateCategory = () => {
    if (!category) {
      setCategoryError('Category is required');
    } else {
      setCategoryError('');
    }
  };

  const validatePricePerFoot = () => {
    if (!pricePerFoot) {
      setPricePerFootError('Price per foot is required');
    } else {
      setPricePerFootError('');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} onBlur={validateName} style={styles.input} />
      {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

      <Picker
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) => {
          setCategory(itemValue);
          setShowSubCategory(true);
          validateCategory();
        }}>
        <Picker.Item label="Select a category" value="" />
        <Picker.Item label="Marbles" value="Marbles" />
        <Picker.Item label="Granites" value="Granites" />
      </Picker>
      {categoryError ? <Text style={styles.error}>{categoryError}</Text> : null}

      {showSubCategory && (category === "Marbles" ? (
        <Picker
          selectedValue={marbleType}
          onValueChange={() => {
            setMarbleType(marbleType);
            validateMarbleType();
          }}>
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
          onValueChange={() => {
            setMarbleType(marbleType);
            validateMarbleType();
          }}>
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
      {marbleTypeError ? <Text style={styles.error}>{marbleTypeError}</Text> : null}

      <TextInput placeholder="Description" value={description} onChangeText={setDescription} onBlur={validateDescription} style={styles.input} />
      {descriptionError ? <Text style={styles.error}>{descriptionError}</Text> : null}

      <TextInput placeholder="Price Per Foot" value={pricePerFoot} onChangeText={setPricePerFoot} onBlur={validatePricePerFoot} keyboardType="numeric" style={styles.input} />
      {pricePerFootError ? <Text style={styles.error}>{pricePerFootError}</Text> : null}

      <TouchableOpacity style={styles.customButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      {imageResponse?.assets?.[0]?.uri && (
        <Image source={{ uri: imageResponse.assets[0].uri }} style={styles.image} />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.customButton, (!name || !description || !marbleType || !category || !pricePerFoot || !imageResponse?.assets?.[0]?.uri) ? styles.disabledButton : null]} onPress={handleAddProduct} disabled={!name || !description || !marbleType || !category || !pricePerFoot || !imageResponse?.assets?.[0]?.uri}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  contentContainer: {
    padding: 16,
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
  customButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#4E9CD3',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
});

export default AddProductScreen;