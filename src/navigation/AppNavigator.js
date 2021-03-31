import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const options = ({ navigation }) => {
	return {
		title: 'בייביט',
		headerTitleStyle: { flex: 1, alignSelf: 'center' },
		headerTitleContainerStyle: { left: 0, zIndex: 1 },
		headerLeftContainerStyle: { marginHorizontal: 10, zIndex: 2 },
		headerLeft: () => (
			<Icon
				name="menu"
				type="material"
				size={30}
				style={{ marginLeft: 10 }}
				onPress={() => navigation.openDrawer()}
			/>
		),
	};
};

const HomeStack = () => {
	return (
		<Stack.Navigator headerMode="screen">
			<Stack.Screen name="Home" component={HomeScreen} options={options} />
		</Stack.Navigator>
	);
};

const SettingsStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Settings" component={SettingsScreen} options={options} />
		</Stack.Navigator>
	);
};

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen name="בית" component={HomeStack} />
				<Drawer.Screen name="הגדרות" component={SettingsStack} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
