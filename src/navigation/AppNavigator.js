import React, { useContext, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const AppNavigator = () => {
	const { state, tryLocalSignin } = useContext(AuthContext);
	const groupContext = useContext(GroupContext);
	const { getGroup, setLoading } = groupContext;
	const groupState = groupContext.state;

	useEffect(() => {
		const initiateParams = async () => {
			const user = await tryLocalSignin();
			if (user) {
				getGroup(user.groupId);
			} else {
				setLoading(false);
			}
		};
		initiateParams();
	}, []);

	const Stack = createStackNavigator();
	const Drawer = createDrawerNavigator();

	const headerTitle = () => {
		return (
			<View>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'row',
						width: Dimensions.get('window').width,
					}}
				>
					<MaterialCommunityIcons name="baby-face" size={30} color="pink" />
					<Text style={{ marginStart: 10, fontSize: 25, color: 'rgba(200,0,200,1)', fontWeight: 'bold' }}>
						BabyBit
					</Text>
				</View>
			</View>
		);
	};

	const headerRight = () => {
		return (
			<Image
				source={{ uri: state.user.image }}
				style={{
					height: 40,
					width: 40,
					borderRadius: 30,
					marginEnd: 15,
				}}
			/>
		);
	};

	const options = ({ navigation }) => {
		return {
			headerTitle: headerTitle,
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
			headerRight: headerRight,
		};
	};

	const loginStack = () => {
		return (
			<Stack.Navigator headerMode="screen">
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{
						headerTitle: headerTitle,
						headerTitleStyle: { flex: 1, alignSelf: 'center' },
						headerTitleContainerStyle: { left: 0, zIndex: 1 },
					}}
				/>
				<Stack.Screen
					name="Signup"
					component={SignupScreen}
					options={{
						headerTitle: headerTitle,
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

	return state.loading || groupState.loading ? (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<ActivityIndicator size="large" color="pink" />
		</View>
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
							headerTitle: headerTitle,
							headerTitleStyle: { flex: 1, alignSelf: 'center' },
							headerTitleContainerStyle: { left: 0, zIndex: 1 },
							headerRight: headerRight,
						}}
					/>
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};

export default AppNavigator;
