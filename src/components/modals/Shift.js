import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';

const Shift = ({ shift, setShift }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>הוספת משמרת</Text>
			<View style={styles.pickers}>
				<DatePicker
					date={shift.date}
					setDate={(date) => {
						setShift({ ...shift, date: date });
					}}
				/>
				<TimePicker
					time={shift.from}
					setTime={(time) => {
						setShift({ ...shift, from: time });
					}}
				/>
				<TimePicker
					time={shift.to}
					setTime={(time) => {
						setShift({ ...shift, to: time });
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	title: {
		fontWeight: 'bold',
		fontSize: 24,
		alignSelf: 'center',
	},
	pickers: {
		flex: 1,
		left: 50,
	},
});

export default Shift;
