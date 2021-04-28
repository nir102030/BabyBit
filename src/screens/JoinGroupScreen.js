import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, Alert } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as GroupContext } from '../context/GroupContext';
import { styles as appStyles } from '../styles/styles';
import { registerForPushNotificationsAsync } from '../api/notificationsApi';

const JoinGroupScreen = () => {
	const { state, editUser } = useContext(AuthContext);
	const groupContext = useContext(GroupContext);
	const { addGroup, getGroup, editGroup } = groupContext;
	const groupState = groupContext.state;
	const user = state.user;
	const [groupStatus, setGroupStatus] = useState();
	const [group, setGroup] = useState({ id: '', name: '', hourlyPayment: '', participants: [] });

	const generateGroupId = () => {
		return (id = Math.round(Math.random() * 9999999999));
	};

	const handleNewGroupSubmit = () => {
		if (!group.name) {
			Alert.alert('', 'חובה להזין את שם הקבוצה', [{ text: 'הבנתי' }]);
		} else if (!group.hourlyPayment) {
			Alert.alert('', 'חובה להזין תשלום שעתי', [{ text: 'הבנתי' }]);
		} else {
			let isnum = /^\d+$/.test(group.hourlyPayment);
			if (isnum) {
				const groupId = generateGroupId();
				const editedUser = {
					...user,
					groupId: groupId,
				};
				editUser(editedUser);
				addGroup({ ...group, id: groupId, participants: [editedUser], totalPayment: 0 });
			} else Alert.alert('', 'התשלום השעתי חייב להכיל ספרות בלבד', [{ text: 'הבנתי' }]);
		}
	};

	const handleOldGroupSubmit = async () => {
		if (!group.id) {
			Alert.alert('', 'חובה להזין את קוד הקבוצה', [{ text: 'הבנתי' }]);
		} else {
			const dbGroup = await getGroup(group.id);
			if (!dbGroup) {
				Alert.alert('', 'קוד הקבוצה שגוי! נסה קוד אחר', [{ text: 'הבנתי' }]);
			} else {
				const editedUser = {
					...user,
					groupId: group.id,
				};
				editGroup({ ...dbGroup, participants: [...dbGroup.participants, editedUser] });
				editUser(editedUser);
			}
		}
	};

	const initiateNotificationsService = async () => {
		const expoPushToken = await registerForPushNotificationsAsync();
		editUser({ ...state.user, expoPushToken: expoPushToken });
	};

	useEffect(() => {
		if (!state.user.expoPushToken) initiateNotificationsService();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.intro1}>
					{`ברוכים הבאים לבייבי-ביט! \n אפליקציה לניהול המשמרות והתשלומים של הבייביסיטר`}
				</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<Text style={styles.intro2}>כדי להתחיל, בחר\י אחת משתי האופציות הבאות:</Text>
				<Button
					title="צור קבוצה חדשה"
					onPress={() => setGroupStatus('new')}
					containerStyle={appStyles.button}
				/>
				{groupStatus === 'new' ? (
					<View style={{ width: Dimensions.get('window').width * 0.7 }}>
						<Input
							placeholder="בחר שם לקבוצה"
							value={group.name}
							onChangeText={(input) => setGroup({ ...group, name: input })}
							style={[appStyles.input, styles.input]}
						/>
						<Input
							placeholder="הזן תשלום שעתי"
							value={group.hourlyPayment}
							onChangeText={(input) => setGroup({ ...group, hourlyPayment: input })}
							style={[appStyles.input, styles.input]}
						/>
					</View>
				) : null}

				<Text style={styles.intro2}>או</Text>
				<Button
					title="הצטרף לקבוצה קיימת"
					onPress={() => setGroupStatus('old')}
					containerStyle={appStyles.button}
				/>
				{groupStatus === 'old' ? (
					<Input
						placeholder="הכנס את קוד הקבוצה"
						value={group.id}
						onChangeText={(input) => setGroup({ ...group, id: input })}
						style={[appStyles.input, styles.input]}
					/>
				) : null}
			</View>
			{groupState.err ? <Text style={appStyles.error}>{groupState.err}</Text> : null}
			<Button
				title="המשך"
				onPress={() => (groupStatus === 'new' ? handleNewGroupSubmit() : handleOldGroupSubmit())}
				containerStyle={[
					appStyles.button,
					{ margin: 30, position: 'absolute', top: Dimensions.get('window').height * 0.75 },
				]}
			/>
		</View>
	);
};

export default JoinGroupScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	textContainer: {
		alignItems: 'center',
		top: Dimensions.get('window').height * 0.05,
		position: 'absolute',
	},
	intro1: {
		fontSize: 24,
		marginHorizontal: 10,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	intro2: {
		fontSize: 20,
		margin: 5,
		textAlign: 'center',
	},
	buttonsContainer: {
		alignItems: 'center',
		top: Dimensions.get('window').height * 0.2,
		position: 'absolute',
		width: Dimensions.get('window').width * 0.7,
	},
	input: {
		textAlign: 'center',
	},
});
