import React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import useGroupDetail from '../../hooks/useGroupDetail';
import { sendGroupNameEditNotification } from '../../api/notificationsApi';

const GroupName = ({ userType }) => {
	const validation = (value) => {
		return { result: value.length <= 25 ? 'success' : 'fuilure', errMsg: 'מספר התוים המקסימלי הוא 25' };
	};
	const [detail, onChange, handleEditClick] = useGroupDetail('name', validation, sendGroupNameEditNotification);

	const handleInputChange = (value) => {
		return value.length <= 25 ? onChange(value) : null;
	};

	return (
		<View style={styles.groupDetailView}>
			{detail.editMode ? (
				<View style={styles.inputContainer}>
					<TextInput value={detail.value} onChangeText={handleInputChange} style={styles.input} />
					<Text style={styles.inputLength}>{25 - detail.value.length}</Text>
				</View>
			) : (
				<View style={styles.textContainer}>
					<Text style={styles.input}>{detail.value}</Text>
				</View>
			)}
			{userType == 'parent' ? (
				detail.editMode ? (
					<Icon
						name="check"
						type="material"
						color="green"
						size={30}
						style={styles.checkIcon}
						onPress={() => handleEditClick()}
					/>
				) : (
					<Icon
						name="edit"
						type="material"
						size={30}
						style={styles.editIcon}
						onPress={() => handleEditClick()}
					/>
				)
			) : null}
		</View>
	);
};

export default GroupName;

const styles = StyleSheet.create({
	groupDetailView: {
		flexDirection: 'row-reverse',
		marginHorizontal: Dimensions.get('window').width * 0.01,
		alignItems: 'center',
		marginTop: Dimensions.get('window').height * 0.15,
		paddingVertical: 10,
	},
	textContainer: {
		flex: 4,
	},
	inputContainer: {
		flex: 4,
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.05)',
	},
	inputLength: {
		marginLeft: 10,
		color: 'rgba(0,0,0,0.4)',
	},
	input: {
		fontSize: 28,
		marginHorizontal: 5,
		textAlign: 'right',
		color: 'rgba(255,255,255,1)',
		textShadowColor: '#000',
		textShadowOffset: {
			width: 0,
			height: 1,
		},
		//textShadowOpacity: 0.41,
		textShadowRadius: 1,
	},
	editIcon: {
		flex: 1,
	},
	checkIcon: {
		flex: 1,
		color: 'green',
	},
});
