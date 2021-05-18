import { api } from './appApi';

export const getShiftsDb = async (groupId) => {
	const response = await api.get('/getShifts', { headers: { groupId: groupId } });
	return response.data;
};

export const addShiftDb = async (shift) => {
	await api.post('/addShift', shift);
};

export const editShiftDb = async (shift) => {
	const response = await api.post('/editShift', shift);
	return response;
};

export const deleteShiftDb = async (id, groupId) => {
	await api.post('/deleteShift', { id: id, groupid: groupId });
};
