import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

const AddPaymentButton = ({ setIsPaymentOpened }) => {
	return (
		<TouchableOpacity onPress={() => setIsPaymentOpened(true)} style={styles.container}>
			{/* <MaterialIcons name="payment" size={20} color="rgba(0,100,0,0.5)" style={styles.icon} /> */}
			<Text style={styles.text}>עדכן</Text>
		</TouchableOpacity>
	);
};

export default AddPaymentButton;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'absolute',
		left: 10,
		zIndex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,1)',
		padding: 5,
		height: 45,
		width: 45,
		borderRadius: 45,
		borderWidth: 0,
	},
	card: {},
	icon: {
		alignItems: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		marginLeft: 1,
	},
	text: {
		color: 'rgba(0,100,0,0.5)',
		fontWeight: 'bold',
		fontSize: 14 / Dimensions.get('window').fontScale,
	},
});
