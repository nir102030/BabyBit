import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
	button: {
		backgroundColor: '#2196F3',
		width: Dimensions.get('window').width * 0.7,
		margin: 5,
		borderRadius: 10,
	},
	input: {
		// borderBottomWidth: 1,
		borderColor: 'rgba(0, 0, 0, 0.3)',
		borderRadius: 3,
		width: Dimensions.get('window').width * 0.7,
		//margin: 10,
		// padding: 10,
		fontSize: 18,
		textAlign: 'right',
	},

	error: {
		color: 'red',
		fontSize: 16,
		flex: 1,
	},
});
