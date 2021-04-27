import React, { useEffect, useContext, useRef } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import ShiftList from '../components/ShiftList';
import { Context as ShiftsContext } from '../context/ShiftContext';

const PaidShiftsScreen = () => {
	const scrollViewRef = useRef();
	const { state } = useContext(ShiftsContext);
	const shifts = state.shifts;
	const payments = state.payments;

	useEffect(() => {
		scrollViewRef.current.scrollToEnd({ animated: true });
	});

	return (
		<ScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
			<ShiftList shifts={shifts.filter((shift) => shift.paied == shift.payment)} />
			<Text style={styles.paidText}>סה"כ שולם: {payments.totalPaied}</Text>
		</ScrollView>
	);
};

export default PaidShiftsScreen;

const styles = StyleSheet.create({
	paidText: {
		fontSize: 24,
		flex: 1,
		marginTop: 20,
		marginBottom: 20,
		marginHorizontal: 20,
		fontWeight: 'bold',
	},
});
