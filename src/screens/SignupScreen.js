import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Text, Dimensions, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { Context as AuthContext } from '../context/AuthContext';
import { styles as appStyles } from '../styles/styles';
import ImagePicker from '../components/ImagePicker';
import alternateProfilePic from '../assets/alternateProfilePic.webp';

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
			clearError();
			navigation.navigate('Login');
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.inputsContainer}>
				<TextInput
					placeholder="בחר שם משתמש"
					value={userName}
					onChangeText={(value) => setUserName(value)}
					style={appStyles.input}
				/>
				<TextInput
					placeholder="בחר סיסמא"
					value={password}
					onChangeText={(value) => setPassword(value)}
					style={appStyles.input}
				/>
				<TextInput
					placeholder="שם"
					value={name}
					onChangeText={(value) => setName(value)}
					style={appStyles.input}
				/>
				<View style={styles.pickerContainer}>
					<Text style={styles.text}>בחר סוג משתמש</Text>
					<Picker selectedValue={type} onValueChange={setType} style={appStyles.picker}>
						<Picker.Item label="הורה" value="parent" color="rgba(0, 0, 0, 0.6)" />
						<Picker.Item label="מטפל/ת" value="caregiver" color="rgba(0, 0, 0, 0.6)" />
					</Picker>
				</View>
				<View style={{ marginTop: 20 }}>
					<ImagePicker setUserImage={setImg} />
				</View>
			</View>

			<View style={styles.buttonsContainer}>
				{state.err ? (
					<Text style={[appStyles.error, { marginBottom: 20, fontSize: 20 }]}>{state.err}</Text>
				) : null}
				<Button title="הרשם" onPress={() => handleSignup()} containerStyle={appStyles.button} />
				<Button
					title="כבר רשום? כנס לחשבון"
					onPress={() => navigation.navigate('Login')}
					containerStyle={appStyles.button}
				/>
			</View>
		</ScrollView>
	);
};

export default SignupScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	inputsContainer: {
		flex: 8,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 20,
	},

	buttonsContainer: {
		flex: 2,
		justifyContent: 'flex-start',
		position: 'absolute',
		bottom: 20,
	},
	pickerContainer: {
		width: Dimensions.get('window').width * 0.7,
		borderWidth: 1,
		borderColor: 'rgba(0, 0, 0, 0.2)',
		borderRadius: 3,
		padding: 5,
		margin: 10,
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
