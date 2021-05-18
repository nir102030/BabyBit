import React, { useState, useContext } from 'react';
import { Dimensions } from 'react-native';
import { View, StyleSheet, Text, TouchableOpacity, Alert, TextInput, Linking } from 'react-native';
import { Button } from 'react-native-elements';
import GoogleSignIn from '../components/google/GoogleSignIn';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as GroupContext } from '../context/GroupContext';
import { styles as appStyles } from '../styles/styles';
import { Entypo } from '@expo/vector-icons';
import Loader from '../components/general/Loader';
import BabyIcon from '../assets/BabyIcon';
import { ScrollView } from 'react-native-gesture-handler';

const LoginScreen = ({ navigation }) => {
	const { state, signin, clearError, setLoading } = useContext(AuthContext);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [showPass, setShowPass] = useState(false);

	const groupContext = useContext(GroupContext);
	const { getGroup } = groupContext;

	const handleSignin = async () => {
		setLoading(true);
		const user = await signin(userName, password);
		if (user) getGroup(user.groupId);
	};

	const handleGoogleSignin = async (userName, password) => {
		setLoading(true);
		const user = await signin(userName, password);
		if (user) getGroup(user.groupId);
	};

	const handleError = () => {
		Alert.alert('', state.err, [{ text: 'הבנתי', onPress: clearError() }]);
	};

	return state.loading ? (
		<Loader />
	) : (
		<View style={styles.container}>
			<BabyIcon style={styles.babyIcon} />
			<ScrollView contentContainerStyle={styles.scrollView}>
				{state.err ? handleError(clearError) : null}
				<GoogleSignIn handleSignin={handleGoogleSignin} />
				<Text style={styles.orText}>או</Text>
				<View style={styles.emailSigninContainer}>
					<TextInput
						placeholder="הכנס שם משתמש"
						value={userName}
						onChangeText={setUserName}
						style={[appStyles.input, styles.input]}
					/>
					<View style={styles.passwordInputContainer}>
						<TextInput
							placeholder="הכנס סיסמא"
							value={password}
							onChangeText={setPassword}
							secureTextEntry={!showPass}
							style={[appStyles.input, styles.input]}
						/>
						<TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.showPassIcon}>
							<Entypo name={showPass ? 'eye-with-line' : 'eye'} size={24} color="black" />
						</TouchableOpacity>
					</View>
					<Button
						title="כנס לחשבון"
						onPress={() => handleSignin()}
						buttonStyle={appStyles.button}
						containerStyle={{ marginTop: 10 }}
					/>
				</View>
				<Button
					title="לא רשום עדיין? עבור להרשמה"
					onPress={() => {
						clearError();
						navigation.navigate('Signup');
					}}
					buttonStyle={[appStyles.button, { marginTop: Dimensions.get('window').height * 0.35 }]}
				/>
				<TouchableOpacity
					onPress={() =>
						Linking.openURL(
							`mailto:nir102030@gmail.com?subject=פניה חדשה בנוגע לתהליך הכניסה לאפליקציה &body=הוספ/י את תוכן הפניה...`
						)
					}
				>
					<Text style={styles.problemText}>נתקלת בבעיה? צור קשר ונעזור לך</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		alignItems: 'center',
	},
	babyIcon: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 0.2,
		backgroundColor: 'rgba(200,0,0,0.1)',
	},
	emailSigninContainer: {
		alignItems: 'center',
	},
	input: {
		textAlign: 'center',
		marginVertical: 10,
		backgroundColor: 'rgba(200,0,0,0.1)',
		borderRadius: 10,
		padding: 5,
		fontSize: 22,
		color: 'rgba(0,0,0,0.7)',
	},
	orText: {
		fontSize: 26,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	passwordInputContainer: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
	},
	showPassIcon: {
		position: 'absolute',
		right: 5,
	},
	problemText: {
		marginTop: 10,
		fontSize: 16,
	},
});
