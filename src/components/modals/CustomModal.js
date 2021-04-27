import React from 'react';
import { Modal, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const CustomModal = ({ modal, children, onSubmit, validation }) => {
	const { visible, hideModal, submitButtonText } = modal;
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={() => {
				hideModal();
			}}
		>
			<View style={styles.modalView}>
				<TouchableOpacity style={styles.closeIcon} onPress={() => hideModal()}>
					<AntDesign name="close" size={24} color="black" />
				</TouchableOpacity>
				<View style={styles.children}>{children}</View>
				<Button
					title={submitButtonText}
					containerStyle={styles.button}
					onPress={() => {
						const err = validation();
						if (err) alert(err);
						else {
							hideModal();
							onSubmit();
						}
					}}
				></Button>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalView: {
		height: Dimensions.get('window').height * 0.5,
		width: Dimensions.get('window').width * 0.8,
		position: 'absolute',
		top: Dimensions.get('window').height * 0.25,
		left: Dimensions.get('window').width * 0.1,
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'lightgrey',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

	closeIcon: {
		alignSelf: 'flex-end',
	},

	children: {
		flex: 6,
	},

	button: {
		flex: 1,
		alignSelf: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'lightgrey',
		width: Dimensions.get('window').width * 0.4,
		backgroundColor: '#2196F3',
	},
});

export default CustomModal;
