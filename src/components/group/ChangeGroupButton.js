import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ChangeGroupButton = ({ onPress }) => {
	return (
		<Card containerStyle={styles.container}>
			<TouchableOpacity onPress={onPress} style={styles.view}>
				<MaterialCommunityIcons name="exit-to-app" size={26} color="rgb(200,50,50)" style={styles.icon} />
				<Text style={styles.text}>החלפת קבוצה</Text>
			</TouchableOpacity>
		</Card>
	);
};

export default ChangeGroupButton;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 0,
	},
	view: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
	},
	icon: {
		marginRight: 10,
	},
	text: {
		fontSize: 16,
		marginRight: 20,
		color: 'rgba(200,50,50,0.8)',
	},
});
