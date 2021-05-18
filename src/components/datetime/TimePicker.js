import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomDateTimePicker = ({ time, setTime, type, isInputRecieved, setIsInputRecieved }) => {
	const [show, setShow] = useState(false);

	const onChange = (selectedDate) => {
		const { timestamp } = selectedDate.nativeEvent;
		const chosenTime = timestamp ? new Date(timestamp) : time;
		setShow(false);
		setIsInputRecieved(true);
		setTime(chosenTime);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => setShow(true)} style={styles.dateIconContainer}>
				<MaterialCommunityIcons
					name={type == 'from' ? 'clock-start' : 'clock-end'}
					size={30}
					color="rgba(0,0,0,0.5)"
					style={styles.dateIcon}
				/>
				{isInputRecieved ? (
					<Text style={styles.text}>{moment(time).format('HH:mm')}</Text>
				) : (
					<Text style={styles.placeholder}>{type == 'from' ? 'שעת התחלה' : 'שעת סיום'}</Text>
				)}
			</TouchableOpacity>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={time}
					mode="time"
					is24Hour={true}
					display="spinner"
					onChange={onChange}
				/>
			)}
		</View>
	);
};

export default CustomDateTimePicker;

const styles = StyleSheet.create({
	container: {
		marginTop: 15,
	},
	dateIconContainer: {
		alignItems: 'center',
		flexDirection: 'row-reverse',
	},
	dateIcon: {
		justifyContent: 'center',
		marginLeft: 15,
	},
	text: {
		color: 'rgba(0,0,0,0.5)',
		fontSize: 14,
	},
	placeholder: {
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
	},
});
