import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { sendPaymentNotification } from '../api/notificationsApi';
import { Context as ShiftContext } from '../context/ShiftContext';
import { Context as GroupContext } from '../context/GroupContext';

const usePayment = (user) => {
	const [payment, setPayment] = useState('');
	const { setPaidShifts, unmarkAllShifts, state } = useContext(ShiftContext);
	const { shifts, payments } = state;
	const { group } = useContext(GroupContext).state;

	// validation for the payment input
	const validatePayment = () => {
		return payment > payments.totalPayment // the payment input is not larger then the total payment
			? `התשלום חייב להיות קטן או שווה לסכום הכולל שנותר לשלם!`
			: !/^\d+$/.test(payment) // the payment input contains only numbers
			? 'נא הזן ספרות בלבד'
			: null;
	};

	// alert the pops up when a new payment is added, with onPress handler
	const addPaymentAlert = () => {
		Alert.alert('', 'סטטוס התשלום עודכן! המשמרות הרלוונטיות יועברו אוטומטית לרשימת המשמרות ששולמו', [
			{
				text: 'מצוין!',
				onPress: async () => {
					setPaidShifts(shifts, parseInt(payment));
					setTimeout(() => unmarkAllShifts(), 1000);
					sendPaymentNotification(user, parseInt(payment), group); // send notification to all the group participants
				},
			},
		]);
	};

	// triggered when a new payment is added
	const handlePaymentSubmission = () => {
		addPaymentAlert();
		setPayment('');
	};

	return [payment, setPayment, validatePayment, handlePaymentSubmission];
};

export default usePayment;
