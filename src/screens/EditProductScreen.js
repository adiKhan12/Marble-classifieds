import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

const EditProductScreen = ({ route, navigation }) => {
    const [name, setName] = useState(route.params.name);
    const [description, setDescription] = useState(route.params.description);
    const [marbleType, setMarbleType] = useState(route.params.marbleType || ''); // Extracted from route params
    const [category, setCategory] = useState(route.params.category || ''); // Extracted from route params
    const [pricePerFoot, setPricePerFoot] = useState(route.params.pricePerFoot.toString());
    const [imageResponse, setImageResponse] = useState(null);
    const productId = route.params.id;
    const [showSubCategory, setShowSubCategory] = useState(category === 'Marbles' || category === 'Granites');

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

    const handleEdit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('pricePerFoot', pricePerFoot);

            if (imageResponse?.assets?.[0]?.uri) {
                formData.append('productImage', {
                  uri: imageResponse.assets[0].uri,
                  name: 'product.jpg',
                  type: 'image/jpeg',
                });
            }

            const userToken = await AsyncStorage.getItem('userToken');

            const response = await axios.put(`http://10.0.2.2:3000/product/${productId}`, formData, {
                headers: {
                    Authorization: userToken,
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert.alert('Success', 'Product updated successfully!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to update product.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input} />

            <Picker
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => {
                    setCategory(itemValue);
                    setShowSubCategory(itemValue === 'Marbles' || itemValue === 'Granites');
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


            <TextInput value={description} onChangeText={setDescription} placeholder="Description" style={styles.input} />
            <TextInput value={pricePerFoot} onChangeText={setPricePerFoot} placeholder="Price Per Foot" keyboardType="number-pad" style={styles.input} />
            <Button title="Select Image" onPress={selectImage} />
            {imageResponse?.assets && imageResponse.assets.map(({uri}, index) => (
                <Image key={index} source={{ uri }} style={{ width: 100, height: 100 }} />
            ))}
            <Button title="Update Product" onPress={handleEdit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
});

export default EditProductScreen;
