import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import * as Google from 'expo-google-app-auth';

const GoogleSignUp = ({ signup, userType, navigation }) => {
	const googleConfig = {
		androidClientId: '525239721755-n2t92e65qolbetvqc0sngt8occn5p19i.apps.googleusercontent.com',
		androidStandaloneAppClientId: '525239721755-nsddhp6fpshtemf6bfnn9fkd7v0mtopr.apps.googleusercontent.com',
	};

	const signUpWithGoogle = async () => {
		const { type, user } = await Google.logInAsync(googleConfig);
		if (type === 'success') {
			signup(user.email, user.id, user.name, userType, user.photoUrl);
			navigation.navigate('Login');
		}
	};

	return (
		<TouchableOpacity onPress={signUpWithGoogle} style={styles.container}>
			<Image source={require('../assets/google-icon.png')} style={styles.img} />
			<Text style={styles.text}>הרשם עם גוגל</Text>
		</TouchableOpacity>
	);
};

export default GoogleSignUp;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'white',
		borderRadius: 10,
		margin: 20,
		padding: 10,
		alignItems: 'center',
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
		height: 25,
		width: 25,
		borderRadius: 25,
		marginRight: 20,
	},
	text: {
		fontSize: 20,
	},
});
