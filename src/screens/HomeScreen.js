import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import ShiftList from '../components/shifts/ShiftList';
import moment from 'moment';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as ShiftsContext } from '../context/ShiftContext';
import { Context as GroupContext } from '../context/GroupContext';
import {
	sendNewShiftNotification,
	sendPaymentNotification,
	sendShiftRemvoalNotification,
} from '../api/notificationsApi';
import NewShift from '../components/shifts/NewShift';
import NewPaymentCard from '../components/payments/NewPaymentCard';
import AddPaymentButton from '../components/payments/AddPaymentButton';
import BabyIcon from '../assets/BabyIcon';
import { Dimensions } from 'react-native';

const HomeScreen = () => {
	const scrollViewRef = useRef();

	// the user state
	const { state } = useContext(AuthContext);

	// the state of the shift and payment to be created
	const [shift, setShift] = useState({ date: new Date(), from: new Date(), to: new Date(), payment: 0, paied: 0 });
	const [payment, setPayment] = useState('');

	// group state
	const group = useContext(GroupContext).state.group;

	// shifts and payments state and methods
	const shiftsContext = useContext(ShiftsContext);
	const shifts = shiftsContext.state.shifts;
	const payments = shiftsContext.state.payments;
	const { addShift, removeShift, setPaidShifts, getAllShifts, unmarkShift, unmarkAllShifts } = shiftsContext;

	// validation for the payment input
	const validatePayment = () => {
		return payment > payments.totalPayment // the payment input is not larger then the total payment
			? `התשלום חייב להיות קטן או שווה לסכום הכולל שנותר לשלם!`
			: !/^\d+$/.test(payment) // the payment input contains only numbers
			? 'נא הזן ספרות בלבד'
			: null;
	};

	// validation for the shift (hours) input
	const validateShift = () => {
		const shiftHoursDiff = moment(shift.to).diff(moment(shift.from), 'minutes'); // the shift end hour is after the start hour
		return shiftHoursDiff <= 0 ? 'שעת הסיום של המשמרת חייבת להיות לאחר שעת ההתחלה' : null;
	};

	// the alert pops up when trying to delete a shift
	const removeShiftAlert = (shift) => {
		Alert.alert(
			'היי',
			'האם אתה בטוח שברצונך להסיר משמרת זו?',
			[
				{ text: 'לא, בטל פעולה' },
				{
					text: 'כן, הסר משמרת',
					onPress: () => {
						removeShift(shifts, shift);
						sendShiftRemvoalNotification(state.user, shift, group);
					},
				},
			],
			{ cancelable: true }
		);
	};

	// unmark the shift 1 second after it was added and marked
	const unmarkAddedShift = (shiftId) => {
		setTimeout(() => unmarkShift(shiftId), 1);
	};

	// alert that pops up when a new shift is added
	const addShiftAlert = (shiftId) => {
		Alert.alert('', 'המשמרת נוספה לרשימת המשמרות הפתוחות', [
			{ text: 'מצוין, תודה!', onPress: () => unmarkAddedShift(shiftId) },
		]);
	};

	// alert the pops up when a new payment is added, with onPress handler
	const addPaymentAlert = () => {
		Alert.alert('', 'תודה! סטטוס התשלום עודכן', [
			{
				text: 'מצוין, תודה!',
				onPress: () => {
					setPaidShifts(shifts, parseInt(payment));
					setTimeout(() => unmarkAllShifts(), 1000);
				},
			},
		]);
	};

	// triggered when a new shift is added
	const onNewShiftSubmit = () => {
		// calcuate the new shift id (accroding to the number of shifts in this group)
		const shiftId =
			shifts.length > 0
				? Math.max.apply(
						Math,
						shifts.map((shift) => shift.id)
				  ) + 1
				: 1;

		// add the shift to the db and app state
		addShift(group, { ...shift, id: shiftId, marked: true }, state.user.name);

		// add alert to the user
		addShiftAlert(shiftId);

		// send notification to all the group participants
		sendNewShiftNotification(state.user, group);
	};

	// triggered when a new payment is added
	const onNewPaymentSubmit = () => {
		addPaymentAlert();
		sendPaymentNotification(state.user, parseInt(payment), group); // send notification to all the group participants
		setPayment('');
	};

	const scrollToEnd = () => {
		scrollViewRef.current.scrollToEnd({ animated: true });
		setIsScrolledToEnd(true);
	};

	// scroll the screen to the end in any render
	useEffect(() => {
		scrollToEnd();
	});

	//scroll to end when scrollToEnd state is true
	useEffect(() => {
		if (!isScrolledToEnd) scrollToEnd();
	}, [isScrolledToEnd]);

	// initiate the shifts from db into the app state
	useEffect(() => {
		getAllShifts(group.id);
	}, [group]);

	const [isScrolledToEnd, setIsScrolledToEnd] = useState(true);
	const [isPaymentOpened, setIsPaymentOpened] = useState(false);

	return (
		<View style={styles.container}>
			<BabyIcon style={styles.babyIcon} />
			<ScrollView contentContainerStyle={styles.scrollView} ref={scrollViewRef}>
				<ShiftList
					shifts={shifts.filter((shift) => shift.paied < shift.payment || shift.marked)}
					removeShiftAlert={removeShiftAlert}
				/>
				<NewShift
					shift={shift}
					setShift={setShift}
					onSubmit={onNewShiftSubmit}
					validateShift={validateShift}
					setIsScrolledToEnd={setIsScrolledToEnd}
				/>
			</ScrollView>
			<View style={[styles.totalPaymentView, { flexDirection: isPaymentOpened ? 'column' : 'row' }]}>
				{state.user.type == 'parent' ? (
					isPaymentOpened ? (
						<NewPaymentCard
							payment={payment}
							setPayment={setPayment}
							onSubmit={onNewPaymentSubmit}
							validatePayment={validatePayment}
							totalPayment={payments.totalPayment}
							setIsScrolledToEnd={setIsScrolledToEnd}
							isPaymentOpened={isPaymentOpened}
							setIsPaymentOpened={setIsPaymentOpened}
						/>
					) : (
						<AddPaymentButton setIsPaymentOpened={setIsPaymentOpened} />
					)
				) : null}
				<Text style={styles.paymentText}>
					נותר לשלם: {payments.totalPayment} {'\u20AA'}
				</Text>
			</View>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	babyIcon: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 0.2,
		backgroundColor: 'rgba(200,0,0,0.1)',
	},
	scrollView: {
		paddingBottom: 15,
	},
	totalPaymentView: {
		justifyContent: 'center',
		marginHorizontal: 0,
		alignItems: 'center',
		backgroundColor: 'rgba(250,100,100,0.7)',
		flexWrap: 'wrap',
		zIndex: 0,
	},
	paymentText: {
		fontSize: 26,
		fontWeight: 'bold',
		color: 'rgba(255,255,255,1)',
		textShadowColor: '#000',
		textShadowOffset: {
			width: 0,
			height: 1,
		},
		textShadowRadius: 1,
		marginVertical: 10,
		zIndex: 0,
	},
});
