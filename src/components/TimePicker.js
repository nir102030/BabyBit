import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Icon } from 'react-native-elements';

const CustomDateTimePicker = ({ time, setTime }) => {
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		setShow(false);
		setTime(selectedDate ? selectedDate : time);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => setShow(true)} style={styles.dateIconContainer}>
				<Icon name="clock" type="fontisto" size={30} color="#900" style={styles.dateIcon} />
				<Text style={styles.text}>{moment(time).format('HH:mm')}</Text>
			</TouchableOpacity>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={time}
					mode="time"
					is24Hour={true}
					display="default"
					onChange={onChange}
				/>
			)}
		</View>
	);
};

export default CustomDateTimePicker;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	dateIconContainer: {
		flex: 2,
		alignItems: 'center',
		flexDirection: 'row',
	},
	dateIcon: {
		justifyContent: 'center',
		marginLeft: Dimensions.get('window').width * 0.3,
	},
	text: {
		fontWeight: 'bold',
		marginLeft: Dimensions.get('window').width * 0.1,
	},
});
