import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import { api } from '../api/appApi';

const groupReducer = (state, action) => {
	switch (action.type) {
		case 'addGroup':
			return { ...state, group: action.payload, err: null, loading: false };
		case 'addError':
			return { ...state, err: action.payload, loading: false };
		case 'setLoading':
			return { ...state, loading: action.payload };
		case 'clearError':
			return { ...state, err: null };
		default:
			return state;
	}
};

const addGroup = (dispatch) => async (group) => {
	try {
		const response = await api.post('/addGroup', group);
		dispatch({
			type: 'addGroup',
			payload: group,
		});
	} catch (err) {
		dispatch({
			type: 'addError',
			payload: 'משהו השתבש עם הוספת הקבוצה',
		});
	}
};

const editGroup = (dispatch) => async (group) => {
	try {
		await api.post('/editGroup', group);
		dispatch({
			type: 'addGroup',
			payload: group,
		});
	} catch (err) {
		dispatch({
			type: 'addError',
			payload: 'משהו השתבש בעדכון פרטי הקבוצה',
		});
	}
};

const getGroup = (dispatch) => async (groupId) => {
	try {
		const response = await api.get('/getGroup', { headers: { groupid: groupId } });
		console.log(response.data[0] + ' group was received from server on ' + new Date());
		dispatch({
			type: 'addGroup',
			payload: response.data[0],
		});
		return response.data[0];
	} catch (err) {
		dispatch({
			type: 'addError',
			payload: 'קוד הקבוצה שגוי. נסה קוד אחר',
		});
		return null;
	}
};

const clearError = (dispatch) => () => {
	dispatch({
		type: 'clearError',
	});
};

const setLoading = (dispatch) => () => {
	dispatch({
		type: 'setLoading',
		payload: false,
	});
};

export const { Provider, Context } = createDataContext(
	groupReducer,
	{ addGroup, editGroup, getGroup, setLoading },
	{
		group: null,
		err: null,
		loading: true,
	}
);
