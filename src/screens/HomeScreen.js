import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import ShiftList from '../components/ShiftList';
import Shift from '../components/modals/Shift';
import Payment from '../components/modals/Payment';
import CustomModal from '../components/modals/CustomModal';
import usePayment from '../hooks/usePayment';
import useShift from '../hooks/useShift';
import moment from 'moment';
import { Context as AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
	const { state } = useContext(AuthContext);
	const [shift, setShift] = useState({ date: new Date(), from: new Date(), to: new Date(), payment: 0, paied: 0 });
	const [payment, setPayment] = useState(0);
	const [paymentDetails, pay, addPayment, removePayment] = usePayment();
	const [shifts, addShift, removeShift, setPaiedShifts] = useShift(state.user.groupId, addPayment);
	const [modal, setModal] = useState({ visible: false });
	const [err, setErr] = useState('');

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
			submitButtonText: paymentDetails.totalPayment > 0 ? 'שלם' : 'מצוין :) ביי',
		});
	};

	const hideModal = () => {
		setModal({ visible: false });
	};

	const validation = () => {
		const paymentErr = validatePayment();
		const shiftErr = validateShift();

		if (paymentErr) setErr(paymentErr);
		else if (shiftErr) setErr(shiftErr);
		else setErr('');
	};

	const validatePayment = () => {
		return payment > paymentDetails.totalPayment
			? 'התשלום חייב להיות קטן או שווה לסכום הכולל שנותר לשלם, נא הזן סכום אחר'
			: null;
	};

	const validateShift = () => {
		const shiftHoursDiff = moment(shift.to).diff(moment(shift.from), 'hours');
		return shiftHoursDiff < 0 ? 'שעת הסיום של המשמרת חייבת להיות לאחר שעת ההתחלה' : null;
	};

	useEffect(() => {
		validation();
	});

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Overlay isVisible={err ? true : false}>
				<Text style={styles.errMsg}>{err}</Text>
				<Button
					title="הבנתי"
					onPress={() => {
						setPayment(0);
						setShift({ date: new Date(), from: new Date(), to: new Date(), payment: 0, paied: 0 });
					}}
				></Button>
			</Overlay>
			<ShiftList
				shifts={shifts}
				removeShift={(shift) => {
					removeShift(shift);
					removePayment(shift.payment);
				}}
			/>
			<Text style={styles.text}>סה"כ לתשלום: {paymentDetails.totalPayment}</Text>
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
						<Payment totalPayment={paymentDetails.totalPayment} payment={payment} setPayment={setPayment} />
					)
				}
				onSubmit={
					modal.type === 'shift'
						? () => addShift(shift, addPayment)
						: () => {
								pay(payment);
								setPaiedShifts(payment);
								setPayment(0);
						  }
				}
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
	},

	button: {
		backgroundColor: '#2196F3',
		width: Dimensions.get('window').width * 0.7,
	},

	errMsg: {
		margin: 10,
	},
});

// const calcualteTotalPayment = () => {
// 	let total = 0;
// 	shifts.forEach((shift) => {
// 		if (!shift.paied) total += shift.payment;
// 	});
// 	setTotalPayment(total - totalPaied);
// };

// 	console.log(paiedShifts);
// };

/////////////////////////////
// const HomeScreen = () => {
// 	const [shifts, setShifts] = useState([]);
// 	const [paymentDetails, setPaymentDetails] = useState({ totalPayment: 0, totalPaied: 0 });

// 	const [shift, setShift] = useState({ date: new Date(), from: new Date(), to: new Date() });
// 	const [payment, setPayment] = useState(0);

// 	const [modal, setModal] = useState({ visible: false });

// 	const createShift = () => {
// 		const shiftId = shifts.length + 1;
// 		const totalHours = moment(shift.to).diff(moment(shift.from), 'hours');
// 		const payment = totalHours * 40;
// 		const totalPayment = paymentDetails.totalPayment + payment;

// 		setShifts([...shifts, { ...shift, id: shiftId, totalHours: totalHours, payment: payment, paied: 0 }]);
// 		setPaymentDetails({ ...paymentDetails, totalPayment: totalPayment });
// 		setShift({ date: new Date(), from: new Date(), to: new Date() });
// 	};

// 	const updatePaymentDetails = () => {
// 		setPaymentDetails({
// 			totalPayment: paymentDetails.totalPayment - payment,
// 			totalPaied: paymentDetails.totalPaied + payment,
// 		});
// 		setPayment(0);
// 	};

// 	const showModal = (type) => {
// 		let onSubmit, submitButtonText;
// 		const onSubmit = type === 'shift' ? createShift : updatePaymentDetails;
// 		if (type === 'shift') {
// 			onSubmit = createShift;
// 			submitButtonText = 'הוסף';
// 		}
// 		if (type === 'payment') {
// 			onSubmit = updatePaymentDetails;
// 			submitButtonText = 'שלם';
// 		}

// 		setModal({
// 			type: type,
// 			visible: true,
// 			onSubmit: onSubmit,
// 			submitButtonText: submitButtonText,
// 		});
// 	};

// 	const hideModal = () => {
// 		setModal({ visible: false });
// 	};

// 	return (
// 		<ScrollView contentContainerStyle={styles.container}>
// 			<ShiftList shifts={shifts} />
// 			<Text style={styles.text}>סה"כ לתשלום: {paymentDetails.totalPayment}</Text>
// 			<Text style={styles.text}>שולם: {paymentDetails.totalPaied}</Text>
// 			<Button
// 				title="הוסף משמרת"
// 				containerStyle={styles.buttonContainer}
// 				buttonStyle={styles.button}
// 				onPress={() => showModal('shift')}
// 			/>
// 			<Button
// 				title="לתשלום"
// 				containerStyle={styles.buttonContainer}
// 				buttonStyle={styles.button}
// 				onPress={() => showModal('payment')}
// 			/>
// 			<CustomModal
// 				visible={modal.visible}
// 				hideModal={hideModal}
// 				children={
// 					modal.type === 'shift' ? (
// 						<CreateShift shift={shift} setShift={setShift} />
// 					) : (
// 						<CreatePayment
// 							totalPayment={paymentDetails.totalPayment}
// 							payment={payment}
// 							setPayment={setPayment}
// 						/>
// 					)
// 				}
// 				onSubmit={modal.onSubmit}
// 				submitButtonText={modal.submitButtonText}
// 			/>
// 		</ScrollView>
// 	);
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
// 	container: {},

// 	text: {
// 		flex: 1,
// 		marginTop: 10,
// 		marginHorizontal: 20,
// 		fontWeight: 'bold',
// 		fontSize: 18,
// 	},

// 	buttonContainer: {
// 		flex: 1,
// 		textAlign: 'center',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		// width: 330,
// 		// height: 40,
// 		marginTop: 20,
// 		borderWidth: 1,
// 		borderColor: 'lightgrey',
// 		borderRadius: 5,
// 		backgroundColor: '#2196F3',
// 	},

// 	button: {
// 		backgroundColor: '#2196F3',
// 	},
// });
