import React, { useState, useContext } from 'react';
import { Dimensions } from 'react-native';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import GoogleSignIn from '../components/GoogleSignIn';
import { Context as AuthContext } from '../context/AuthContext';
import { styles as appStyles } from '../styles/styles';

const LoginScreen = ({ navigation }) => {
	const { state, signin, clearError } = useContext(AuthContext);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const handleSignin = async () => {
		signin(userName, password);
	};

	const handleError = () => {
		alert(state.err);
		clearError();
	};

	return (
		<View style={styles.container}>
			{state.err ? handleError() : null}
			<View style={styles.emailSigninContainer}>
				<TextInput
					placeholder="הכנס שם משתמש"
					value={userName}
					onChangeText={(value) => setUserName(value)}
					style={appStyles.input}
				/>
				<TextInput
					placeholder="הכנס סיסמא"
					value={password}
					onChangeText={(value) => setPassword(value)}
					style={appStyles.input}
					secureTextEntry={true}
				/>
				<Button title="כנס לחשבון" onPress={() => handleSignin()} containerStyle={appStyles.button} />
			</View>
			<Text style={styles.orText}>או</Text>
			<View style={styles.googleSigninContainer}>
				<GoogleSignIn signin={signin} />
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
		top: Dimensions.get('window').height * 0.02,
	},
	googleSigninContainer: {
		alignItems: 'center',
		position: 'absolute',
		top: Dimensions.get('window').height * 0.33,
	},
	orText: {
		fontSize: 26,
		fontWeight: 'bold',
		position: 'absolute',
		top: Dimensions.get('window').height * 0.28,
	},
	buttonsContainer: {
		position: 'absolute',
		top: Dimensions.get('window').height * 0.8,
	},
});
