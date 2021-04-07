import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { Context as AuthContext } from '../context/AuthContext';
import { styles as appStyles } from '../styles/styles';

const SignupScreen = ({ navigation }) => {
	const { state, signup, clearError } = useContext(AuthContext);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [type, setType] = useState();

	const handleSignup = async () => {
		const token = await signup(userName, password, name);
		if (token) {
			clearError();
			navigation.navigate('Login');
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputsContainer}>
				<TextInput
					placeholder="Insert User Name"
					value={userName}
					onChangeText={(value) => setUserName(value)}
					style={appStyles.input}
				/>
				<TextInput
					placeholder="Insert Password"
					value={password}
					onChangeText={(value) => setPassword(value)}
					style={appStyles.input}
				/>
				<TextInput
					placeholder="Insert Name"
					value={name}
					onChangeText={(value) => setName(value)}
					style={appStyles.input}
				/>
				<Picker selectedValue={type} onValueChange={setType}>
					<Picker.Item label="הורה" value="parent" />
					<Picker.Item label="מטפלת" value="caregiver" />
				</Picker>
			</View>

			{state.err ? <Text style={appStyles.error}>{state.err}</Text> : null}
			<View style={styles.buttonsContainer}>
				<Button title="Signup" onPress={() => handleSignup()} containerStyle={appStyles.button} />
				<Button
					title="Already registed?"
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
