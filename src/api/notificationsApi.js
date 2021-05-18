import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import moment from 'moment';

export const registerForPushNotificationsAsync = async () => {
	let token;
	if (Constants.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
};

const sendPushNotification = async (expoPushToken, title, body, data) => {
	const message = {
		to: expoPushToken,
		sound: 'default',
		title: title,
		body: body,
		data: { data },
	};

	await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	});
};

const sendToUsers = (user, group, notificationTitle, notificationBody) => {
	const expoPushTokens = group.participants.map((participant) => {
		return participant.userName != user.userName && participant.notificationsEnabled
			? participant.expoPushToken
			: null;
	});
	expoPushTokens.forEach((token) => sendPushNotification(token, notificationTitle, notificationBody));
};

export const sendNewShiftNotification = (user, group) => {
	const notificationTitle = 'משמרת חדשה נוצרה';
	const notificationBody = `${user.name} הוסיף משמרת חדשה לרשימת המשמרות בקבוצת ${group.name}`;
	sendToUsers(user, group, notificationTitle, notificationBody);
};

export const sendPaymentNotification = (user, paid, group) => {
	const notificationTitle = 'תשלום חדש בוצע';
	const notificationBody = `${user.name} תיעד/ה תשלום על סך ${paid} ש"ח בקבוצת ${group.name}`;
	sendToUsers(user, group, notificationTitle, notificationBody);
};

export const sendEditedShiftDateNotification = (user, group, oldDate, newDate) => {
	const notificationTitle = 'משמרת עודכנה';
	const notificationBody = `${user.name} עדכן את תאריך המשמרת מ-${moment(oldDate).format('DD-MM-YYYY')} ל-${moment(
		newDate
	).format('DD-MM-YYYY')}`;
	sendToUsers(user, group, notificationTitle, notificationBody);
};

export const sendEditedShiftTimeNotification = (user, group, date, oldTime, newTime) => {
	const notificationTitle = 'משמרת עודכנה';
	const notificationBody = `${user.name} עדכן את זמן המשמרת בתאריך ${moment(date).format(
		'DD-MM-YYYY'
	)} מ-${oldTime} ל-${newTime}`;
	sendToUsers(user, group, notificationTitle, notificationBody);
};

export const sendShiftRemvoalNotification = (user, shift, group) => {
	const notificationTitle = 'משמרת הוסרה';
	const notificationBody = `${user.name} הסיר משמרת מתאריך ${moment(shift.date).format('DD-MM-YYYY')} בקבוצת ${
		group.name
	}`;
	sendToUsers(user, group, notificationTitle, notificationBody);
};

export const sendGroupNameEditNotification = (user, group, oldGroupName) => {
	const notificationTitle = 'שם הקבוצה שונה';
	const notificationBody = `${user.name} שינה את שם הקבוצה מ - ${oldGroupName} ל - ${group.name}`;
	sendToUsers(user, group, notificationTitle, notificationBody);
};

export const sendGroupRateEditNotification = (user, group, oldRate) => {
	const notificationTitle = 'תעריף שעתי שונה';
	const notificationBody = `${user.name} שינה את התעריף השעתי בקבוצת "${
		group.name
	}" מ${'\u20AA'}${oldRate} ל${'\u20AA'}${group.hourlyPayment} . השינוי יחול רק על משמרות חדשות.`;
	sendToUsers(user, group, notificationTitle, notificationBody);
};

export const sendGroupExitedNotification = (user, group) => {
	const notificationTitle = 'משתמש עזב את הקבוצה';
	const notificationBody = `${user.name} עזב את קבוצת "${group.name}".`;
	sendToUsers(user, group, notificationTitle, notificationBody);
};

export const sendGroupJoinedNotification = (user, group) => {
	const notificationTitle = 'משתמש הצטרף לקבוצה';
	const notificationBody = `${user.name} הצטרף לקבוצת "${group.name}"`;
	sendToUsers(user, group, notificationTitle, notificationBody);
};
