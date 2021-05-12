import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from '../datetime/DatePicker';
import TimePicker from '../datetime/TimePicker';
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';

const NewShift = ({ shift, setShift, onSubmit, validateShift, setIsScrolledToEnd }) => {
	const [isShiftOpened, setIsShiftOpened] = useState(false);
	const [isInputRecieved, setIsInputRecieved] = useState({ date: false, from: false, to: false });

	const handleSubmit = () => {
		// if one the inputs wansn't received, throw an alert
		if (!isInputRecieved.date || !isInputRecieved.from || !isInputRecieved.to)
			Alert.alert('', 'חובה למלא תאריך, שעת התחלה ושעת סיום למשמרת', [{ text: 'הבנתי, תודה' }]);
		else {
			const err = validateShift();
			if (err) Alert.alert('', err, [{ text: 'הבנתי, תודה' }]);
			else {
				setIsShiftOpened(false);
				setIsInputRecieved({ date: false, from: false, to: false });
				onSubmit();
			}
		}
	};

	return (
		<View style={isShiftOpened ? styles.openShiftContainer : styles.closedShiftContainer}>
			{isShiftOpened ? (
				<Card containerStyle={styles.cardContainer} wrapperStyle={styles.cardWrapper}>
					<TouchableOpacity
						onPress={() => {
							setIsShiftOpened(false);
							setIsInputRecieved({ date: false, from: false, to: false });
							setIsScrolledToEnd(false);
						}}
						style={styles.minusIcon}
					>
						<AntDesign name="minuscircleo" size={22} color="rgba(0,0,0,0.4)" />
					</TouchableOpacity>
					<View style={styles.cardContent}>
						<View>
							<DatePicker
								date={shift.date}
								setDate={(date) => {
									setShift({ ...shift, date: date });
								}}
								isInputRecieved={isInputRecieved.date}
								setIsInputRecieved={(value) => setIsInputRecieved({ ...isInputRecieved, date: value })}
							/>
							<TimePicker
								time={shift.from}
								setTime={(time) => {
									setShift({ ...shift, from: time });
								}}
								type="from"
								isInputRecieved={isInputRecieved.from}
								setIsInputRecieved={(value) => setIsInputRecieved({ ...isInputRecieved, from: value })}
							/>
							<TimePicker
								time={shift.to}
								setTime={(time) => {
									setShift({ ...shift, to: time });
								}}
								type="to"
								isInputRecieved={isInputRecieved.to}
								setIsInputRecieved={(value) => setIsInputRecieved({ ...isInputRecieved, to: value })}
							/>
						</View>
						<TouchableOpacity onPress={handleSubmit} style={styles.addShiftIcon}>
							<MaterialIcons name="add-box" size={60} color="rgba(0,200,0,0.5)" />
						</TouchableOpacity>
					</View>
				</Card>
			) : (
				<TouchableOpacity
					onPress={() => {
						setIsShiftOpened(true);
						setIsInputRecieved({ date: false, from: false, to: false });
						setIsScrolledToEnd(false);
					}}
					style={styles.plusIcon}
				>
					<FontAwesome name="calendar-plus-o" size={45} color="rgba(250,100,100,0.8)" />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default NewShift;

const styles = StyleSheet.create({
	openShiftContainer: {},
	closedShiftContainer: {
		alignSelf: 'flex-end',
		marginTop: 25,
		marginBottom: 10,
		marginRight: 10,
	},
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
	},
	cardWrapper: {
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 10,
		flexDirection: 'row-reverse',
	},
	cardContent: {
		flex: 1,
		flexDirection: 'row-reverse',
		justifyContent: 'space-around',
	},
	addShiftIcon: {
		alignSelf: 'center',
	},
	minusIcon: {
		alignSelf: 'flex-start',
		marginLeft: 10,
		width: 30,
		height: 30,
		alignItems: 'flex-end',
	},
	plusIcon: {
		width: 60,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
