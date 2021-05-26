import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { googleConfig } from './config';

const GoogleSignUp = ({ handleSignup, navigation }) => {
	const signUpWithGoogle = async () => {
		const { type, user } = await Google.logInAsync(googleConfig);
		if (type === 'success') {
			handleSignup(user.email, user.id, user.name, user.photoUrl);
		}
	};

	return (
		<TouchableOpacity onPress={signUpWithGoogle} style={styles.container}>
			<Image source={require('../../assets/google-icon.png')} style={styles.img} />
			<Text style={styles.text}>הרשמה עם גוגל</Text>
		</TouchableOpacity>
	);
};

export default GoogleSignUp;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'white',
		width: Dimensions.get('window').width * 0.7,
		marginHorizontal: 5,
		marginVertical: 20,
		borderRadius: 10,
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 2,
	},
	img: {
		height: 25,
		width: 25,
		borderRadius: 25,
		marginRight: 10,
	},
	text: {
		fontSize: 20 / Dimensions.get('window').fontScale,
		fontWeight: 'bold',
	},
});
