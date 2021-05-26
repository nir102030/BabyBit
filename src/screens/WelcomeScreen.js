import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BabyIcon from '../assets/BabyIcon';
import { Button } from 'react-native-elements';
import { styles as appStyles } from '../styles/styles';

const WelcomeScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<BabyIcon style={styles.babyIcon} />
			<Text style={styles.text}>BabyBit</Text>
			<View style={styles.buttonsContainer}>
				<Button title="כניסה" onPress={() => navigation.navigate('Login')} buttonStyle={appStyles.button} />
				<Button title="הרשמה" onPress={() => navigation.navigate('Signup')} buttonStyle={appStyles.button} />
			</View>
		</View>
	);
};

export default WelcomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	babyIcon: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 0.8,
		backgroundColor: 'rgba(200,0,0,0.1)',
	},
	text: {
		fontSize: 50 / Dimensions.get('window').fontScale,
		color: 'rgba(200,0,100,0.4)',
		fontWeight: 'bold',
		marginTop: 80,
		textShadowColor: 'rgba(0,0,0,0.2)',
		textShadowOffset: {
			width: 1.5,
			height: 1.5,
		},
		textShadowRadius: 10,
	},
	buttonsContainer: {
		marginBottom: 30,
	},
});
