import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { Context as AuthContext } from '../context/AuthContext';
import { styles as appStyles } from '../styles/styles';
import ImagePicker from '../components/ImagePicker';
import alternateProfilePic from '../assets/alternateProfilePic.webp';
import GoogleSignUp from '../components/GoogleSignUp';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
	const { state, signup, clearError, setLoading } = useContext(AuthContext);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [type, setType] = useState('parent');
	const [img, setImg] = useState(null);
	const [showPass, setShowPass] = useState(false);

	const handleSignup = async () => {
		setLoading(true);
		const token = await signup(
			userName,
			password,
			name,
			type,
			img ? img : Image.resolveAssetSource(alternateProfilePic).uri,
			true
		);
		if (token) {
			navigation.navigate('Login');
		}
	};

	const handleGoogleSignup = async (userName, password, name, img) => {
		setLoading(true);
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
		Alert.alert('', state.err, [{ text: 'הבנתי', onPress: clearError() }]);
	};

	return state.loading ? (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<ActivityIndicator size="large" color="pink" />
		</View>
	) : (
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
				<GoogleSignUp handleSignup={handleGoogleSignup} navigation={navigation} />
			</View>
			<Text style={styles.orText}>או</Text>
			<View style={styles.inputsContainer}>
				<Input placeholder="בחר שם משתמש" value={userName} onChangeText={setUserName} style={appStyles.input} />
				<Input
					placeholder="בחר סיסמא"
					value={password}
					onChangeText={setPassword}
					style={appStyles.input}
					secureTextEntry={!showPass}
					leftIcon={() =>
						showPass ? (
							<TouchableOpacity onPress={() => setShowPass(!showPass)}>
								<Entypo name="eye-with-line" size={24} color="black" />
							</TouchableOpacity>
						) : (
							<TouchableOpacity onPress={() => setShowPass(!showPass)}>
								<Entypo name="eye" size={24} color="black" />
							</TouchableOpacity>
						)
					}
				/>
				<Input placeholder="מה שמך?" value={name} onChangeText={setName} style={appStyles.input} />
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
		top: Dimensions.get('window').height * 0.27,
	},
	inputsContainer: {
		alignItems: 'center',
		top: Dimensions.get('window').height * 0.35,
		position: 'absolute',
		width: Dimensions.get('window').width * 0.7,
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
