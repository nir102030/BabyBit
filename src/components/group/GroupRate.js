import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import useGroupDetail from '../../hooks/useGroupDetail';
import { sendGroupRateEditNotification } from '../../api/notificationsApi';

const GroupRate = ({ userType }) => {
	const validation = (value) => {
		return { result: /^\d+$/.test(value) ? 'success' : 'fuilure', errMsg: 'התשלום השעתי חייב להכיל ספרות בלבד' };
	};
	const [detail, onChange, handleEditClick] = useGroupDetail(
		'hourlyPayment',
		validation,
		sendGroupRateEditNotification
	);

	return (
		<Card containerStyle={styles.container}>
			<View style={styles.groupDetailView}>
				<Text style={styles.hourlyRateText}>תעריף שעתי</Text>
				{detail.editMode ? (
					<View style={styles.inputContainer}>
						<TextInput
							value={detail.value}
							onChangeText={onChange}
							style={styles.input}
							keyboardType="numeric"
						/>
						<Text style={styles.input}>{'\u20AA'}</Text>
					</View>
				) : (
					<View style={styles.textContainer}>
						<Text style={styles.input}>
							{detail.value} {'\u20AA'}
						</Text>
					</View>
				)}
				{userType == 'parent' ? (
					detail.editMode ? (
						<Icon
							name="check"
							type="material"
							color="green"
							size={20}
							style={styles.checkIcon}
							onPress={() => handleEditClick()}
						/>
					) : (
						<Icon
							name="edit"
							type="material"
							size={20}
							style={styles.editIcon}
							onPress={() => handleEditClick()}
						/>
					)
				) : null}
			</View>
		</Card>
	);
};

export default GroupRate;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 0,
	},
	groupDetailView: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
	},
	hourlyRateText: {
		fontSize: 18,
	},

	textContainer: {
		//flex: 4,
	},
	inputContainer: {
		//flex: 4,
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.05)',
	},
	input: {
		fontSize: 18,
		marginHorizontal: 5,
		textAlign: 'right',
		color: 'rgba(0,0,0,1)',
	},
	editIcon: {},
	checkIcon: {},
});
