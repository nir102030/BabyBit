import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { styles as appStyles } from '../../styles/styles';
import CustomModal from './CustomModal';
import { Picker } from '@react-native-picker/picker';

const ChooseUserTypeModal = ({ visible, setVisible, userType, setUserType }) => {
	return (
		<CustomModal isModalVisible={visible}>
			<View style={styles.pickerContainer}>
				<Text style={styles.text}>בחר סוג משתמש</Text>
				<Picker selectedValue={userType} onValueChange={setUserType}>
					<Picker.Item label="הורה" value="parent" color="rgba(0, 0, 0, 0.6)" />
					<Picker.Item label="בייביסיטר" value="caregiver" color="rgba(0, 0, 0, 0.6)" />
				</Picker>
				<Button
					title="המשך"
					onPress={() => setVisible(false)}
					buttonStyle={[appStyles.button, { marginTop: 10 }]}
				/>
			</View>
		</CustomModal>
	);
};

export default ChooseUserTypeModal;

const styles = StyleSheet.create({
	pickerContainer: {
		borderColor: 'rgba(0, 0, 0, 0.2)',
		borderRadius: 3,
		margin: 20,
	},
	text: {
		fontSize: 18,
		color: 'rgba(0, 0, 0, 0.7)',
		fontWeight: 'bold',
	},
});
