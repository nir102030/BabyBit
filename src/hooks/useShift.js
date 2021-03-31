import { useState, useEffect } from 'react';
import moment from 'moment';

const useShift = () => {
	const [shifts, setShifts] = useState([]);

	const addShift = (shift, addPayment) => {
		const shiftId =
			shifts.length > 0
				? Math.max.apply(
						Math,
						shifts.map((shift) => shift.id)
				  ) + 1
				: 1;
		const totalHours = moment(shift.to).diff(moment(shift.from), 'hours');
		const payment = totalHours * 40;
		setShifts([...shifts, { ...shift, id: shiftId, totalHours: totalHours, payment: payment, paied: 0 }]);
		addPayment(payment);
	};

	const removeShift = (shiftToRemove) => {
		const updatedShifts = shifts.filter((shift) => shift.id !== shiftToRemove.id);
		setShifts(updatedShifts);
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
				return { ...shift, paied: shift.paied + amountCanPay }; //return the updated shift
			} else return shift;
		});

		setShifts([...shiftsAlreadyFullyPaied, ...paiedShifts]);
	};

	const getShiftsFromDb = () => {
		const shifts = [];
		setShifts(shifts);
	};

	useEffect(() => {
		getShiftsFromDb();
	}, []);

	return [shifts, addShift, removeShift, setPaiedShifts];
};

export default useShift;
