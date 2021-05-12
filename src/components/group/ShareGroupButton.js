import React from 'react';
import { View, Share, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

const ShareGroupButton = ({ user, group }) => {
	const share = async () => {
		try {
			await Share.share({
				message: `היי! הוזמנת על ידי ${user.name} להצטרף לקבוצת ${group.name} באפליקציית BabyBit. כל שנותר לך הוא להוריד את האפליקציה מחנות האפליקציות ולמלא את קוד הקבוצה: ${group.id}.\nלינק להורדת האפליקציה: https://play.google.com/store/apps/details?id=com.nirkatz.babybit`,
			});
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<View style={styles.shareButtonContainer}>
			<Button
				title="הזמן חברים"
				onPress={() => share()}
				buttonStyle={styles.shareButton}
				titleStyle={styles.buttonTitle}
				icon={() => <Entypo name="share" size={24} color="black" style={styles.shareIcon} />}
			/>
		</View>
	);
};

export default ShareGroupButton;

const styles = StyleSheet.create({
	shareButtonContainer: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
	},
	shareButton: {
		backgroundColor: null,
		borderColor: 'rgba(0,0,0,0.2)',
		color: 'black',
		//flexDirection: 'row-reverse',
	},
	buttonTitle: {
		color: 'rgba(0,0,0,0.6)',
		fontWeight: 'bold',
	},
	shareIcon: {
		marginRight: 7,
		color: 'rgba(0,0,0,0.6)',
	},
});
