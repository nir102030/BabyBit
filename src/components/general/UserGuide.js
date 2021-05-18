import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import CustomModal from './CustomModal';
import { FontAwesome } from '@expo/vector-icons';
import { styles as appStyles } from '../../styles/styles';
import { Dimensions } from 'react-native';

const UserGuide = ({ userType, userGuideVisible, setUserGuideVisible }) => {
	return (
		<CustomModal isModalVisible={userGuideVisible}>
			<View style={styles.container}>
				<Text style={styles.title}>ברוכים הבאים!</Text>
				<View style={styles.textContainer}>
					<Text> - לחץ על </Text>
					<FontAwesome name="calendar-plus-o" size={20} color="rgba(250,100,100,0.8)" />
					<Text> להוספת משמרת חדשה</Text>
				</View>
				{userType == 'parent' ? (
					<View style={[styles.textContainer, { marginTop: 10 }]}>
						<Text> - לחץ על </Text>
						<View style={styles.updateIcon}>
							<Text style={styles.updateText}>עדכן</Text>
						</View>
						<Text> לתיעוד תשלום שבוצע</Text>
					</View>
				) : null}
				<Text style={styles.note1}>* שימו לב, באפליקציה זו לא ניתן לבצע תשלומים, אלא רק לתעד אותם</Text>
				<Text style={styles.note2}>** תיעוד התשלום יכול להתבצע רק ע"י ההורה</Text>
				<Button
					title="הבנתי, בוא נתחיל!"
					onPress={() => setUserGuideVisible(false)}
					buttonStyle={[appStyles.button, { marginTop: 20 }]}
				/>
			</View>
		</CustomModal>
	);
};

export default UserGuide;

const styles = StyleSheet.create({
	container: {
		margin: 10,
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
	},
	textContainer: {
		flexDirection: 'row-reverse',
		marginTop: 10,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	updateIcon: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,1)',
		padding: 5,
		height: 40,
		width: 40,
		borderRadius: 40,
		borderWidth: 1,
	},
	updateText: {
		color: 'rgba(0,100,0,0.5)',
		fontWeight: 'bold',
		fontSize: 12 / Dimensions.get('window').fontScale,
	},
	note1: {
		alignSelf: 'flex-end',
		marginTop: 10,
	},
	note2: {
		alignSelf: 'flex-end',
	},
});
