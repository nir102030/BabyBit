import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

const CustomModal = ({ modal, children, onSubmit }) => {
	const { visible, hideModal, submitButtonText } = modal;
	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={visible}
				onRequestClose={() => {
					hideModal();
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Pressable style={styles.closeIconContainer} onPress={() => hideModal()}>
							<Icon name="close" type="fontisto" size={20} style={styles.closeIcon} />
						</Pressable>
						<View style={styles.children}>{children}</View>
						<Pressable
							style={styles.button}
							onPress={() => {
								hideModal();
								onSubmit();
							}}
						>
							<Text style={styles.textStyle}>{submitButtonText}</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	closeIconContainer: {
		width: Dimensions.get('window').width,
		alignItems: 'flex-end',
		flex: 1,
	},

	closeIcon: {
		marginRight: 20,
	},

	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5,
		marginBottom: 5,
	},

	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		borderWidth: 1,
		padding: 10,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		height: 400,
		backgroundColor: '#d1dbeb',
		borderColor: 'lightgrey',
	},

	children: {
		flex: 6,
		alignSelf: 'stretch',
	},

	button: {
		borderRadius: 5,
		width: 330,
		height: 40,
		borderWidth: 1,
		borderColor: 'lightgrey',
		textAlign: 'center',
		justifyContent: 'center',
		marginTop: 20,
		flex: 1,
		backgroundColor: '#2196F3',
	},

	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

export default CustomModal;

// import React, { useState } from 'react';
// import { Modal, StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
// import { Icon } from 'react-native-elements';

// const CustomModal = ({ children, onSubmit, submitButtonText, openModalButtonText }) => {
// 	const [modalVisible, setModalVisible] = useState(false);

// 	return (
// 		<View style={styles.centeredView}>
// 			<Modal
// 				animationType="slide"
// 				transparent={true}
// 				visible={modalVisible}
// 				onRequestClose={() => {
// 					setModalVisible(!modalVisible);
// 				}}
// 			>
// 				<View style={styles.centeredView}>
// 					<View style={styles.modalView}>
// 						<Pressable style={styles.closeIconContainer} onPress={() => setModalVisible(!modalVisible)}>
// 							<Icon name="close" type="fontisto" size={20} style={styles.closeIcon} />
// 						</Pressable>
// 						{children}
// 						<Pressable
// 							style={[styles.button, styles.buttonClose]}
// 							onPress={() => {
// 								setModalVisible(!modalVisible);
// 								onSubmit();
// 							}}
// 						>
// 							<Text style={styles.textStyle}>{submitButtonText}</Text>
// 						</Pressable>
// 					</View>
// 				</View>
// 			</Modal>
// 			<Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
// 				<Text style={styles.textStyle}>{openModalButtonText}</Text>
// 			</Pressable>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	closeIconContainer: {
// 		width: Dimensions.get('window').width,
// 		alignItems: 'flex-end',
// 	},

// 	closeIcon: {
// 		marginRight: 20,
// 	},

// 	centeredView: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		marginTop: 5,
// 		marginBottom: 5,
// 	},

// 	modalView: {
// 		margin: 20,
// 		backgroundColor: 'white',
// 		borderRadius: 20,
// 		borderWidth: 1,
// 		padding: 10,
// 		alignItems: 'center',
// 		shadowColor: '#000',
// 		shadowOffset: {
// 			width: 0,
// 			height: 2,
// 		},
// 		shadowOpacity: 0.25,
// 		shadowRadius: 4,
// 		elevation: 5,
// 		height: 400,
// 		backgroundColor: '#d1dbeb',
// 		borderColor: 'lightgrey',
// 	},
// 	button: {
// 		borderRadius: 5,
// 		width: 330,
// 		height: 40,
// 		borderWidth: 1,
// 		borderColor: 'lightgrey',
// 		textAlign: 'center',
// 		justifyContent: 'center',
// 		marginTop: 20,
// 		flex: 0.5,
// 	},
// 	buttonOpen: {
// 		backgroundColor: '#2196F3',
// 	},
// 	buttonClose: {
// 		backgroundColor: '#2196F3',
// 	},

// 	textStyle: {
// 		color: 'white',
// 		fontWeight: 'bold',
// 		textAlign: 'center',
// 	},
// });

// export default CustomModal;
