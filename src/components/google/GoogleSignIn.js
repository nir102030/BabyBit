import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { googleConfig } from './config';

const GoogleSignIn = ({ handleSignin }) => {
	const signIn = async () => {
		const { type, user } = await Google.logInAsync(googleConfig);
		if (type === 'success') {
			handleSignin(user.email, user.id);
		}
	};

	return (
		<TouchableOpacity onPress={signIn} style={styles.container}>
			<Image source={require('../../assets/google-icon.png')} style={styles.img} />
			<Text style={styles.text}>כנס עם גוגל</Text>
		</TouchableOpacity>
	);
};

export default GoogleSignIn;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'white',
		borderRadius: 10,
		margin: 20,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	img: {
		height: 35,
		width: 35,
		borderRadius: 35,
		marginRight: 20,
	},
	text: {
		fontSize: 22,
		fontWeight: 'bold',
	},
});
