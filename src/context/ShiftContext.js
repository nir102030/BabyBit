import createDataContext from './createDataContext';
import moment from 'moment';
import { getShiftsDb, addShiftDb, editShiftDb, deleteShiftDb } from '../api/shiftsApi';

const shiftReducer = (state, action) => {
	switch (action.type) {
		case 'addShift':
			return {
				...state,
				shifts: [...state.shifts, action.payload.shift],
				payments: { ...state.payments, totalPayment: state.payments.totalPayment + action.payload.payment },
			};
		case 'removeShift':
			return {
				...state,
				shifts: action.payload.shifts,
				payments: { ...state.payments, totalPayment: state.payments.totalPayment - action.payload.payment },
			};
		case 'setPaidShifts':
			return {
				...state,
				shifts: action.payload.shifts,
				payments: {
					totalPayment: state.payments.totalPayment - action.payload.paied,
					totalPaied: state.payments.totalPaied + action.payload.paied,
				},
			};
		case 'getAllShifts':
			return { ...state, shifts: action.payload.shifts, payments: action.payload.payments };
		default:
			return state;
	}
};

//add a shift to the local state and to the db
const addShift = (dispatch) => async (group, shifts, shift) => {
	//calcuate the new shift id (accroding to the number of shifts in this group)
	const shiftId =
		shifts.length > 0
			? Math.max.apply(
					Math,
					shifts.map((shift) => shift.id)
			  ) + 1
			: 1;

	//calcualte the total hours of the shift
	const totalHours = (moment(shift.to).diff(moment(shift.from), 'minutes') / 60).toFixed(2);

	//calcualte the payment needed for this shift
	const payment = totalHours * group.hourlyPayment;

	//create the new shift object
	const newShift = {
		...shift,
		id: shiftId,
		totalHours: totalHours,
		payment: payment,
		paied: 0,
		groupId: group.id,
	};

	//add the shift to db
	addShiftDb(newShift);

	//add the shift to the shifts state
	dispatch({
		type: 'addShift',
		payload: { shift: newShift, payment: payment },
	});
};

// delete a shift from the local state and from the db
const removeShift = (dispatch) => (shifts, shiftToRemove) => {
	const updatedShifts = shifts.filter((shift) => shift.id !== shiftToRemove.id);
	deleteShiftDb(shiftToRemove.id, shiftToRemove.groupId); //delete the shift from db

	dispatch({
		type: 'removeShift',
		payload: { shifts: updatedShifts, payment: shiftToRemove.payment },
	});
};

//calcualte which shifts was paid in this payment round and update their state
const setPaidShifts = (dispatch) => (shifts, paied) => {
	//the money paied in this payment
	let totalAmountToPay = paied;

	//the shifts still have some amount of money to pay
	const shiftsToPay = shifts.filter((shift) => shift.payment - shift.paied > 0);

	//all the shifts are already fully paid in older payment rounds
	const shiftsAlreadyFullyPaied = shifts.filter((shift) => shift.paied == shift.payment);

	//"pay" for the shifts that not paied yet, according to the total amount received in this payment
	const paidShifts = shiftsToPay.map((shift) => {
		//the shift amount of money still not paied
		const amountLeftToPay = shift.payment - shift.paied;

		//if there is still money left in this payment round, perform the payment
		if (totalAmountToPay > 0) {
			//the actual amount that can be paied for this shift
			const amountCanPay = totalAmountToPay >= amountLeftToPay ? amountLeftToPay : totalAmountToPay;

			//subtract the amount paied from the total payment amount
			totalAmountToPay = totalAmountToPay - amountCanPay;

			//edit the shift in db
			editShiftDb({ ...shift, paied: shift.paied + amountCanPay });

			return { ...shift, paied: shift.paied + amountCanPay }; //return the updated shift
		} else return shift; //else return the original shift
	});

	const updatedShifts = [...shiftsAlreadyFullyPaied, ...paidShifts];

	dispatch({
		type: 'setPaidShifts',
		payload: { shifts: updatedShifts, paied: paied },
	});
};

//get all shifts from db and insert them into the local state
const getAllShifts = (dispatch) => async (groupId) => {
	const dbShifts = await getShiftsDb(groupId);
	let totalPayment = 0;
	let totalPaied = 0;

	dbShifts.forEach((shift) => {
		//calcualte the total payment left to pay in this group
		const leftToPay = shift.payment - shift.paied;
		if (leftToPay > 0) totalPayment = totalPayment + leftToPay;

		//calcualte the total payment that was already fully paid in this group
		totalPaied = totalPaied + shift.paied;
	});

	//add all the payments details to the payment state
	const payments = { totalPayment: totalPayment, totalPaied: totalPaied };

	dispatch({
		type: 'getAllShifts',
		payload: { shifts: dbShifts, payments: payments },
	});
};

export const { Provider, Context } = createDataContext(
	shiftReducer,
	{ addShift, removeShift, setPaidShifts, getAllShifts },
	{
		shifts: [],
		payments: { totalPayment: 0, totalPaied: 0 },
	}
);
