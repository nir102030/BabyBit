import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import CustomModal from './CustomModal';
import Emoji from 'react-native-emoji';
import { styles as appStyles } from '../../styles/styles';

const WelcomeMsg = ({ welcomeMsgVisible, setWelcomeMsgVisible }) => {
	return (
		<CustomModal isModalVisible={welcomeMsgVisible}>
			<View style={{ alignItems: 'center' }}>
				<View style={styles.welcomTextContainer}>
					<Text style={styles.welcomeText}>ברוכים הבאים לבייבי-ביט</Text>
					<Emoji name="grinning" style={styles.emoji} />
				</View>
				<View style={styles.welcomTextContainer}>
					<Text style={styles.welcomInfoText}>
						פה תוכל/י ליצור לוח משמרות ותשלומים משותף להורים ולבייביסיטר, שיעשה לכם המון סדר!
					</Text>
					<Emoji name="baby" style={styles.emoji} />
				</View>
				<Button
					title="בואו נתחיל !"
					onPress={() => setWelcomeMsgVisible(false)}
					buttonStyle={[appStyles.button, { marginTop: 20 }]}
				/>
			</View>
		</CustomModal>
	);
};

export default WelcomeMsg;

const styles = StyleSheet.create({
	welcomTextContainer: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	welcomeText: {
		fontSize: 24,
		fontWeight: 'bold',
		marginLeft: 10,
		textAlign: 'center',
	},
	welcomInfoText: {
		fontSize: 24,
		textAlign: 'center',
		marginTop: 20,
		marginLeft: 10,
		flexWrap: 'wrap',
		flex: 1,
	},
	emoji: {
		fontSize: 40,
	},
});
