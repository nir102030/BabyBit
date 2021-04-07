import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as GroupContext } from '../context/GroupContext';
import { styles as appStyles } from '../styles/styles';

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
			alert('חובה להזין את שם הקבוצה');
		} else if (!group.hourlyPayment) {
			alert('חובה להזין תשלום שעתי');
		} else {
			let isnum = /^\d+$/.test(group.hourlyPayment);
			if (isnum) {
				const groupId = generateGroupId();
				editUser({
					...user,
					groupId: groupId,
				});
				addGroup({ ...group, id: groupId, participants: [user] });
			} else alert('התשלום השעתי חייב להכיל ספרות בלבד');
		}
	};

	const handleOldGroupSubmit = async () => {
		if (!group.id) {
			alert('חובה להזין את קוד הקבוצה');
		} else {
			const dbGroup = await getGroup(group.id);
			if (!dbGroup) {
				alert('קוד הקבוצה שגוי! נסה קוד אחר');
			} else {
				editGroup({ ...dbGroup, participants: [...dbGroup.participants, user] });
				editUser({
					...user,
					groupId: group.id,
				});
			}
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.intro1}>ברוכים הבאים לבייבי-ביט! אפליקציה לניהול המשמרות והתשלומים לבייביסיטר</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<Text style={styles.intro2}>בחר\י אחת משתי האופציות הבאות:</Text>
				<Button
					title="צור קבוצה חדשה"
					onPress={() => setGroupStatus('new')}
					containerStyle={appStyles.button}
				/>
				{groupStatus === 'new' ? (
					<View>
						<TextInput
							placeholder="בחר שם לקבוצה"
							value={group.name}
							onChangeText={(input) => setGroup({ ...group, name: input })}
							style={[appStyles.input, styles.input]}
						/>
						<TextInput
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
					<TextInput
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
				containerStyle={[appStyles.button, { margin: 30 }]}
			/>
		</View>
	);
};

export default JoinGroupScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	textContainer: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	intro1: {
		fontSize: 20,
		margin: 5,
		textAlign: 'center',
	},
	intro2: {
		fontSize: 18,
		margin: 5,
		textAlign: 'center',
	},
	buttonsContainer: {
		flex: 5,
	},
	input: {
		textAlign: 'center',
	},
});
