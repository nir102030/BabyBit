import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { Context as GroupContext } from '../context/GroupContext';
import { Context as AuthContext } from '../context/AuthContext';

const useGroupDetail = (key, validation, notification) => {
	const { state, editGroup } = useContext(GroupContext);
	const group = state.group;
	const [detail, setDetail] = useState({ editMode: false, value: group[key], validation: validation });

	const user = useContext(AuthContext).state.user;

	const handleEditClick = () => {
		if (detail.editMode) handleEdit();
		else setDetail({ ...detail, editMode: true });
	};

	const onChange = (value) => {
		setDetail({ ...detail, value: value });
	};

	const handleEdit = () => {
		if (!detail.value) {
			Alert.alert('', 'לא ניתן להזין ערך ריק. אנא הוסף ערכים ונסה שוב.', [{ text: 'הבנתי' }]);
		} else {
			// let isValid = fieldName == 'תשלום שעתי' ? /^\d+$/.test(fieldValue) : true;
			const validation = detail.validation(detail.value);
			if (validation.result == 'success') {
				const editedGroup = { ...group, [key]: detail.value };
				setDetail({ ...detail, editMode: false });
				if (group[key] != detail.value) notification(user, editedGroup, group[key]);
				editGroup(editedGroup);
			} else {
				//Alert.alert('', 'התשלום השעתי חייב להכיל ספרות בלבד', [{ text: 'הבנתי' }]);
				Alert.alert('', validation.errMsg, [{ text: 'הבנתי' }]);
			}
		}
	};

	return [detail, onChange, handleEditClick];
};

export default useGroupDetail;
