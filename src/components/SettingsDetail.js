import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

const SettingsDetail = ({ fieldName, initialFieldValue, editGroup, userType }) => {
	const [editMode, setEditMode] = useState(false);
	const [fieldValue, setFieldValue] = useState(initialFieldValue);

	const handleEditClick = () => {
		if (editMode) handleUserEdit();
		else setEditMode(true);
	};

	const handleUserEdit = () => {
		if (!fieldValue) {
			Alert.alert('', `חובה להזין ${fieldName}`, [{ text: 'הבנתי' }]);
		} else {
			let isValid = fieldName == 'תשלום שעתי' ? /^\d+$/.test(fieldValue) : true;
			if (isValid) {
				setEditMode(false);
				editGroup(fieldValue);
			} else {
				Alert.alert('', 'התשלום השעתי חייב להכיל ספרות בלבד', [{ text: 'הבנתי' }]);
			}
		}
	};

	return (
		<View style={styles.groupDetailView}>
			<Text style={styles.fieldName}>{fieldName}:</Text>
			{editMode ? (
				<TextInput
					value={fieldValue}
					onChangeText={setFieldValue}
					style={[styles.fieldValue, { backgroundColor: 'rgba(0,0,0,0.05)' }]}
				/>
			) : (
				<Text style={styles.fieldValue}>{fieldValue}</Text>
			)}
			{userType == 'parent' ? (
				editMode ? (
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

export default SettingsDetail;

const styles = StyleSheet.create({
	groupDetailView: {
		flexDirection: 'row-reverse',
		marginHorizontal: Dimensions.get('window').width * 0.05,
		alignItems: 'center',
		marginVertical: 10,
		borderBottomWidth: 0.5,
		paddingVertical: 10,
		borderColor: 'rgba(0,0,0,0.4)',
	},
	fieldName: {
		flex: 4,
		fontWeight: 'bold',
		fontSize: 20,
	},
	fieldValue: {
		flex: 4,
		fontSize: 20,
		marginHorizontal: 5,
		textAlign: 'center',
	},
	editIcon: {
		flex: 1,
	},
	checkIcon: {
		flex: 1,
		color: 'green',
	},
});
