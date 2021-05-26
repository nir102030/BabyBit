import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Shift from './Shift';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { AntDesign } from '@expo/vector-icons';

const ShiftList = ({ shifts, handleShiftRemoval }) => {
	const renderRightActions = (shift) => {
		return (
			<TouchableOpacity style={styles.rightContent} onPress={() => handleShiftRemoval(shift)}>
				<AntDesign name="delete" size={40} color="rgba(255,255,255,0.8)" />
			</TouchableOpacity>
		);
	};

	const renderShifts = () => {
		return shifts.map((shift) => {
			return (
				<Swipeable
					key={shift.id}
					renderRightActions={shift.paied == 0 ? () => renderRightActions(shift) : null}
					overshootRight={false}
				>
					<Shift shift={shift} />
				</Swipeable>
			);
		});
	};

	return <View>{renderShifts()}</View>;
};

export default ShiftList;

const styles = StyleSheet.create({
	rightContent: {
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		width: Dimensions.get('window').width * 0.3,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 15,
		backgroundColor: 'rgba(200,0,0,0.8)',
	},
});
