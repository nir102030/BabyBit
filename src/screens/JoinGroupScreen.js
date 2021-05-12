import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, Modal, Alert, View, StyleSheet, Text, TextInput } from 'react-native';
import {} from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as GroupContext } from '../context/GroupContext';
import { styles as appStyles } from '../styles/styles';
import { registerForPushNotificationsAsync } from '../api/notificationsApi';
import BabyIcon from '../assets/BabyIcon';
import { sendGroupJoinedNotification } from '../api/notificationsApi';
import Emoji from 'react-native-emoji';

const JoinGroupScreen = () => {
	const { state, editUser } = useContext(AuthContext);
	const groupContext = useContext(GroupContext);
	const { addGroup, getGroup, editGroup } = groupContext;
	const user = state.user;
	const [groupStatus, setGroupStatus] = useState();
	const [group, setGroup] = useState({ id: '', name: '', hourlyPayment: '', participants: [] });

	const generateGroupId = () => {
		return (id = Math.round(Math.random() * 9999999999));
	};

	// handles a new group subbmission
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
				addGroup({ ...group, id: groupId, participants: [editedUser], totalPayment: 0 });
				editUser(editedUser);
			} else Alert.alert('', 'התשלום השעתי חייב להכיל ספרות בלבד', [{ text: 'הבנתי' }]);
		}
	};

	// handles joining to an existing group
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
				sendGroupJoinedNotification(state.user, dbGroup);
				editGroup({ ...dbGroup, participants: [...dbGroup.participants, editedUser] });
				editUser(editedUser);
			}
		}
	};

	const initiateNotificationsService = async () => {
		const expoPushToken = await registerForPushNotificationsAsync();
		editUser({ ...state.user, expoPushToken: expoPushToken });
	};

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showWelcomeMsg = () => {
		setIsModalVisible(true);
	};

	// on user's first enter the app (before he have the notifications token)
	// initiate notifications service and showup a modal with an welcome message
	useEffect(() => {
		if (!state.user.expoPushToken) {
			initiateNotificationsService();
			showWelcomeMsg();
			setTimeout(() => setIsModalVisible(false), 5000);
		}
	}, []);

	const handleNameInputChange = (value) => {
		return value.length <= 25 ? setGroup({ ...group, name: value }) : null;
	};

	return (
		<View style={styles.container}>
			<BabyIcon style={styles.babyIcon} />
			{isModalVisible ? (
				<View style={styles.centeredView}>
					<Modal visible={isModalVisible} transparent={true}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<View style={styles.welcomTextContainer}>
									<Text style={styles.welcomeText}>ברוכים הבאים לבייבי-ביט!</Text>
									<Emoji name="grinning" style={{ fontSize: 40 }} />
								</View>
								<View style={styles.welcomTextContainer}>
									<Text style={styles.welcomInfoText}>
										אפליקציה לניהול המשמרות והתשלומים של הבייביסיטר שלכם
									</Text>
									<Emoji name="baby" style={{ fontSize: 40 }} />
								</View>
							</View>
						</View>
					</Modal>
				</View>
			) : (
				<ScrollView contentContainerStyle={styles.scrollView}>
					<Text style={styles.intro2}>כדי להתחיל, בחר\י אחת משתי האופציות הבאות:</Text>
					<View style={styles.buttonsContainer}>
						<Button
							title="צור קבוצה חדשה"
							onPress={() => setGroupStatus('new')}
							buttonStyle={[
								appStyles.button,
								styles.button,
								groupStatus == 'new' ? styles.pressedButton : null,
							]}
						/>
						<Button
							title="הצטרף לקבוצה קיימת"
							onPress={() => setGroupStatus('old')}
							buttonStyle={[
								appStyles.button,
								styles.button,
								groupStatus == 'old' ? styles.pressedButton : null,
							]}
						/>
					</View>
					{groupStatus === 'new' ? (
						<View style={styles.newGroupContainer}>
							<View style={styles.nameInputContainer}>
								<TextInput
									placeholder="בחר שם לקבוצה"
									value={group.name}
									onChangeText={handleNameInputChange}
									style={[appStyles.input, styles.input]}
								/>
								<Text style={styles.groupNameLength}>{25 - group.name.length}</Text>
							</View>
							<TextInput
								placeholder="הזן תשלום שעתי"
								value={group.hourlyPayment}
								onChangeText={(input) => setGroup({ ...group, hourlyPayment: input })}
								style={[appStyles.input, styles.input]}
								keyboardType="numeric"
							/>
						</View>
					) : groupStatus == 'old' ? (
						<TextInput
							placeholder="הכנס את קוד הקבוצה"
							value={group.id}
							onChangeText={(input) => setGroup({ ...group, id: input })}
							style={[appStyles.input, styles.input]}
							keyboardType="numeric"
						/>
					) : null}
					{(groupStatus == 'new' && group.name && group.hourlyPayment) ||
					(groupStatus == 'old' && group.id) ? (
						<Button
							title="המשך"
							onPress={() => (groupStatus === 'new' ? handleNewGroupSubmit() : handleOldGroupSubmit())}
							containerStyle={styles.continueButtonContainer}
							buttonStyle={appStyles.button}
						/>
					) : null}
				</ScrollView>
			)}
		</View>
	);
};

export default JoinGroupScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		alignItems: 'center',
	},
	babyIcon: {
		opacity: 0.2,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: 'rgba(200,0,0,0.1)',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	welcomTextContainer: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'center',
	},
	welcomeText: {
		fontSize: 24,
		fontWeight: 'bold',
		marginLeft: 10,
		textAlign: 'center',
	},
	welcomInfoText: {
		fontSize: 24,
		textAlign: 'center',
		marginTop: 20,
		marginLeft: 10,
	},
	intro2: {
		fontSize: 24,
		marginTop: 40,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	buttonsContainer: {
		flexDirection: 'row-reverse',
		marginVertical: 20,
		flexWrap: 'wrap',
	},
	button: {
		width: null,
	},
	pressedButton: {
		backgroundColor: 'rgba(200,50,50,0.8)',
		opacity: 0.5,
	},
	input: {
		textAlign: 'center',
		marginVertical: 10,
		backgroundColor: 'rgba(200,0,0,0.1)',
		borderRadius: 10,
		padding: 5,
		fontSize: 22,
		color: 'rgba(0,0,0,0.7)',
	},
	newGroupContainer: {
		//width: Dimensions.get('window').width * 0.7,
	},
	nameInputContainer: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
	},
	groupNameLength: {
		position: 'absolute',
		right: 5,
		color: 'rgba(0,0,0,0.3)',
	},
	continueButtonContainer: {
		margin: 30,
	},
});
