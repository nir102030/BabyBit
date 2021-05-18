import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Icon } from 'react-native-elements';

const DatePicker = ({ date, setDate, isInputRecieved, setIsInputRecieved }) => {
	const [show, setShow] = useState(false);

	const onChange = (selectedDate) => {
		const { timestamp } = selectedDate.nativeEvent;
		const chosenDate = timestamp ? new Date(timestamp) : date;
		setShow(false);
		setIsInputRecieved(true);
		setDate(chosenDate);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => setShow(true)} style={styles.dateIconContainer}>
				<Icon name="date" type="fontisto" size={30} color="rgba(0,0,0,0.5)" style={styles.dateIcon} />
				{isInputRecieved ? (
					<Text style={styles.text}>{moment(date).format('DD-MM-YYYY')}</Text>
				) : (
					<Text style={styles.placeholder}>תאריך המשמרת</Text>
				)}
			</TouchableOpacity>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode="date"
					is24Hour={true}
					display="default"
					onChange={onChange}
				/>
			)}
		</View>
	);
};

export default DatePicker;

const styles = StyleSheet.create({
	container: {},
	dateIconContainer: {
		alignItems: 'center',
		flexDirection: 'row-reverse',
	},
	dateIcon: {
		justifyContent: 'center',
		marginLeft: 15,
	},
	text: {
		fontSize: 14,
		color: 'rgba(0,0,0,0.5)',
	},
	placeholder: {
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
	},
});
