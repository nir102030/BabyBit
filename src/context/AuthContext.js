import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import { api } from '../api/appApi';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'signin':
			return { ...state, token: action.payload.token, user: action.payload.user, err: null, loading: false };
		case 'signout':
			return { ...state, token: null };
		case 'addError':
			return { ...state, err: action.payload, loading: false };
		case 'setLoading':
			return { ...state, loading: action.payload };
		case 'clearError':
			return { ...state, err: null };
		case 'editUser':
			return { ...state, user: action.payload };
		default:
			return state;
	}
};

const tryLocalSignin = (dispatch) => async () => {
	const token = await AsyncStorage.getItem('token');
	try {
		const response = await api.get('/', { headers: { token: token } });
		dispatch({
			type: 'signin',
			payload: { token: token, user: response.data },
		});
		return response.data;
	} catch (err) {
		dispatch({
			type: 'setLoading',
			payload: false,
		});
		return null;
	}
};

const signin = (dispatch) => async (userName, password) => {
	try {
		const response = await api.post('/signin', { userName, password });
		AsyncStorage.setItem('token', response.data.token);
		dispatch({
			type: 'signin',
			payload: { token: response.data.token, user: response.data.user },
		});
	} catch (err) {
		dispatch({
			type: 'addError',
			payload: 'User name or password are incorrect',
		});
	}
};

const signup = (dispatch) => async (userName, password, name, type, image) => {
	try {
		const token = await api.post('/signup', { userName, password, name, type, image });
		dispatch({
			type: 'clearError',
		});
		return token;
	} catch (err) {
		dispatch({
			type: 'addError',
			payload: 'Somthing went wrong with signup',
		});
		return null;
	}
};

const signout = (dispatch) => async () => {
	await AsyncStorage.removeItem('token');
	dispatch({
		type: 'signout',
	});
};

const clearError = (dispatch) => () => {
	dispatch({
		type: 'clearError',
	});
};

const editUser = (dispatch) => async (user) => {
	try {
		const response = await api.post('/editUser', { user });
		dispatch({
			type: 'editUser',
			payload: user,
		});
	} catch (err) {
		console.log(err);
	}
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ tryLocalSignin, signin, signup, signout, clearError, editUser },
	{
		token: null,
		err: null,
		loading: true,
		user: null,
	}
);
