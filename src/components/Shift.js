import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import moment from 'moment';

const Shift = ({ shift, removeShift }) => {
	return (
		<View style={shift.paied == shift.payment ? { opacity: 0.3 } : null}>
			<Card>
				<View style={styles.headerContainer}>
					<Text style={styles.title}>{moment(shift.date).format('DD-MM-YYYY')}</Text>
					<Pressable
						style={styles.closeIconContainer}
						onPress={shift.paied != shift.payment ? () => removeShift(shift) : null}
					>
						<Icon name="close" type="fontisto" size={20} style={styles.closeIcon} />
					</Pressable>
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
		marginVertical: 10,
	},

	closeIconContainer: {
		flex: 1,
	},

	closeIcon: {
		marginRight: 10,
		opacity: 0.5,
	},

	title: {
		flex: 6,
		fontWeight: 'bold',
		fontSize: 16,
	},

	text: {
		fontSize: 16,
		marginTop: 5,
	},
});
