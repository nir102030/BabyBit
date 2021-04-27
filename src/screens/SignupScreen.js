import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Text, Dimensions, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { Context as AuthContext } from '../context/AuthContext';
import { styles as appStyles } from '../styles/styles';
import ImagePicker from '../components/ImagePicker';
import alternateProfilePic from '../assets/alternateProfilePic.webp';
import GoogleSignUp from '../components/GoogleSignUp';

const SignupScreen = ({ navigation }) => {
	const { state, signup, clearError } = useContext(AuthContext);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [type, setType] = useState('parent');
	const [img, setImg] = useState(null);

	const handleSignup = async () => {
		const token = await signup(
			userName,
			password,
			name,
			type,
			img ? img : Image.resolveAssetSource(alternateProfilePic).uri
		);
		if (token) {
			navigation.navigate('Login');
		}
	};

	const handleError = () => {
		alert(state.err);
		clearError();
	};

	return (
		<View style={styles.container}>
			{state.err ? handleError() : null}
			<View style={styles.pickerContainer}>
				<Text style={styles.text}>בחר סוג משתמש</Text>
				<Picker selectedValue={type} onValueChange={setType} style={appStyles.picker}>
					<Picker.Item label="הורה" value="parent" color="rgba(0, 0, 0, 0.6)" />
					<Picker.Item label="מטפל/ת" value="caregiver" color="rgba(0, 0, 0, 0.6)" />
				</Picker>
			</View>
			<View style={styles.googleSigninContainer}>
				<GoogleSignUp signup={signup} userType={type} navigation={navigation} />
			</View>
			<Text style={styles.orText}>או</Text>
			<View style={styles.inputsContainer}>
				<TextInput
					placeholder="בחר שם משתמש"
					value={userName}
					onChangeText={setUserName}
					style={appStyles.input}
				/>
				<TextInput
					placeholder="בחר סיסמא"
					value={password}
					onChangeText={setPassword}
					style={appStyles.input}
					secureTextEntry={true}
				/>
				<TextInput placeholder="מה שמך?" value={name} onChangeText={setName} style={appStyles.input} />
				{/* <View>
					<ImagePicker setUserImage={setImg} />
				</View> */}
			</View>
			<View style={styles.buttonsContainer}>
				<Button title="הרשם" onPress={() => handleSignup()} containerStyle={appStyles.button} />
				<Button
					title="כבר רשום? כנס לחשבון"
					onPress={() => navigation.navigate('Login')}
					containerStyle={appStyles.button}
				/>
			</View>
		</View>
	);
};

export default SignupScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	pickerContainer: {
		width: Dimensions.get('window').width * 0.7,
		borderWidth: 1,
		borderColor: 'rgba(0, 0, 0, 0.2)',
		borderRadius: 3,
		padding: 5,
		margin: 10,
		top: Dimensions.get('window').height * 0.02,
		position: 'absolute',
	},
	googleSigninContainer: {
		alignItems: 'center',
		position: 'absolute',
		top: Dimensions.get('window').height * 0.15,
	},
	orText: {
		fontSize: 24,
		fontWeight: 'bold',
		position: 'absolute',
		top: Dimensions.get('window').height * 0.25,
	},
	inputsContainer: {
		alignItems: 'center',
		top: Dimensions.get('window').height * 0.3,
		position: 'absolute',
	},
	buttonsContainer: {
		top: Dimensions.get('window').height * 0.75,
		position: 'absolute',
	},
	text: {
		fontSize: 18,
		color: 'rgba(0, 0, 0, 0.7)',
	},
	picker: {
		borderWidth: 1,
		color: 'rgba(0, 0, 0, 0.6)',
	},
});
