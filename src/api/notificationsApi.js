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
		console.log(token);
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
		data: {},
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
		console.log(participant);
		return participant.userName != user.userName && participant.notificationsEnabled
			? participant.expoPushToken
			: null;
	});
	expoPushTokens.forEach((token) => sendPushNotification(token, notificationTitle, notificationBody, {}));
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

export const sendShiftRemvoalNotification = (user, shift, group) => {
	const notificationTitle = 'משמרת הוסרה';
	const notificationBody = `${user.name} הסיר משמרת מתאריך ${moment(shift.date).format('DD-MM-YYYY')} בקבוצת ${
		group.name
	}`;
	sendToUsers(user, group, notificationTitle, notificationBody);
};
