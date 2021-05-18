import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ShiftList from '../components/shifts/ShiftList';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as ShiftContext } from '../context/ShiftContext';
import { Context as GroupContext } from '../context/GroupContext';
import NewShift from '../components/shifts/NewShift';
import NewPaymentCard from '../components/payments/NewPaymentCard';
import AddPaymentButton from '../components/payments/AddPaymentButton';
import BabyIcon from '../assets/BabyIcon';
import UserGuide from '../components/general/UserGuide';
import useShift from '../hooks/useShift';
import usePayment from '../hooks/usePayment';

const HomeScreen = () => {
	const scrollViewRef = useRef();
	const [userGuideVisible, setUserGuideVisible] = useState(false);
	const [isScrolledToEnd, setIsScrolledToEnd] = useState(true);
	const [isPaymentOpened, setIsPaymentOpened] = useState(false);
	const authContext = useContext(AuthContext);
	const { user } = authContext.state;
	const { editUser } = authContext;
	const { group } = useContext(GroupContext).state;
	const { getAllShifts, state } = useContext(ShiftContext);
	const { shifts, payments } = state;
	const [shift, setShift, validateShift, handleShiftSubmission, handleShiftRemoval] = useShift(user);
	const [payment, setPayment, validatePayment, handlePaymentSubmission] = usePayment(user);

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

	// show user guide for new users
	useEffect(() => {
		if (user.new) {
			setUserGuideVisible(true);
			editUser({ ...user, new: false });
		}
	}, []);

	return (
		<View style={styles.container}>
			<BabyIcon style={styles.babyIcon} />
			<ScrollView contentContainerStyle={styles.scrollView} ref={scrollViewRef}>
				{userGuideVisible ? (
					<UserGuide
						userType={user.type}
						userGuideVisible={userGuideVisible}
						setUserGuideVisible={setUserGuideVisible}
					/>
				) : null}
				<ShiftList
					shifts={shifts.filter((shift) => shift.paied < shift.payment || shift.marked)}
					handleShiftRemoval={handleShiftRemoval}
				/>
				<NewShift
					shift={shift}
					setShift={setShift}
					onSubmit={handleShiftSubmission}
					validateShift={validateShift}
					setIsScrolledToEnd={setIsScrolledToEnd}
				/>
			</ScrollView>
			<View style={[styles.totalPaymentView, { flexDirection: isPaymentOpened ? 'column' : 'row' }]}>
				{user.type == 'parent' ? (
					isPaymentOpened ? (
						<NewPaymentCard
							payment={payment}
							setPayment={setPayment}
							onSubmit={handlePaymentSubmission}
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
