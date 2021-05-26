import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
	button: {
		backgroundColor: 'rgba(200,0,0,0.4)',
		width: Dimensions.get('window').width * 0.7,
		marginHorizontal: 5,
		marginVertical: 7.5,
		borderRadius: 10,
	},
	input: {
		borderColor: 'rgba(0, 0, 0, 0.3)',
		borderRadius: 3,
		width: Dimensions.get('window').width * 0.7,
		fontSize: 18,
		textAlign: 'right',
	},

	error: {
		color: 'red',
		fontSize: 16,
		flex: 1,
	},
});
