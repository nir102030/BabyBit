import React from 'react';
import { Dimensions, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const options = (navigation, userImg) => {
	return {
		headerTitle: headerTitle,
		headerTitleStyle: styles.headerTitle,
		headerTitleContainerStyle: styles.headerTitleContainer,
		headerLeft: () => headerLeft(navigation, userImg),
	};
};

const headerLeft = (navigation, userImg) => {
	return (
		<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
			<Image source={{ uri: userImg }} style={styles.userImg} />
		</TouchableOpacity>
	);
};

export const profileScreenOptions = () => {
	return {
		headerTitle: headerTitle,
		headerTitleStyle: styles.headerTitle,
		headerTitleContainerStyle: styles.headerTitleContainer,
	};
};

export const headerTitle = () => {
	return (
		<View style={styles.headerTitleView}>
			<MaterialCommunityIcons name="baby-face" size={30} color="pink" />
			<Text style={styles.titleText}>BabyBit</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	headerTitle: {
		flex: 1,
		alignSelf: 'center',
	},
	headerTitleContainer: {
		left: 0,
		zIndex: 1,
	},
	userImg: {
		height: 40,
		width: 40,
		borderRadius: 30,
		marginLeft: 15,
	},
	headerTitleView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: Dimensions.get('window').width,
	},
	titleText: {
		marginStart: 10,
		fontSize: 25,
		color: 'rgba(200,0,200,1)',
		fontWeight: 'bold',
	},
});
