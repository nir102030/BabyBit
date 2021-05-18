import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import BabyIcon from '../../assets/BabyIcon';

const Loader = () => {
	return (
		<View style={{ flex: 1 }}>
			<BabyIcon style={styles.babyIcon} />
			<ActivityIndicator size="large" color="pink" style={styles.activityIndicator} />
		</View>
	);
};

export default Loader;

const styles = StyleSheet.create({
	activityIndicator: {
		marginTop: Dimensions.get('window').height * 0.1,
	},
	babyIcon: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 0.5,
		backgroundColor: 'rgba(200,0,0,0.1)',
	},
});
