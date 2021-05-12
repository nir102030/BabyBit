import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

const AddPaymentButton = ({ setIsPaymentOpened }) => {
	return (
		<TouchableOpacity onPress={() => setIsPaymentOpened(true)} style={styles.container}>
			<MaterialIcons name="payment" size={20} color="rgba(0,100,0,0.5)" style={styles.icon} />
			<Text style={styles.text}>עדכן</Text>
		</TouchableOpacity>
	);
};

export default AddPaymentButton;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,0.9)',
		padding: 5,
		borderRadius: 10,
		position: 'absolute',
		left: 10,
		borderWidth: 0,
		flexDirection: 'row-reverse',
		zIndex: 1,
	},
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
	},
});
