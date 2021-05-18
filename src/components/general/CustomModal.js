import React from 'react';
import { Modal, View, StyleSheet, Dimensions } from 'react-native';

const CustomModal = ({ isModalVisible, children }) => {
	return (
		<View style={styles.centeredView}>
			<Modal visible={isModalVisible} transparent={true}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>{children}</View>
				</View>
			</Modal>
		</View>
	);
};

export default CustomModal;

const styles = StyleSheet.create({
	centeredView: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	modalView: {
		marginHorizontal: 10,
		backgroundColor: 'white',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});
