import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { styles as appStyles } from '../styles/styles';
import { registerForPushNotificationsAsync } from '../api/notificationsApi';
import BabyIcon from '../assets/BabyIcon';
import WelcomeMsg from '../components/general/WelcomeMsg';
import useGroupSubmission from '../hooks/useGroupSubmission';
import { Context as AuthContext } from '../context/AuthContext';
import InfoMsg from '../components/general/InfoMsg';

const JoinGroupScreen = () => {
	const [welcomeMsgVisible, setWelcomeMsgVisible] = useState(false);
	const [groupStatus, setGroupStatus] = useState();
	const [group, setGroup] = useState({ id: '', name: '', hourlyPayment: '', participants: [] });
	const [handleNewGroupSubmit, handleOldGroupSubmit] = useGroupSubmission(group);
	const { state, editUser } = useContext(AuthContext);

	// get the notifications push token from expo
	const initiateNotificationsService = async () => {
		const expoPushToken = await registerForPushNotificationsAsync();
		editUser({ ...state.user, expoPushToken: expoPushToken });
	};

	// for new users, initiate notifications service and show a welcome message
	useEffect(() => {
		if (state.user.new) {
			initiateNotificationsService();
			setWelcomeMsgVisible(true);
		}
	}, []);

	const handleNameInputChange = (value) => {
		return value.length <= 25 ? setGroup({ ...group, name: value }) : null;
	};

	return (
		<View style={styles.container}>
			<BabyIcon style={styles.babyIcon} />
			{welcomeMsgVisible ? (
				<WelcomeMsg welcomeMsgVisible={welcomeMsgVisible} setWelcomeMsgVisible={setWelcomeMsgVisible} />
			) : (
				<ScrollView contentContainerStyle={styles.scrollView}>
					<Text style={styles.intro2}>כדי להתחיל, בחר\י אחת משתי האופציות הבאות:</Text>
					<View style={styles.buttonsContainer}>
						<Button
							title="יצירת קבוצה חדשה"
							onPress={() => setGroupStatus('new')}
							buttonStyle={[
								appStyles.button,
								styles.button,
								groupStatus == 'new' ? styles.pressedButton : null,
							]}
							icon={() => (
								<InfoMsg
									text="צרו קבוצה עם הבייביסטר וההורים, שבה כולכם תוכלו לצפות ולתעד משמרות ותשלומים"
									containerStyle={{ marginLeft: 5 }}
									color={'rgba(255,255,255,0.7)'}
								/>
							)}
						/>
						<Button
							title="הצטרפות לקבוצה קיימת"
							onPress={() => setGroupStatus('old')}
							buttonStyle={[
								appStyles.button,
								styles.button,
								groupStatus == 'old' ? styles.pressedButton : null,
							]}
							icon={() => (
								<InfoMsg
									text="בחרו באופציה זו אם קיבלתם זימון להצטרף לקבוצה ויש בידכם את קוד הקבוצה"
									containerStyle={{ marginLeft: 5 }}
									color={'rgba(255,255,255,0.7)'}
								/>
							)}
						/>
					</View>
					{groupStatus === 'new' ? (
						<View style={styles.newGroupContainer}>
							<View style={styles.inputContainer}>
								<TextInput
									placeholder="שם הקבוצה"
									value={group.name}
									onChangeText={handleNameInputChange}
									style={[appStyles.input, styles.input]}
								/>
								<Text style={styles.groupNameLength}>{25 - group.name.length}</Text>
							</View>
							<View style={styles.inputContainer}>
								<InfoMsg
									text={`תשלום עבור שעת עבודה של הבייביסיטר\n${
										state.user.type == 'parent' ? '(תוכלו לשנות זאת בהמשך)' : ''
									}`}
									containerStyle={{ position: 'absolute', right: 5, zIndex: 1 }}
									color={'rgba(100,0,0,0.3)'}
								/>
								<TextInput
									placeholder="תשלום שעתי"
									value={group.hourlyPayment}
									onChangeText={(input) => setGroup({ ...group, hourlyPayment: input })}
									style={[appStyles.input, styles.input]}
									keyboardType="numeric"
								/>
							</View>
						</View>
					) : groupStatus == 'old' ? (
						<View style={styles.inputContainer}>
							<InfoMsg
								text='הקוד שנשלח אליך ע"י חבר בקבוצה'
								containerStyle={{ position: 'absolute', right: 5, zIndex: 1 }}
								color={'rgba(100,0,0,0.3)'}
							/>
							<TextInput
								placeholder="קוד הקבוצה"
								value={group.id}
								onChangeText={(input) => setGroup({ ...group, id: input })}
								style={[appStyles.input, styles.input]}
								keyboardType="numeric"
							/>
						</View>
					) : null}
					{(groupStatus == 'new' && group.name && group.hourlyPayment) ||
					(groupStatus == 'old' && group.id) ? (
						<Button
							title={groupStatus == 'new' ? 'צור קבוצה' : 'הצטרף'}
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
		flexDirection: 'row-reverse',
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
	newGroupContainer: {},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		zIndex: 0,
		justifyContent: 'center',
	},
	groupNameLength: {
		position: 'absolute',
		left: 5,
		color: 'rgba(0,0,0,0.3)',
	},
	continueButtonContainer: {
		margin: 20,
	},
});
