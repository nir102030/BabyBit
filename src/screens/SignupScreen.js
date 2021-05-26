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
	const { state, signup, clearError } = useContext(AuthContext);
	const [showPass, setShowPass] = useState(false);
	const [passValidation, setPassValidation] = useState({ value: '', valid: true });
	const [showPassValidation, setShowPassValidation] = useState(false);
	const [userTypeModalVisible, setUserTypeModalVisible] = useState(true);
	const [loading, setLoading] = useState(false);
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
		setLoading(false);
		if (token) {
			Alert.alert('', 'ההרשמה בוצעה בהצלחה!', [{ text: 'אוקי' }]);
			navigation.navigate('Login');
		}
	};

	const handleGoogleSignup = async (userName, password, name, img) => {
		setLoading(true);
		const token = await signup({ ...user, userName: userName, password: password, name: name, image: img });
		setLoading(false);
		if (token) {
			Alert.alert('', 'ההרשמה בוצעה בהצלחה!', [{ text: 'אוקי' }]);
			navigation.navigate('Login');
		}
	};

	const handleError = () => {
		Alert.alert('', state.err, [{ text: 'הבנתי', onPress: clearError() }]);
	};

	const handleUserEdit = (key, value) => {
		setUser({ ...user, [key]: value });
		if (key == 'password') setPassValidation({ ...passValidation, valid: passValidation.value == value });
	};

	const handleRepeatedPasswordChange = (value) => {
		setPassValidation({ value: value, valid: value == user.password });
	};

	return loading ? (
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
								<Entypo name={showPass ? 'eye-with-line' : 'eye'} size={24} color="rgba(0,0,0,0.5)" />
							</TouchableOpacity>
						</View>
						<View style={styles.passwordInputContainer}>
							<TextInput
								placeholder="הזן סיסמא שנית"
								value={passValidation.value}
								onChangeText={handleRepeatedPasswordChange}
								secureTextEntry={!showPassValidation}
								style={[appStyles.input, styles.input]}
							/>
							<TouchableOpacity
								onPress={() => setShowPassValidation(!showPassValidation)}
								style={styles.showPassIcon}
							>
								<Entypo
									name={showPassValidation ? 'eye-with-line' : 'eye'}
									size={24}
									color="rgba(0,0,0,0.5)"
								/>
							</TouchableOpacity>
						</View>
						{!passValidation.valid && user.password && passValidation.value ? (
							<Text style={styles.passValidationErr}>הסיסמא לא תואמת לסיסמא הראשונית שהזנת</Text>
						) : null}
						<TextInput
							placeholder="מה שמך?"
							value={user.name}
							onChangeText={(value) => handleUserEdit('name', value)}
							style={[appStyles.input, styles.input]}
						/>
					</View>
					{user.userName && user.password && user.name && passValidation.value && passValidation.valid ? (
						<Button
							title="הרשם"
							onPress={() => handleSignup()}
							buttonStyle={[appStyles.button, { marginTop: 10 }]}
						/>
					) : null}
					<TouchableOpacity
						onPress={() =>
							Linking.openURL(
								`mailto:nir102030@gmail.com?subject=פניה חדשה בנוגע לתהליך הרישום לאפליקציה &body=הוספ/י את תוכן הפניה...`
							)
						}
						style={styles.problemTextContainer}
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
		flex: 1,
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
	passValidationErr: {
		color: 'rgba(200,0,0,0.7)',
	},
	problemTextContainer: {
		marginTop: 20,
	},
	problemText: {
		marginTop: 15,
		fontSize: 16,
		textDecorationLine: 'underline',
		color: 'rgba(0,0,0,0.5)',
	},
});
