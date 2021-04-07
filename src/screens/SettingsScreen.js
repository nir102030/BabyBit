import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert, Linking, TextInput, Dimensions, Share } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as GroupContext } from '../context/GroupContext';
import { styles as appStyles } from '../styles/styles';
import SettingsDetail from '../components/SettingsDetail';

const SettingsScreen = () => {
	const { state, signout, editUser } = useContext(AuthContext);
	const groupContext = useContext(GroupContext);
	const groupState = groupContext.state;
	const { group, err } = groupState;
	const editGroup = groupContext.editGroup;
	const signoutAlert = () => {
		Alert.alert('היי', 'אתה בטוח שברצונך להתנתק?', [
			{ text: 'ביטול', style: 'cancel' },
			{ text: 'כן, התנתק מהפרופיל', onPress: () => signout() },
		]);
	};

	const share = async () => {
		try {
			const result = await Share.share({
				message: `היי! הוזמנת על ידי ${state.user.name} להצטרף לקבוצה באפליקציית בייבי-ביט. כל שנותר לך הוא להוריד את האפליקציה מחנות האפליקציות ולמלא את קוד הקבוצה: ${group.id}`,
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	};

	const changeGroupAlert = () => {
		Alert.alert('היי', 'אתה בטוח שברצונך להחליף קבוצה?', [
			{ text: 'ביטול', style: 'cancel' },
			{ text: 'כן, החלף קבוצה', onPress: () => editUser({ ...state.user, groupId: undefined }) },
		]);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}> היי {state.user.name} :)</Text>
			<SettingsDetail
				fieldName="שם הקבוצה"
				initialFieldValue={group.name}
				editGroup={(value) => editGroup({ ...group, name: value })}
			/>
			<SettingsDetail
				fieldName="תשלום שעתי"
				initialFieldValue={group.hourlyPayment}
				editGroup={(value) => editGroup({ ...group, hourlyPayment: value })}
			/>
			<View style={[styles.groupDetailView, { marginTop: 30 }]}>
				<Text style={styles.fieldName}>חברי הקבוצה:</Text>
				{group.participants.map((user) => {
					return <Text style={styles.fieldValue}>{user.name}</Text>;
				})}
			</View>
			<Button
				title="הזמן חברים לקבוצה"
				onPress={() => share()}
				buttonStyle={styles.shareButton}
				titleStyle={{ color: 'rgba(0,0,0,0.6)' }}
			/>
			<Text style={appStyles.err}>{err}</Text>
			<Button
				title="החלף קבוצה"
				onPress={() => changeGroupAlert()}
				buttonStyle={[appStyles.button, { marginTop: Dimensions.get('window').height * 0.3, marginBottom: 20 }]}
			/>
			<Button title="התנתק" onPress={() => signoutAlert()} buttonStyle={appStyles.button} />
		</View>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	title: {
		margin: 20,
		fontSize: 20,
		fontWeight: 'bold',
	},
	groupDetailView: {
		flexDirection: 'row',
		marginHorizontal: Dimensions.get('window').width * 0.15,
		alignItems: 'center',
	},
	fieldName: {
		flex: 3,
		fontWeight: 'bold',
		fontSize: 18,
	},
	fieldValue: {
		flex: 4,
		fontSize: 18,
		marginHorizontal: 5,
		textAlign: 'center',
	},
	editIcon: {
		flex: 1,
	},
	shareButton: {
		marginTop: 20,
		width: Dimensions.get('window').width * 0.5,
		backgroundColor: 'rgba(50,200,50,0.5)',
		borderColor: 'rgba(0,0,0,0.2)',
		//borderWidth: 1,
		color: 'black',
	},
});
