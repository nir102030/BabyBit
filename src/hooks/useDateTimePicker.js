import moment from 'moment';
import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { Context as GroupContext } from '../context/GroupContext';
import { Context as AuthContext } from '../context/AuthContext';
import { sendEditedShiftDateNotification, sendEditedShiftTimeNotification } from '../api/notificationsApi';

const useDateTimePicker = (shift, editShift) => {
	const [picker, setPicker] = useState({ show: false });
	const { state } = useContext(GroupContext);
	const group = state.group;

	const user = useContext(AuthContext).state.user;

	// triggered after any picker is showed
	const handlePickerChange = (event) => {
		if (event.type == 'dismissed') setPicker({ show: false });
		else {
			const { timestamp } = event.nativeEvent;
			const chosenDate = timestamp ? new Date(timestamp) : shift.date;
			picker.onChange(chosenDate); // the onChange function determined by the picker type
		}
	};

	// handles date picker press
	const onDatePickerPress = () => {
		setPicker({
			show: true,
			mode: 'date',
			value: new Date(shift.date),
			onChange: onDateChange,
		});
	};

	// handles time picker press
	const onTimePickerPress = () => {
		setPicker({
			show: true,
			mode: 'time',
			value: new Date(shift.from),
			onChange: onFromTimeChange,
		});
	};

	// handles date change
	const onDateChange = (chosenDate) => {
		setPicker({ show: false }); //hide picker
		sendEditedShiftDateNotification(user, group, shift.date, chosenDate);
		editShift({ ...shift, date: chosenDate }, group);
	};

	// handles "from" time change
	const onFromTimeChange = (chosenFromTime) => {
		setPicker({
			show: true,
			mode: 'time',
			value: new Date(shift.to),
			onChange: (chosenToTime) => onToTimeChange(chosenFromTime, chosenToTime), //trigger the "to" time change handler
		});
	};

	// handles "to" time change
	const onToTimeChange = (chosenFromTime, chosenToTime) => {
		setPicker({ show: false }); //hide picker

		// if the shift end hour is after the start hour, show alert
		if (moment(chosenToTime).diff(moment(chosenFromTime), 'minutes') <= 0) {
			Alert.alert('', 'שעת הסיום של המשמרת חייבת להיות לאחר שעת ההתחלה', [{ text: 'הבנתי, תודה' }]);
		} else {
			const oldShiftTimeString = `${moment(shift.from).format('HH:mm')}-${moment(shift.to).format('HH:mm')}`;
			const newShiftTimeString = `${moment(chosenFromTime).format('HH:MM')}-${moment(chosenToTime).format(
				'HH:mm'
			)}`;
			sendEditedShiftTimeNotification(user, group, shift.date, oldShiftTimeString, newShiftTimeString);
			editShift({ ...shift, from: chosenFromTime, to: chosenToTime }, group);
		}
	};

	return [picker, onDatePickerPress, onTimePickerPress, handlePickerChange];
};

export default useDateTimePicker;
