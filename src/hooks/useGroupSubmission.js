import { useContext } from 'react';
import { Alert, Share } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as GroupContext } from '../context/GroupContext';
import { sendGroupJoinedNotification } from '../api/notificationsApi';

const useGroupSubmission = (group) => {
	const { state, editUser } = useContext(AuthContext);
	const groupContext = useContext(GroupContext);
	const { addGroup, getGroup, editGroup } = groupContext;
	const user = state.user;

	const generateGroupId = () => {
		return (id = Math.round(Math.random() * 9999999999));
	};

	const share = async (groupId) => {
		try {
			await Share.share({
				message: `היי! הוזמנת על ידי ${user.name} להצטרף לקבוצת ${group.name} באפליקציית BabyBit. כל שנותר לך הוא להוריד את האפליקציה מחנות האפליקציות ולמלא את קוד הקבוצה: ${groupId}.\nלינק להורדת האפליקציה: https://play.google.com/store/apps/details?id=com.nirkatz.babybit`,
			});
		} catch (error) {
			alert(error.message);
		}
	};

	const newGroupAlert = () => {
		const groupId = generateGroupId();

		Alert.alert(
			' מזל טוב!',
			`יצרת קבוצה חדשה, בה יתועדו כל המשמרות והתשלומים לבייביסיטר. שתפ/י את הקבוצה עם ${
				user.type == 'parent' ? 'ההורה הנוסף והבייביסיטר' : 'ההורים'
			}, כדי שיהיו מעודכנים תמיד!`,
			[
				{
					text: 'שתפ/י',
					onPress: () => {
						share(groupId);
						updateGroupAndUser(groupId);
					},
				},
				{ text: 'אחר כך', onPress: () => updateGroupAndUser(groupId) },
			]
		);
	};

	const updateGroupAndUser = (groupId) => {
		const editedUser = {
			...user,
			groupId: groupId,
		};
		addGroup({ ...group, id: groupId, participants: [editedUser], totalPayment: 0 });
		editUser(editedUser);
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
				newGroupAlert();
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

	return [handleNewGroupSubmit, handleOldGroupSubmit];
};

export default useGroupSubmission;
