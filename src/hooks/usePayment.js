import { useState, useEffect } from 'react';

const usePayment = () => {
	const [paymentDetails, setPaymentDetails] = useState({ totalPayment: 0, totalPaied: 0 });

	const pay = (payment) => {
		setPaymentDetails({
			totalPayment: paymentDetails.totalPayment - payment,
			totalPaied: paymentDetails.totalPaied + payment,
		});
	};

	const addPayment = (payment) => {
		setPaymentDetails({ ...paymentDetails, totalPayment: paymentDetails.totalPayment + payment });
	};

	const removePayment = (payment) => {
		setPaymentDetails({ ...paymentDetails, totalPayment: paymentDetails.totalPayment - payment });
	};

	const getPaymentDetailsFromDb = () => {
		const paymentDetailsFromDb = { totalPayment: 0, totalPaied: 0 };
		setPaymentDetails(paymentDetailsFromDb);
	};

	useEffect(() => {
		getPaymentDetailsFromDb();
	}, []);

	return [paymentDetails, pay, addPayment, removePayment];
};

export default usePayment;
