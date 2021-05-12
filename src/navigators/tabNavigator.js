import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PaidShiftsScreen from '../screens/PaidShiftsScreen';
import GroupScreen from '../screens/GroupScreen';
import HomeScreen from '../screens/HomeScreen';
import { MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const tabBarScreenOptions = ({ route }) => ({
	tabBarIcon: ({ color, size }) => {
		if (route.name == 'הקבוצה שלי') return <FontAwesome name="group" size={size} color={color} />;
		if (route.name == 'משמרות ששולמו') return <MaterialIcons name="payment" size={size} color={color} />;
		if (route.name == 'משמרות פתוחות')
			return <MaterialCommunityIcons name="baby-bottle-outline" size={size} color={color} />;
	},
});

export const tabNavigator = () => {
	return (
		<Tab.Navigator initialRouteName="משמרות פתוחות" screenOptions={tabBarScreenOptions}>
			<Tab.Screen name="הקבוצה שלי" component={GroupScreen} />
			<Tab.Screen name="משמרות ששולמו" component={PaidShiftsScreen} />
			<Tab.Screen name="משמרות פתוחות" component={HomeScreen} />
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({});
