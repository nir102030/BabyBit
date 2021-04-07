import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import JoinGroupScreen from '../screens/JoinGroupScreen';
import { Icon } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as GroupContext } from '../context/GroupContext';
import { ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const options = ({ navigation }) => {
	return {
		title: 'בייבי-ביט',
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

const loginStack = () => {
	return (
		<Stack.Navigator headerMode="screen">
			<Stack.Screen
				name="Signup"
				component={SignupScreen}
				options={{
					title: 'בייבי-ביט',
					headerTitleStyle: { flex: 1, alignSelf: 'center' },
					headerTitleContainerStyle: { left: 0, zIndex: 1 },
				}}
			/>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: 'בייבי-ביט',
					headerTitleStyle: { flex: 1, alignSelf: 'center' },
					headerTitleContainerStyle: { left: 0, zIndex: 1 },
				}}
			/>
		</Stack.Navigator>
	);
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
	const { state, tryLocalSignin } = useContext(AuthContext);
	const groupContext = useContext(GroupContext);
	const { getGroup } = groupContext;
	const groupState = groupContext.state;

	//console.log(groupState);

	useEffect(() => {
		const initiateParams = async () => {
			const user = await tryLocalSignin();
			if (user.groupId) {
				getGroup(user.groupId);
			}
		};
		initiateParams();
	}, []);

	return state.loading ? (
		<ActivityIndicator size="large" style={{ flex: 1 }} />
	) : (
		<NavigationContainer>
			{!state.token ? (
				loginStack()
			) : state.user.groupId && groupState.group ? (
				<Drawer.Navigator initialRouteName="Home">
					<Drawer.Screen name="בית" component={HomeStack} />
					<Drawer.Screen name="הגדרות" component={SettingsStack} />
				</Drawer.Navigator>
			) : (
				<Stack.Navigator>
					<Stack.Screen
						name="Group"
						component={JoinGroupScreen}
						options={{
							title: 'בייבי-ביט',
							headerTitleStyle: { flex: 1, alignSelf: 'center' },
							headerTitleContainerStyle: { left: 0, zIndex: 1 },
						}}
					/>
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};

export default AppNavigator;
