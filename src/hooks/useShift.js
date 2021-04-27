import { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { getShiftsDb, addShiftDb, editShiftDb, deleteShiftDb } from '../api/shiftsApi';
import { Context as GroupContext } from '../context/GroupContext';

const useShift = (groupId, addPayment) => {
	const [shifts, setShifts] = useState([]);
	const { state } = useContext(GroupContext);

	const addShift = async (shift, addPayment) => {
		const shiftId =
			shifts.length > 0
				? Math.max.apply(
						Math,
						shifts.map((shift) => shift.id)
				  ) + 1
				: 1;
		const totalHours = moment(shift.to).diff(moment(shift.from), 'hours');
		const payment = totalHours * state.group.hourlyPayment;
		const newShift = {
			...shift,
			id: shiftId,
			totalHours: totalHours,
			payment: payment,
			paied: 0,
			groupId: groupId,
		};
		setShifts([...shifts, newShift]);
		addPayment(payment);
		addShiftDb(newShift); //add the shift to db
	};

	const removeShift = (shiftToRemove) => {
		const updatedShifts = shifts.filter((shift) => shift.id !== shiftToRemove.id);
		setShifts(updatedShifts);
		deleteShiftDb(shiftToRemove.id, shiftToRemove.groupId); //delete the shift from db}}])
	};

	const setPaiedShifts = (paied) => {
		let totalAmountToPay = paied; //the money paied in this payment
		const shiftsToPay = shifts.filter((shift) => shift.payment - shift.paied > 0); //the shifts still have some amount of money to pay
		const shiftsAlreadyFullyPaied = shifts.filter((shift) => shift.paied == shift.payment);
		//"pay" for the shifts that not paied yet, accotding to the total amount received in this payment
		const paiedShifts = shiftsToPay.map((shift) => {
			const amountLeftToPay = shift.payment - shift.paied; //the shift amount of money still not paied

			//if there is still money left in this payment round, perform the payment
			if (totalAmountToPay > 0) {
				const amountCanPay = totalAmountToPay >= amountLeftToPay ? amountLeftToPay : totalAmountToPay; //the actual amount that can be paied for this shift
				totalAmountToPay = totalAmountToPay - amountCanPay; //subtract the amount paied from the total payment amount
				editShiftDb({ ...shift, paied: shift.paied + amountCanPay }); //edit the shift in db
				return { ...shift, paied: shift.paied + amountCanPay }; //return the updated shift
			} else return shift;
		});
		setShifts([...shiftsAlreadyFullyPaied, ...paiedShifts]);
	};

	const getShiftsFromDb = async () => {
		const dbShifts = await getShiftsDb(groupId);
		let totalPayment = 0;
		dbShifts.forEach((shift) => {
			const leftToPay = shift.payment - shift.paied;
			if (leftToPay > 0) totalPayment = totalPayment + leftToPay;
		});
		addPayment(totalPayment);
		setShifts(dbShifts);
	};

	useEffect(() => {
		getShiftsFromDb();
	}, []);

	return [shifts, addShift, removeShift, setPaiedShifts];
};

export default useShift;
