import React, { useState, useContext } from 'react';
import {
	View,
	StyleSheet,
	Text,
	Dimensions,
	Image,
	TouchableOpacity,
	Alert,
	TextInput,
	ScrollView,
	Linking,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { styles as appStyles } from '../styles/styles';
import alternateProfilePic from '../assets/alternateProfilePic.webp';
import GoogleSignUp from '../components/google/GoogleSignUp';
import { Entypo } from '@expo/vector-icons';
import Loader from '../components/general/Loader';
import BabyIcon from '../assets/BabyIcon';
import ChooseUserTypeModal from '../components/general/ChooseUserTypeModal';

const SignupScreen = ({ navigation }) => {
	const { state, signup, clearError, setLoading } = useContext(AuthContext);
	const [showPass, setShowPass] = useState(false);
	const [userTypeModalVisible, setUserTypeModalVisible] = useState(true);
	const [user, setUser] = useState({
		userName: '',
		password: '',
		name: '',
		type: 'parent',
		image: Image.resolveAssetSource(alternateProfilePic).uri,
		groupId: null,
		expoPushToken: null,
		notificationsEnabled: true,
		new: true,
	});

	const handleSignup = async () => {
		setLoading(true);
		const token = await signup(user);
		if (token) {
			navigation.navigate('Login');
		}
	};

	const handleGoogleSignup = async (userName, password, name, img) => {
		setLoading(true);
		const token = await signup({ ...user, userName: userName, password: password, name: name, image: img });
		if (token) {
			navigation.navigate('Login');
		}
	};

	const handleError = () => {
		Alert.alert('', state.err, [{ text: 'הבנתי', onPress: clearError() }]);
	};

	const handleUserEdit = (key, value) => {
		setUser({ ...user, [key]: value });
	};

	return state.loading ? (
		<Loader />
	) : (
		<View style={styles.container}>
			<BabyIcon style={styles.babyIcon} />
			{userTypeModalVisible ? (
				<ChooseUserTypeModal
					visible={userTypeModalVisible}
					setVisible={setUserTypeModalVisible}
					userType={user.type}
					setUserType={(value) => handleUserEdit('type', value)}
				/>
			) : (
				<ScrollView contentContainerStyle={styles.scrollView}>
					{state.err ? handleError() : null}

					<GoogleSignUp handleSignup={handleGoogleSignup} navigation={navigation} />
					<Text style={styles.orText}>או</Text>
					<View style={styles.inputsContainer}>
						<TextInput
							placeholder="בחר שם משתמש"
							value={user.userName}
							onChangeText={(value) => handleUserEdit('userName', value)}
							style={[appStyles.input, styles.input]}
						/>
						<View style={styles.passwordInputContainer}>
							<TextInput
								placeholder="בחר סיסמא"
								value={user.password}
								onChangeText={(value) => handleUserEdit('password', value)}
								secureTextEntry={!showPass}
								style={[appStyles.input, styles.input]}
							/>
							<TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.showPassIcon}>
								<Entypo name={showPass ? 'eye-with-line' : 'eye'} size={24} color="black" />
							</TouchableOpacity>
						</View>
						<TextInput
							placeholder="מה שמך?"
							value={user.name}
							onChangeText={(value) => handleUserEdit('name', value)}
							style={[appStyles.input, styles.input]}
						/>
					</View>
					<Button
						title="הרשם"
						onPress={() => handleSignup()}
						buttonStyle={[appStyles.button, { marginTop: 10 }]}
					/>
					<Button
						title="כבר רשום? כנס לחשבון"
						onPress={() => navigation.navigate('Login')}
						buttonStyle={[appStyles.button, { marginTop: Dimensions.get('window').height * 0.15 }]}
					/>
					<TouchableOpacity
						onPress={() =>
							Linking.openURL(
								`mailto:nir102030@gmail.com?subject=פניה חדשה בנוגע לתהליך הרישום לאפליקציה &body=הוספ/י את תוכן הפניה...`
							)
						}
					>
						<Text style={styles.problemText}>נתקלת בבעיה? צור קשר ונעזור לך</Text>
					</TouchableOpacity>
				</ScrollView>
			)}
		</View>
	);
};

export default SignupScreen;

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
	pickerContainer: {
		width: Dimensions.get('window').width * 0.7,
		borderWidth: 1,
		borderColor: 'rgba(0, 0, 0, 0.2)',
		borderRadius: 3,
		padding: 5,
		marginTop: 20,
		borderRadius: 10,
	},
	text: {
		fontSize: 18,
		color: 'rgba(0, 0, 0, 0.7)',
		fontWeight: 'bold',
	},
	orText: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	inputsContainer: {
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
	passwordInputContainer: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
	},
	showPassIcon: {
		position: 'absolute',
		right: 5,
	},
	problemText: {
		marginTop: 15,
		fontSize: 16,
	},
});
