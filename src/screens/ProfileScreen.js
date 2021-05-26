import { Link } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, Alert, Image, Switch, Linking, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as GroupContext } from '../context/GroupContext';
import { styles as appStyles } from '../styles/styles';

const ProfileScreen = () => {
	const { state, signout, editUser } = useContext(AuthContext);
	const groupContext = useContext(GroupContext);
	const group = groupContext.state.group;
	const { editGroup } = groupContext;
	const toggleSwitch = () => {
		const editedUser = { ...state.user, notificationsEnabled: !state.user.notificationsEnabled };
		editUser(editedUser);
		editGroup({
			...group,
			participants: group.participants.map((participant) =>
				participant.userName == state.user.userName ? editedUser : participant
			),
		});
	};

	const signoutAlert = () => {
		Alert.alert('', 'את/ה בטוח/ה שברצונך להתנתק?', [
			{ text: 'ביטול', style: 'cancel' },
			{ text: 'התנתק/י', onPress: () => signout() },
		]);
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image source={{ uri: state.user.image }} style={styles.image} />
				<Text style={styles.name}>{state.user.name}</Text>
			</View>
			<View style={styles.notifications}>
				<Text style={styles.notificationText}>הפעלת התראות</Text>
				<Switch
					trackColor={{ false: '#767577', true: '#81b0ff' }}
					thumbColor={state.user.notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={state.user.notificationsEnabled}
					style={styles.notificationsSwitch}
				/>
			</View>
			<View style={styles.signout}>
				<Button title="התנתקות מהפרופיל" onPress={() => signoutAlert()} buttonStyle={appStyles.button} />
			</View>
			<TouchableOpacity
				onPress={() =>
					Linking.openURL(
						`mailto:nir102030@gmail.com?subject=פניה חדשה עבור משתמש: ${state.user.userName}&body=הוספ/י את תוכן הפניה...`
					)
				}
			>
				<Text style={styles.problemText}>נתקלת בבעיה? צור קשר ונעזור לך</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	imageContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 0,
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 120,
		borderWidth: 3,
		borderColor: '#e8edeb',
		marginTop: 20,
	},
	name: {
		fontSize: 30,
		fontWeight: 'bold',
		marginTop: 10,
	},
	notifications: {
		flexDirection: 'row-reverse',
		marginTop: 20,
	},
	notificationText: {
		fontSize: 24,
		marginLeft: 20,
	},
	notificationsSwitch: {},
	signout: {
		marginTop: Dimensions.get('window').height * 0.1,
	},
	problemText: {
		marginTop: 15,
		fontSize: 16,
		textDecorationLine: 'underline',
		color: 'rgba(0,0,0,0.5)',
	},
});
