import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import CustomModal from './CustomModal';
import { styles as appStyles } from '../../styles/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const InfoMsg = ({ text, containerStyle, color }) => {
	const [visible, setVisible] = useState(false);
	console.log(visible);
	return (
		<View style={containerStyle}>
			<TouchableOpacity onPress={() => setVisible(!visible)}>
				<MaterialCommunityIcons name="information-outline" size={24} color={color} />
			</TouchableOpacity>
			{visible ? (
				<CustomModal isModalVisible={visible}>
					<View style={{ alignItems: 'center' }}>
						<View style={styles.textContainer}>
							<Text style={styles.text}>{text}</Text>
						</View>
						<Button
							title="הבנתי"
							onPress={() => setVisible(false)}
							buttonStyle={[appStyles.button, styles.button]}
						/>
					</View>
				</CustomModal>
			) : null}
		</View>
	);
};

export default InfoMsg;

const styles = StyleSheet.create({
	container: {
		marginLeft: 5,
	},
	textContainer: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	text: {
		fontSize: 18,
		textAlign: 'center',
		marginTop: 20,
		marginLeft: 10,
		flexWrap: 'wrap',
		flex: 1,
	},
	button: {
		marginVertical: 20,
	},
});
