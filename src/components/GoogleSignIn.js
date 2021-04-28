import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';
import * as Google from 'expo-google-app-auth';

const GoogleSignIn = ({ handleSignin }) => {
	const googleConfig = {
		androidClientId: '525239721755-n2t92e65qolbetvqc0sngt8occn5p19i.apps.googleusercontent.com',
		androidStandaloneAppClientId: '525239721755-nsddhp6fpshtemf6bfnn9fkd7v0mtopr.apps.googleusercontent.com',
	};

	const signIn = async () => {
		const { type, user } = await Google.logInAsync(googleConfig);
		if (type === 'success') {
			handleSignin(user.email, user.id);
		}
	};

	return (
		<TouchableOpacity onPress={signIn} style={styles.container}>
			<Image source={require('../assets/google-icon.png')} style={styles.img} />
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
		padding: 20,
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
		width: Dimensions.get('window').width * 0.7,
	},
	img: {
		height: 35,
		width: 35,
		marginRight: 20,
		borderRadius: 35,
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
	},
});
