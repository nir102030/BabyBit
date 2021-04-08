import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { styles as appStyles } from '../styles/styles';

const LoginScreen = ({ navigation }) => {
	const { state, signin, clearError } = useContext(AuthContext);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const handleSignin = async () => {
		signin(userName, password);
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputsContainer}>
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
				/>
			</View>
			{state.err ? <Text style={appStyles.error}>{state.err}</Text> : null}
			<View style={styles.buttonsContainer}>
				<Button title="כנס לחשבון" onPress={() => handleSignin()} containerStyle={appStyles.button} />
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
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputsContainer: {
		flex: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonsContainer: {
		flex: 6,
		justifyContent: 'flex-start',
	},
});
