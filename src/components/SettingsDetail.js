import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
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
			alert(`חובה להזין ${fieldName}`);
		} else {
			let isValid = fieldName == 'תשלום שעתי' ? /^\d+$/.test(fieldValue) : true;
			if (isValid) {
				setEditMode(false);
				editGroup(fieldValue);
			} else {
				alert('התשלום השעתי חייב להכיל ספרות בלבד');
			}
		}
	};

	return (
		<View style={styles.groupDetailView}>
			<Text style={styles.fieldName}>{fieldName}:</Text>
			{editMode ? (
				<TextInput
					placeholder={`הזן ${fieldName}`}
					value={fieldValue}
					onChangeText={setFieldValue}
					style={[styles.fieldValue, { backgroundColor: 'rgba(0,0,0,0.05)' }]}
				/>
			) : (
				<Text style={styles.fieldValue}>{fieldValue}</Text>
			)}
			{userType == 'parent' ? (
				<Icon name="edit" type="material" size={20} style={styles.editIcon} onPress={() => handleEditClick()} />
			) : null}
		</View>
	);
};

export default SettingsDetail;

const styles = StyleSheet.create({
	groupDetailView: {
		flexDirection: 'row',
		marginHorizontal: Dimensions.get('window').width * 0.15,
		alignItems: 'center',
		marginVertical: 10,
		borderBottomWidth: 0.5,
		paddingVertical: 10,
		borderColor: 'rgba(0,0,0,0.4)',
	},
	fieldName: {
		flex: 4,
		fontWeight: 'bold',
		fontSize: 17,
	},
	fieldValue: {
		flex: 4,
		fontSize: 17,
		marginHorizontal: 5,
		textAlign: 'center',
	},
	editIcon: {
		flex: 1,
	},
});