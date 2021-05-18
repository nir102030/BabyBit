import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import moment from 'moment';
import { Fontisto, Entypo } from '@expo/vector-icons';
import { getDayOfWeekHeb } from '../../utils/dateUtils';
import BabyIcon from '../../assets/BabyIcon';
import DateTimePicker from '@react-native-community/datetimepicker';
import useDateTimePicker from '../../hooks/useDateTimePicker';
import { Context as ShiftContext } from '../../context/ShiftContext';

const Shift = ({ shift }) => {
	const { editShift } = useContext(ShiftContext);

	const [picker, onDatePickerPress, onTimePickerPress, handlePickerChange] = useDateTimePicker(shift, editShift);

	const imgHeight = Math.round(Dimensions.get('window').height * 0.09);
	const imgWidth = Math.round(Dimensions.get('window').width * 0.93);

	const cardContainerBorderColor =
		shift.paied == shift.payment ? 'green' : shift.paied > 0 ? 'orange' : 'rgb(200,50,50)';

	const wrapperStyle =
		shift.marked && shift.paied < shift.payment
			? { backgroundColor: 'rgba(200,50,50,0.3)', borderRadius: 20 }
			: shift.marked
			? { backgroundColor: 'rgba(50,200,50,0.3)', borderRadius: 20 }
			: null;

	const babyIconBackgroundColor = shift.paied == shift.payment ? 'rgba(50,200,50,0.3)' : 'rgba(200,100,100,0.3)';

	// the date and time of the current shift
	const renderDateTime = () => {
		return (
			<View style={styles.dateTimeContainer}>
				<TouchableOpacity style={styles.date} onPress={onDatePickerPress}>
					<Fontisto name="date" size={20} style={styles.dateTimeIcon} />
					<Text style={styles.dateTimeText}>
						יום {getDayOfWeekHeb(moment(shift.date).day())}, {moment(shift.date).format('DD-MM-YYYY')}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.time} onPress={onTimePickerPress}>
					<Fontisto name="clock" size={20} style={styles.dateTimeIcon} />
					<Text style={styles.dateTimeText}>
						{moment(shift.from).format('HH:mm')} - {moment(shift.to).format('HH:mm')}
					</Text>
				</TouchableOpacity>
			</View>
		);
	};

	// the total hours and total payment of the current shift
	const renderShiftSummary = () => {
		return (
			<View style={styles.shiftSummaryContainer}>
				<View style={styles.totalHours}>
					<Entypo name="time-slot" size={20} color="rgba(0,0,0,0.5)" style={styles.summaryIcons} />
					<Text style={styles.summaryText}>{shift.totalHours} שעות</Text>
				</View>
				<View style={styles.totalPayment}>
					<Fontisto name="money-symbol" size={20} color="rgba(0,0,0,0.5)" style={styles.summaryIcons} />
					<Text style={styles.summaryText}>
						{shift.paied}/{shift.payment} {'\u20AA'}
					</Text>
				</View>
			</View>
		);
	};

	const renderPaidText = () => {
		return shift.paied == shift.payment ? <Text style={styles.paidText}>שולם</Text> : null;
	};

	const renderBabyIcon = () => {
		return (
			<BabyIcon
				width={imgWidth}
				height={imgHeight}
				style={[styles.babyIcon, { backgroundColor: babyIconBackgroundColor }]}
			/>
		);
	};

	//datetime picker to be rendered on the front of the screen
	const renderDateTimePicker = () => {
		return (
			picker.show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={picker.value}
					mode={picker.mode}
					is24Hour={true}
					display={picker.mode == 'date' ? 'default' : 'spinner'}
					onChange={handlePickerChange}
				/>
			)
		);
	};

	return (
		<View>
			<Card
				containerStyle={[styles.cardContainer, { borderColor: cardContainerBorderColor }]}
				wrapperStyle={wrapperStyle}
			>
				{renderBabyIcon()}
				{renderDateTime()}
				<Card.Divider style={styles.divider} />
				{renderShiftSummary()}
				{renderPaidText()}
			</Card>
			{renderDateTimePicker()}
		</View>
	);
};

export default Shift;

const styles = StyleSheet.create({
	cardContainer: {
		borderRadius: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		padding: 0,
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		borderBottomWidth: 3,
	},
	babyIcon: {
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
	},
	dateTimeContainer: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-evenly',
		marginVertical: 10,
		flexWrap: 'wrap',
	},
	date: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
	},
	time: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		marginLeft: 20,
	},
	dateTimeIcon: {
		color: 'rgba(0,0,0,0.6)',
		marginLeft: 8,
	},
	dateTimeText: {
		fontWeight: 'bold',
		fontSize: 14,
		textAlign: 'center',
		color: 'rgba(0,0,0,0.6)',
	},
	divider: {
		marginBottom: 5,
	},
	shiftSummaryContainer: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-evenly',
		marginVertical: 5,
	},
	totalHours: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
	},
	totalPayment: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
	},
	summaryIcons: {
		marginLeft: 8,
	},
	summaryText: {
		fontSize: 14,
		fontWeight: 'bold',
		marginLeft: 10,
		textAlign: 'center',
		color: 'rgba(0,0,0,0.6)',
	},
	paidText: {
		alignSelf: 'center',
		color: 'green',
	},
});
