import { useState, useEffect, useContext } from 'react';
import { Context as GroupContext } from '../context/GroupContext';

const usePayment = () => {
	const [paymentDetails, setPaymentDetails] = useState({ totalPayment: 0, totalPaied: 0 });

	const pay = (payment) => {
		const totalPayment = paymentDetails.totalPayment - payment;
		setPaymentDetails({
			totalPayment: totalPayment,
			totalPaied: paymentDetails.totalPaied + payment,
		});
	};

	const addPayment = (payment) => {
		const totalPayment = paymentDetails.totalPayment + payment;
		setPaymentDetails({ ...paymentDetails, totalPayment: totalPayment });
	};

	const removePayment = (payment) => {
		const totalPayment = paymentDetails.totalPayment - payment;
		setPaymentDetails({ ...paymentDetails, totalPayment: totalPayment });
	};

	return [paymentDetails, pay, addPayment, removePayment, setPaymentDetails];
};

export default usePayment;
