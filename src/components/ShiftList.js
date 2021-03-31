import React from 'react';
import { View, Text } from 'react-native';
import Shift from './Shift';

const ShiftList = ({ shifts, removeShift }) => {
	const renderShifts = () => {
		return shifts.map((shift) => {
			return <Shift key={shift.id} shift={shift} removeShift={removeShift} />;
		});
	};

	return <View>{renderShifts()}</View>;
};

export default ShiftList;
