import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';

const Shift = ({ shift, setShift }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>הוספת משמרת</Text>
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
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},

	title: {
		fontWeight: 'bold',
		fontSize: 18,
		alignSelf: 'center',
	},
});

export default Shift;
