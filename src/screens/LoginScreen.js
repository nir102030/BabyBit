import React, { useState, useContext } from 'react';
import { Dimensions } from 'react-native';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import GoogleSignIn from '../components/GoogleSignIn';
import { Context as AuthContext } from '../context/AuthContext';
import { styles as appStyles } from '../styles/styles';
import { Entypo } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
	const { state, signin, clearError, setLoading } = useContext(AuthContext);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [showPass, setShowPass] = useState(false);

	const handleSignin = async () => {
		setLoading(true);
		signin(userName, password);
	};

	const handleGoogleSignin = async (userName, password) => {
		setLoading(true);
		signin(userName, password);
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
			{state.err ? handleError(clearError) : null}
			<View style={styles.googleSigninContainer}>
				<GoogleSignIn handleSignin={handleGoogleSignin} />
			</View>
			<Text style={styles.orText}>או</Text>
			<View style={styles.emailSigninContainer}>
				<Input
					placeholder="הכנס שם משתמש"
					value={userName}
					onChangeText={(value) => setUserName(value)}
					style={appStyles.input}
				/>
				<Input
					placeholder="הכנס סיסמא"
					value={password}
					onChangeText={(value) => setPassword(value)}
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
				<Button title="כנס לחשבון" onPress={() => handleSignin()} containerStyle={appStyles.button} />
			</View>
			<View style={styles.buttonsContainer}>
				<Button
					title="לא רשום עדיין? עבור להרשמה"
					onPress={() => {
						clearError();
						navigation.navigate('Signup');
					}}
					containerStyle={appStyles.button}
				/>
			</View>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	emailSigninContainer: {
		alignItems: 'center',
		position: 'absolute',
		top: Dimensions.get('window').height * 0.25,
	},
	googleSigninContainer: {
		alignItems: 'center',
		position: 'absolute',
		top: Dimensions.get('window').height * 0.02,
	},
	orText: {
		fontSize: 26,
		fontWeight: 'bold',
		position: 'absolute',
		top: Dimensions.get('window').height * 0.17,
	},
	buttonsContainer: {
		position: 'absolute',
		top: Dimensions.get('window').height * 0.8,
	},
});
