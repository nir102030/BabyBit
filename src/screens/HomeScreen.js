import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import ShiftList from '../components/ShiftList';
import Shift from '../components/modals/Shift';
import Payment from '../components/modals/Payment';
import CustomModal from '../components/modals/CustomModal';
import moment from 'moment';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as ShiftsContext } from '../context/ShiftContext';
import { Context as GroupContext } from '../context/GroupContext';

const HomeScreen = () => {
	const scrollViewRef = useRef();

	//the user state
	const { state } = useContext(AuthContext);

	//the state of the shift and payment to be created
	const [shift, setShift] = useState({ date: new Date(), from: new Date(), to: new Date(), payment: 0, paied: 0 });
	const [payment, setPayment] = useState(0);

	//the modal state - visible/not visible, shift modal/payment modal
	const [modal, setModal] = useState({ visible: false });

	//group state
	const group = useContext(GroupContext).state.group;

	//shifts and payments state and methods
	const shiftsContext = useContext(ShiftsContext);
	const shifts = shiftsContext.state.shifts;
	const payments = shiftsContext.state.payments;
	const { addShift, removeShift, setPaidShifts, getAllShifts } = shiftsContext;

	const showShiftModal = () => {
		setModal({
			type: 'shift',
			visible: true,
			hideModal: hideModal,
			submitButtonText: 'שגר',
		});
	};

	const showPaymentModal = () => {
		setModal({
			type: 'payment',
			visible: true,
			hideModal: hideModal,
			submitButtonText: payments.totalPayment > 0 ? 'שלם' : 'מצוין :) ביי',
		});
	};

	const hideModal = () => {
		setModal({ visible: false });
	};

	//vlidate the shifts and payment inputs (in the modals)
	const validation = () => {
		const paymentErr = validatePayment();
		const shiftErr = validateShift();

		if (paymentErr) return paymentErr;
		else if (shiftErr) return shiftErr;
		else return null;
	};

	const validatePayment = () => {
		return payment > payments.totalPayment
			? 'התשלום חייב להיות קטן או שווה לסכום הכולל שנותר לשלם, נא הזן סכום אחר'
			: !/^\d+$/.test(payment)
			? 'נא הזן ספרות בלבד'
			: null;
	};

	const validateShift = () => {
		const shiftHoursDiff = moment(shift.to).diff(moment(shift.from), 'hours');
		return shiftHoursDiff < 0 ? 'שעת הסיום של המשמרת חייבת להיות לאחר שעת ההתחלה' : null;
	};

	//the alert pops up when trying to delete a shift
	const removeShiftAlert = (shift) => {
		Alert.alert(
			'היי',
			'האם אתה בטוח שברצונך להסיר משמרת זו?',
			[
				{
					text: 'כן, הסר משמרת',
					onPress: () => {
						removeShift(shifts, shift);
					},
				},
				{ text: 'לא, בטל פעולה' },
			],
			{ cancelable: true }
		);
	};

	//submit handler for the shift and payment submission
	const onModalSubmit = () => {
		if (modal.type == 'shift') addShift(group, shifts, shift);
		else {
			setPaidShifts(shifts, payment);
			setPayment(0);
		}
	};

	useEffect(() => {
		validation();
		scrollViewRef.current.scrollToEnd({ animated: true });
	});

	useEffect(() => {
		getAllShifts(group.id);
	}, []);

	return (
		<ScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
			<ShiftList shifts={shifts.filter((shift) => shift.paied < shift.payment)} removeShift={removeShiftAlert} />
			<Text style={styles.paymentText}>סה"כ לתשלום: {payments.totalPayment}</Text>
			<View style={styles.buttonsView}>
				<Button
					title="הוסף משמרת"
					containerStyle={styles.buttonContainer}
					buttonStyle={styles.button}
					onPress={() => showShiftModal()}
				/>
				{state.user.type === 'parent' ? (
					<Button
						title="לתשלום"
						containerStyle={styles.buttonContainer}
						buttonStyle={styles.button}
						onPress={() => showPaymentModal()}
					/>
				) : null}
			</View>
			<CustomModal
				modal={modal}
				children={
					modal.type === 'shift' ? (
						<Shift shift={shift} setShift={setShift} />
					) : (
						<Payment totalPayment={payments.totalPayment} payment={payment} setPayment={setPayment} />
					)
				}
				onSubmit={onModalSubmit}
				validation={validation}
			/>
		</ScrollView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {},

	text: {
		flex: 1,
		marginTop: 10,
		marginHorizontal: 20,
		fontWeight: 'bold',
		fontSize: 18,
	},

	buttonsView: {
		flex: 1,
		alignItems: 'center',
		marginBottom: 20,
	},

	buttonContainer: {
		flex: 1,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: Dimensions.get('window').width * 0.7,
		marginTop: 20,
		borderWidth: 1,
		borderColor: 'lightgrey',
		borderRadius: 5,
		backgroundColor: '#2196F3',
		borderRadius: 10,
	},

	button: {
		backgroundColor: '#2196F3',
		width: Dimensions.get('window').width * 0.7,
		borderRadius: 10,
	},
	paymentText: {
		fontSize: 24,
		flex: 1,
		marginTop: 10,
		marginHorizontal: 20,
		fontWeight: 'bold',
	},
});
