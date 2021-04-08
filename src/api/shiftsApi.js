import { api } from './appApi';

export const getShiftsDb = async (groupId) => {
	const response = await api.get('/getShifts', { headers: { groupId: groupId } });
	return response.data;
};

export const addShiftDb = async (shift) => {
	await api.post('/addShift', shift);
};

export const editShiftDb = async (shift) => {
	await api.post('/editShift', shift);
};

export const deleteShiftDb = async (id, groupId) => {
	await api.post('/deleteShift', { id: id, groupid: groupId });
};
