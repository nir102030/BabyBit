import { useState, useEffect, useContext } from 'react';
import { Context as GroupContext } from '../context/GroupContext';

const usePayment = () => {
	const [paymentDetails, setPaymentDetails] = useState({ totalPayment: 0, totalPaied: 0 });
	const { state, editGroup } = useContext(GroupContext);

	const pay = (payment) => {
		const totalPayment = paymentDetails.totalPayment - payment;
		setPaymentDetails({
			totalPayment: totalPayment,
			totalPaied: paymentDetails.totalPaied + payment,
		});
		//editGroup({ ...state.group, totalPayment: totalPayment });
	};

	const addPayment = (payment) => {
		const totalPayment = paymentDetails.totalPayment + payment;
		setPaymentDetails({ ...paymentDetails, totalPayment: totalPayment });
		//editGroup({ ...state.group, totalPayment: totalPayment });
	};

	const removePayment = (payment) => {
		const totalPayment = paymentDetails.totalPayment - payment;
		setPaymentDetails({ ...paymentDetails, totalPayment: totalPayment });
		//editGroup({ ...state.group, totalPayment: totalPayment });
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
