import React, { useEffect, useContext, useRef } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import ShiftList from '../components/shifts/ShiftList';
import { Context as ShiftsContext } from '../context/ShiftContext';
import BabyIcon from '../assets/BabyIcon';

const PaidShiftsScreen = () => {
	const scrollViewRef = useRef();
	const { state } = useContext(ShiftsContext);
	const shifts = state.shifts;
	const payments = state.payments;

	useEffect(() => {
		scrollViewRef.current.scrollToEnd({ animated: true });
	});

	return (
		<View style={styles.container}>
			<BabyIcon style={styles.babyIcon} />
			<ScrollView contentContainerStyle={styles.scrollView} ref={scrollViewRef}>
				<ShiftList shifts={shifts.filter((shift) => shift.paied == shift.payment)} />
			</ScrollView>
			<View style={styles.totalPaidView}>
				<Text style={styles.paidText}>
					סה"כ שולם: {payments.totalPaied} {'\u20AA'}
				</Text>
			</View>
		</View>
	);
};

export default PaidShiftsScreen;

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
		backgroundColor: 'rgba(100,200,100,0.7)',
	},
	scrollView: {
		paddingBottom: 15,
	},
	totalPaidView: {
		marginHorizontal: 0,
		alignItems: 'center',
		backgroundColor: 'rgba(100,200,100,0.7)',
	},
	paidText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'rgba(255,255,255,1)',
		textShadowColor: '#000',
		textShadowOffset: {
			width: 0,
			height: 1,
		},
		textShadowRadius: 1,
		marginVertical: 10,
	},
});
