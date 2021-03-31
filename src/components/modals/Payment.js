import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Input, Button } from 'react-native-elements';

const Payment = ({ totalPayment, payment, setPayment }) => {
	const [paymentMode, setPaymentMode] = useState('');

	return totalPayment > 0 ? (
		<>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>הוספת תשלום</Text>
				<Text>סה"כ לתשלום: {totalPayment}</Text>
			</View>
			<View style={styles.paymentMethodContainer}>
				<Text style={styles.paymentMethodTitle}>בחר צורת תשלום</Text>
				<View style={styles.paymentMethod}>
					<Button
						title="כל הסכום"
						onPress={() => {
							setPaymentMode('full');
							setPayment(totalPayment);
						}}
					/>
					<Button
						title="חלק מהסכום"
						onPress={() => {
							setPaymentMode('partial');
							setPayment('0');
						}}
					/>
				</View>
				<View style={styles.payment}>
					{paymentMode === 'partial' ? (
						<Input placeholder="הזן סכום לתשלום" onChangeText={(input) => setPayment(parseInt(input))} />
					) : null}
				</View>
				<Text style={styles.toPay}>לתשלום: {payment} שקלים</Text>
			</View>
		</>
	) : (
		<View style={styles.messageContainer}>
			<Text style={styles.message}>לעת לעתה, החשבון ביניכם סגור :)</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		flex: 1,
	},

	title: {
		fontWeight: 'bold',
		fontSize: 20,
	},

	paymentMethodContainer: {
		//marginTop: 15,
		alignItems: 'center',
		flex: 4,
	},

	paymentMethodTitle: {
		marginTop: 10,
		fontSize: 16,
		fontWeight: 'bold',
		flex: 0.5,
	},

	paymentMethod: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		//marginVertical: 10,
		width: Dimensions.get('window').width * 0.5,
		flex: 1,
	},

	payment: {
		//marginTop: 20,
		flex: 1,
		width: Dimensions.get('window').width * 0.6,
		justifyContent: 'center',
		alignItems: 'center',
	},

	toPay: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'red',
		flex: 0.5,
	},

	messageContainer: {
		flex: 1,
		justifyContent: 'center',
	},

	message: {
		fontSize: 24,
		textAlign: 'center',
		fontWeight: 'bold',
	},
});

export default Payment;
