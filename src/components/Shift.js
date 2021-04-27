import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';

const Shift = ({ shift, removeShift }) => {
	return (
		<View>
			<Card
				containerStyle={{
					borderColor: shift.paied == shift.payment ? 'green' : 'purple',
					borderRadius: 20,
				}}
			>
				<View style={styles.headerContainer}>
					<Text style={styles.title}>{moment(shift.date).format('DD-MM-YYYY')}</Text>
					{shift.paied != shift.payment ? (
						<TouchableOpacity
							style={styles.closeIconContainer}
							onPress={shift.paied != shift.payment ? () => removeShift(shift) : null}
						>
							<AntDesign name="delete" size={24} color="black" />
						</TouchableOpacity>
					) : null}
				</View>
				<Card.Divider />
				<Text style={styles.text}>
					משעה: {moment(shift.from).format('HH:mm')} עד שעה: {moment(shift.to).format('HH:mm')}
				</Text>
				<Text style={styles.text}>סה"כ {shift.totalHours} שעות</Text>
				<Text style={styles.text}>לתשלום - {shift.payment} ש"ח</Text>
				<Text style={styles.text}>שולם - {shift.paied} ש"ח</Text>
				{shift.paied == shift.payment ? (
					<Text style={{ alignSelf: 'center', color: 'green' }}>שולם</Text>
				) : null}
			</Card>
		</View>
	);
};

export default Shift;

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		marginVertical: 10,
	},
	closeIcon: {
		opacity: 0.5,
	},

	title: {
		fontWeight: 'bold',
		position: 'absolute',
		right: 0,
		left: 0,
		fontSize: 18,
		textAlign: 'center',
	},

	text: {
		fontSize: 16,
		marginTop: 10,
		fontWeight: 'bold',
	},
});
