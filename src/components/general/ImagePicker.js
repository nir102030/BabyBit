import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as expoImagePicker from 'expo-image-picker';

export default function ImagePicker({ img, setImg }) {
	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await expoImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		let result = await expoImagePicker.launchImageLibraryAsync({
			mediaTypes: expoImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			//base64: true,
		});

		if (!result.cancelled) {
			//const userImg = `data:image/jpeg;base64,${result.base64}`;
			//setImg(userImg);
		}
	};

	return (
		<View style={styles.container}>
			<Button title="בחר תמונת פרופיל" onPress={pickImage} buttonStyle={styles.button} />
			{img && <Image source={{ uri: img }} style={styles.image} />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginBottom: 30,
		flexDirection: 'row',
	},
	button: {
		color: '#4ca1ad',
		borderRadius: 10,
		marginHorizontal: 20,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 100,
	},
});
