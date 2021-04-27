import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions, Share, Image } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as GroupContext } from '../context/GroupContext';
import { styles as appStyles } from '../styles/styles';
import SettingsDetail from '../components/SettingsDetail';
import { Fontisto, FontAwesome5, Entypo } from '@expo/vector-icons';

const GroupScreen = () => {
	const { state, editUser } = useContext(AuthContext);
	const groupContext = useContext(GroupContext);
	const groupState = groupContext.state;
	const { group, err } = groupState;
	const editGroup = groupContext.editGroup;

	const share = async () => {
		try {
			const result = await Share.share({
				message: `היי! הוזמנת על ידי ${state.user.name} להצטרף לקבוצה באפליקציית BabyBit. כל שנותר לך הוא להוריד את האפליקציה מחנות האפליקציות ולמלא את קוד הקבוצה: ${group.id}.\nלינק להורדת האפליקציה: https://play.google.com/store/apps/details?id=com.nirkatz.babybit`,
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

	const renderParticipants = () => {
		return group.participants.map((user, index) => {
			return (
				<View key={index} style={styles.participant}>
					<Image source={{ uri: user.image }} style={styles.userImg} />
					<Text style={styles.participantName}>{user.name}</Text>
					{user.type == 'parent' ? (
						<Fontisto name="persons" size={25} color="green" style={styles.userIcon} />
					) : (
						<FontAwesome5 name="baby" size={25} color="pink" style={styles.userIcon} />
					)}
				</View>
			);
		});
	};

	return (
		<View style={styles.container}>
			<Card containerStyle={styles.groupDetailsContainer}>
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
			</Card>

			<View style={styles.participantsContainer}>
				<View style={styles.participantsHeader}>
					<Text style={styles.participantsTitle}>חברי הקבוצה</Text>
					<View style={styles.shareButtonContainer}>
						<Button
							title="הזמן חברים"
							onPress={() => share()}
							buttonStyle={styles.shareButton}
							titleStyle={{ color: 'rgba(0,0,0,0.6)' }}
							icon={() => <Entypo name="share" size={24} color="black" style={styles.shareIcon} />}
						/>
					</View>
				</View>
				<Card containerStyle={styles.participantsMembers}>{renderParticipants()}</Card>
			</View>
			<View style={styles.changeGroupBtn}>
				<Button
					title="החלף קבוצה"
					onPress={() => changeGroupAlert()}
					buttonStyle={[appStyles.button, { marginBottom: 40 }]}
				/>
			</View>
		</View>
	);
};

export default GroupScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	groupDetailsContainer: {
		width: Dimensions.get('window').width * 0.9,
		justifyContent: 'center',
		marginTop: Dimensions.get('window').height * 0.05,
	},
	participantsContainer: {
		width: Dimensions.get('window').width * 0.9,
		marginTop: Dimensions.get('window').height * 0.05,
	},
	participantsHeader: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	participantsTitle: {
		fontWeight: 'bold',
		fontSize: 22,
	},
	shareButtonContainer: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
	},
	shareButton: {
		backgroundColor: 'rgba(50,200,50,0.5)',
		borderColor: 'rgba(0,0,0,0.2)',
		color: 'black',
	},
	shareIcon: {
		marginRight: 10,
	},
	participantsMembers: {},
	participant: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		marginVertical: 10,
	},
	userImg: {
		height: 40,
		width: 40,
		borderRadius: 40,
		marginLeft: 10,
	},
	participantName: {
		fontSize: 18,
		textAlign: 'center',
		fontWeight: 'bold',
		flex: 1,
	},
	userIcon: {
		textAlign: 'center',
		flex: 2,
	},
	changeGroupBtn: {
		position: 'absolute',
		top: Dimensions.get('window').height * 0.8,
	},
});
