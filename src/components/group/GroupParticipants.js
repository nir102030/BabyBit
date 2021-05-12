import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { Fontisto, FontAwesome5 } from '@expo/vector-icons';
import ShareGroupButton from './ShareGroupButton';

const GroupParticipants = ({ participants, currentUser, group }) => {
	let sortedParticipants = [];
	participants.forEach((participant) => {
		if (participant.userName == currentUser.userName) sortedParticipants.unshift(participant);
		else sortedParticipants.push(participant);
	});

	//create a participant row for each of them
	const renderParticipants = () => {
		return sortedParticipants.map((user, index) => {
			return (
				<View key={index} style={styles.participant}>
					<View style={styles.userNameAndImageContainer}>
						<Image source={{ uri: user.image }} style={styles.userImg} />
						<Text style={styles.participantName}>
							{currentUser.userName == user.userName ? 'את/ה' : user.name}
						</Text>
					</View>
					{user.type == 'parent' ? (
						<Fontisto name="persons" size={22} color="rgba(0,50,150,0.7)" style={styles.userIcon} />
					) : (
						<FontAwesome5 name="baby" size={22} color="rgba(200,50,50,0.7)" style={styles.userIcon} />
					)}
				</View>
			);
		});
	};

	return (
		<Card containerStyle={styles.container}>
			<View style={styles.firstRow}>
				<Text style={styles.participantsNumText}>{participants.length} משתתפים</Text>
				<ShareGroupButton user={currentUser} group={group} />
			</View>
			{renderParticipants()}
		</Card>
	);
};

export default GroupParticipants;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 0,
	},
	firstRow: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	participantsNumText: {
		color: 'rgba(0,0,0,0.5)',
	},
	participant: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 10,
	},
	userNameAndImageContainer: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
	},
	userImg: {
		height: 30,
		width: 30,
		borderRadius: 30,
		marginRight: 10,
	},
	participantName: {
		marginRight: 20,
		fontSize: 16,
		//fontWeight: 'bold',
	},
	userIcon: {
		marginLeft: 20,
	},
});
