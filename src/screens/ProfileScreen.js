import React, { useContext, useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, Alert, Image, Switch } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { styles as appStyles } from '../styles/styles';

const ProfileScreen = () => {
	const { state, signout, editUser } = useContext(AuthContext);
	const toggleSwitch = () => editUser({ ...state.user, notificationsEnabled: !state.user.notificationsEnabled });

	const signoutAlert = () => {
		Alert.alert('היי', 'אתה בטוח שברצונך להתנתק?', [
			{ text: 'ביטול', style: 'cancel' },
			{ text: 'כן, התנתק מהפרופיל', onPress: () => signout() },
		]);
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image source={{ uri: state.user.image }} style={styles.image} />
				<Text style={styles.name}>{state.user.name}</Text>
			</View>
			<View style={styles.notifications}>
				<Text style={styles.notificationText}>הפעל התראות</Text>
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
				<Button title="התנתק" onPress={() => signoutAlert()} buttonStyle={appStyles.button} />
			</View>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
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
		top: Dimensions.get('window').height * 0.35,
	},
});
