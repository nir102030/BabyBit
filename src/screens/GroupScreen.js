import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as GroupContext } from '../context/GroupContext';
import GroupName from '../components/group/GroupName';
import GroupIcon from '../assets/groupIcon';
import GroupParticipants from '../components/group/GroupParticipants';
import GroupRate from '../components/group/GroupRate';
import ChangeGroupButton from '../components/group/ChangeGroupButton';
import { sendGroupExitedNotification } from '../api/notificationsApi';

const GroupScreen = () => {
	const { state, editUser } = useContext(AuthContext);
	const groupContext = useContext(GroupContext);
	const groupState = groupContext.state;
	const { group } = groupState;
	const editGroup = groupContext.editGroup;

	const handleChangeGroup = () => {
		sendGroupExitedNotification(state.user, group);
		const filteredParticipants = group.participants.filter((part) => part.userName != state.user.userName);
		editGroup({ ...group, participants: filteredParticipants });
		editUser({ ...state.user, groupId: null });
	};

	const changeGroupAlert = () => {
		Alert.alert(`היי ${state.user.name}`, 'אתה בטוח שברצונך להחליף קבוצה?', [
			{ text: 'ביטול', style: 'cancel' },
			{ text: 'כן, החלף קבוצה', onPress: () => handleChangeGroup() },
		]);
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<GroupIcon
				width={Dimensions.get('window').width}
				height={Dimensions.get('window').height * 0.23}
				style={styles.groupIcon}
			/>
			<GroupName userType={state.user.type} />
			<GroupParticipants participants={group.participants} currentUser={state.user} group={group} />
			<GroupRate userType={state.user.type} />
			<ChangeGroupButton onPress={changeGroupAlert} />
		</ScrollView>
	);
};

export default GroupScreen;

const styles = StyleSheet.create({
	container: {},
	groupDetailsContainer: {
		width: Dimensions.get('window').width * 0.9,
		justifyContent: 'center',
		marginTop: Dimensions.get('window').height * 0.02,
	},
	changeGroupBtn: {
		marginTop: Dimensions.get('window').height * 0.03,
	},
	groupIcon: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		opacity: 1,
		backgroundColor: 'rgba(0,50,255,0.2)',
	},
});
