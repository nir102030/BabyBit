import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions, Share, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as GroupContext } from '../context/GroupContext';
import { styles as appStyles } from '../styles/styles';
import SettingsDetail from '../components/SettingsDetail';
import { Fontisto, FontAwesome5 } from '@expo/vector-icons';

const SettingsScreen = () => {
	const { state, editUser } = useContext(AuthContext);
	const groupContext = useContext(GroupContext);
	const groupState = groupContext.state;
	const { group, err } = groupState;
	const editGroup = groupContext.editGroup;

	const share = async () => {
		try {
			const result = await Share.share({
				message: `היי! הוזמנת על ידי ${state.user.name} להצטרף לקבוצה באפליקציית BabyBit. כל שנותר לך הוא להוריד את האפליקציה מחנות האפליקציות ולמלא את קוד הקבוצה: ${group.id}. לינק להורדת האפליקציה: https://play.google.com/store/apps/details?id=com.nirkatz.babybit`,
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

	const handleChangeGroup = () => {
		editUser({ ...state.user, groupId: null });
		const filteredParticipants = group.participants.filter((part) => part.userName != state.user.userName);
		editGroup({ ...group, participants: filteredParticipants });
	};

	const changeGroupAlert = () => {
		Alert.alert('היי', 'אתה בטוח שברצונך להחליף קבוצה?', [
			{ text: 'ביטול', style: 'cancel' },
			{ text: 'כן, החלף קבוצה', onPress: () => handleChangeGroup() },
		]);
	};

	return (
		<View style={styles.container}>
			<View
				style={{
					flex: 2,
					width: Dimensions.get('window').width * 0.9,
					justifyContent: 'center',
					borderBottomWidth: 2,
				}}
			>
				<SettingsDetail
					fieldName="שם הקבוצה"
					initialFieldValue={group.name}
					editGroup={(value) => editGroup({ ...group, name: value })}
					userType={state.user.type}
				/>
				<SettingsDetail
					fieldName="תשלום שעתי"
					initialFieldValue={group.hourlyPayment}
					editGroup={(value) => editGroup({ ...group, hourlyPayment: value })}
					userType={state.user.type}
				/>
			</View>
			<View
				style={{
					flex: 4,
					width: Dimensions.get('window').width * 0.9,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<View style={styles.participantsContainer}>
					<View style={{ marginEnd: 20 }}>
						<Text style={styles.fieldName}>חברי הקבוצה:</Text>
						<Button
							title="הזמן חברים"
							onPress={() => share()}
							buttonStyle={styles.shareButton}
							titleStyle={{ color: 'rgba(0,0,0,0.6)' }}
						/>
					</View>

					<View style={styles.participants}>
						{group.participants.map((user, index) => {
							return (
								<View
									key={index}
									style={{
										flexDirection: 'row',
										marginBottom: 10,
										borderBottomWidth: 0.5,
										borderBottomColor: 'rgba(0,0,0,0.2)',
										paddingVertical: 5,
										justifyContent: 'space-around',
										alignItems: 'center',
									}}
								>
									<Text style={{ fontSize: 16, flex: 1, textAlign: 'center' }}>{user.name}</Text>
									<Image
										source={{ uri: user.image }}
										style={{
											height: 50,
											width: 50,
											borderRadius: 30,
											marginEnd: 15,
										}}
									/>
									{user.type == 'parent' ? (
										<Fontisto
											name="persons"
											size={25}
											color="green"
											style={{ flex: 1, textAlign: 'center' }}
										/>
									) : (
										<FontAwesome5
											name="baby"
											size={25}
											color="pink"
											style={{ flex: 1, textAlign: 'center' }}
										/>
									)}
								</View>
							);
						})}
					</View>
				</View>
			</View>

			<View style={{ flex: 3, justifyContent: 'flex-end' }}>
				<Text style={appStyles.err}>{err}</Text>
				<Button
					title="החלף קבוצה"
					onPress={() => changeGroupAlert()}
					buttonStyle={[appStyles.button, { marginBottom: 40 }]}
				/>
			</View>
		</View>
	);
};

export default SettingsScreen;

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
		//flex: 3,
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
	icon: {},
	shareButton: {
		marginTop: 20,
		//width: Dimensions.get('window').width * 0.5,
		backgroundColor: 'rgba(50,200,50,0.5)',
		borderColor: 'rgba(0,0,0,0.2)',
		color: 'black',
	},
	participants: {
		flex: 6,
		flexDirection: 'column',
	},
	participantsContainer: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
});
