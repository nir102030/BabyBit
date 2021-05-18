import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { styles as appStyles } from '../../styles/styles';
import { Dimensions } from 'react-native';

const NewPayment = ({
	payment,
	setPayment,
	onSubmit,
	validatePayment,
	totalPayment,
	isPaymentOpened,
	setIsPaymentOpened,
}) => {
	const handleSubmit = () => {
		const err = validatePayment();
		if (err) Alert.alert('', err, [{ text: 'הבנתי' }]);
		else {
			Alert.alert('עדכון סטטוס תשלום', `האם את/ה מאשר/ת שבוצע תשלום על סה"כ ${payment} ש"ח?`, [
				{
					text: 'מאשר/ת',
					onPress: () => {
						setIsPaymentOpened(false);
						onSubmit();
					},
				},
				{ text: 'לא, בטל' },
			]);
		}
	};

	return (
		<Card containerStyle={styles.cardContainer} wrapperStyle={styles.cardWrapperStyle}>
			<TouchableOpacity
				onPress={() => {
					setIsPaymentOpened(!isPaymentOpened);
				}}
				style={styles.closeIcon}
			>
				<AntDesign name="minuscircleo" size={20} color="rgba(0,0,0,0.4)" />
			</TouchableOpacity>
			{totalPayment > 0 ? (
				<View style={styles.paymentContainer}>
					<TextInput
						placeholder="כמה שילמת?"
						value={payment}
						onChangeText={setPayment}
						style={[appStyles.input, styles.paymentInput]}
						keyboardType="numeric"
					/>
					<Text style={styles.currencyText}>{'\u20AA'}</Text>
					<TouchableOpacity onPress={handleSubmit} style={styles.addPaymentIcon}>
						<AntDesign name="checkcircle" size={24} color="rgba(0,200,0,0.5)" />
					</TouchableOpacity>
				</View>
			) : (
				<Text style={styles.closedBill}>לעת עתה, החשבון ביניכם סגור :)</Text>
			)}
		</Card>
	);
};

export default NewPayment;

const styles = StyleSheet.create({
	cardContainer: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		padding: 0,
		marginHorizontal: 0,
		width: Dimensions.get('window').width,
		marginTop: 0,
	},
	cardWrapperStyle: {
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 10,
		flexDirection: 'row-reverse',
	},
	paymentContainer: {
		flex: 1,
		flexDirection: 'row-reverse',
		justifyContent: 'space-around',
	},
	paymentInput: {
		width: Dimensions.get('window').width * 0.5,
		fontSize: 24,
	},
	currencyText: {
		fontSize: 20,
	},
	addPaymentIcon: {
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		width: 40,
	},
	closeIcon: {
		marginRight: 5,
		marginLeft: 20,
		width: 40,
		alignItems: 'flex-end',
	},
	closedBill: {
		fontSize: 18,
	},
});
