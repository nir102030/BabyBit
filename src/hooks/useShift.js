import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { sendNewShiftNotification, sendShiftRemvoalNotification } from '../api/notificationsApi';
import moment from 'moment';
import { Context as ShiftContext } from '../context/ShiftContext';
import { Context as GroupContext } from '../context/GroupContext';

const useShift = (user) => {
	const [shift, setShift] = useState({ date: new Date(), from: new Date(), to: new Date(), payment: 0, paied: 0 });
	const { addShift, removeShift, unmarkShift, state } = useContext(ShiftContext);
	const shifts = state.shifts;
	const { group } = useContext(GroupContext).state;

	// validation for the shift (hours) input
	const validateShift = () => {
		const shiftHoursDiff = moment(shift.to).diff(moment(shift.from), 'minutes'); // the shift end hour is after the start hour
		// const shiftIsOverlapping = checkOverlapping();
		const shiftIsOverlapping = false;
		if (shiftHoursDiff <= 0) return 'שעת הסיום של המשמרת חייבת להיות לאחר שעת ההתחלה';
		else if (shiftIsOverlapping) return 'קיימת כבר משמרת בטווח זמנים זה';
		else return null;
	};

	const checkOverlapping = () => {
		let isOverlapping = false;
		shifts.forEach((exsitingShift) => {
			const manipulatedStartTime = moment(shift.from).add(1, 'minutes');
			const manipulatedEndTime = moment(shift.to).subtract(1, 'minutes');
			const shiftStartTimeOverlapped = manipulatedStartTime.isBetween(exsitingShift.from, exsitingShift.to);
			const shiftEndTimeOverlapped = manipulatedEndTime.isBetween(exsitingShift.from, exsitingShift.to);
			if (shiftStartTimeOverlapped || shiftEndTimeOverlapped) isOverlapping = true;
		});

		return isOverlapping;
	};

	// the alert pops up when trying to delete a shift
	const handleShiftRemoval = (shift) => {
		Alert.alert(
			'',
			'האם אתה בטוח שברצונך להסיר משמרת זו?',
			[
				{ text: 'לא, בטל פעולה' },
				{
					text: 'כן, הסר משמרת',
					onPress: () => {
						removeShift(shifts, shift);
						sendShiftRemvoalNotification(user, shift, group);
					},
				},
			],
			{ cancelable: true }
		);
	};

	// unmark the shift 1 second after it was added and marked
	const unmarkAddedShift = (shiftId) => {
		setTimeout(() => unmarkShift(shiftId), 1);
	};

	// alert that pops up when a new shift is added
	const addShiftAlert = (shiftId) => {
		Alert.alert('', 'המשמרת נוספה לרשימת המשמרות הפתוחות', [
			{ text: 'מצוין, תודה!', onPress: () => unmarkAddedShift(shiftId) },
		]);
	};

	// triggered when a new shift is added
	const handleShiftSubmission = () => {
		// calcuate the new shift id (accroding to the number of shifts in this group)
		const shiftId =
			shifts.length > 0
				? Math.max.apply(
						Math,
						shifts.map((shift) => shift.id)
				  ) + 1
				: 1;

		// add the shift to the db and app state
		addShift(group, { ...shift, id: shiftId, marked: true }, user.name);

		// add alert to the user
		addShiftAlert(shiftId);

		// send notification to all the group participants
		sendNewShiftNotification(user, group);
	};

	return [shift, setShift, validateShift, handleShiftSubmission, handleShiftRemoval];
};

export default useShift;
