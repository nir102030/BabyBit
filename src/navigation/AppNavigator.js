import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, CommonActions, useNavigation } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import JoinGroupScreen from '../screens/JoinGroupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PaidShiftsScreen from '../screens/PaidShiftsScreen';
import GroupScreen from '../screens/GroupScreen';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as GroupContext } from '../context/GroupContext';
import { MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import * as Notifications from 'expo-notifications';

const AppNavigator = () => {
	const { state, tryLocalSignin } = useContext(AuthContext);
	const groupContext = useContext(GroupContext);
	const { getGroup, setLoading } = groupContext;
	const groupState = groupContext.state;

	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: true,
		}),
	});

	const notificationListener = useRef();
	const responseListener = useRef();

	const initiateParams = async () => {
		const user = await tryLocalSignin();
		if (user) {
			getGroup(user.groupId);
		} else {
			setLoading(false);
		}
	};

	useEffect(() => {
		initiateParams();
	}, []);

	useEffect(() => {
		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {});

		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log(response);
		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	const Stack = createStackNavigator();
	// const Drawer = createDrawerNavigator();
	const Tab = createBottomTabNavigator();

	const headerTitle = () => {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					width: Dimensions.get('window').width,
				}}
			>
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
				{/* <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 5 }}>משמרות פתוחות</Text> */}
			</View>
		);
	};

	const headerLeft = () => {
		const navigation = useNavigation();
		return (
			<TouchableOpacity onPress={() => navigation.dispatch(CommonActions.navigate('Profile'))}>
				<Image
					source={{ uri: state.user.image }}
					style={{
						height: 40,
						width: 40,
						borderRadius: 30,
						marginLeft: 15,
					}}
				/>
			</TouchableOpacity>
		);
	};

	const options = () => {
		return {
			headerTitle: headerTitle,
			headerTitleStyle: { flex: 1, alignSelf: 'center' },
			headerTitleContainerStyle: { left: 0, zIndex: 1 },
			headerLeft: headerLeft,
		};
	};

	const profileScreenOptions = () => {
		return {
			headerTitle: headerTitle,
			headerTitleStyle: { flex: 1, alignSelf: 'center' },
			headerTitleContainerStyle: { left: 0, zIndex: 1 },
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
				<Stack.Screen name="Profile" component={ProfileScreen} options={profileScreenOptions} />
			</Stack.Navigator>
		);
	};

	const PaidShiftsStack = () => {
		return (
			<Stack.Navigator headerMode="screen">
				<Stack.Screen name="Home" component={PaidShiftsScreen} options={options} />
				<Stack.Screen name="Profile" component={ProfileScreen} options={profileScreenOptions} />
			</Stack.Navigator>
		);
	};

	const SettingsStack = () => {
		return (
			<Stack.Navigator>
				<Stack.Screen name="Settings" component={GroupScreen} options={options} />
				<Stack.Screen name="Profile" component={ProfileScreen} options={profileScreenOptions} />
			</Stack.Navigator>
		);
	};

	const tabBarOptions = {
		tabStyle: {
			justifyContent: 'center',
			borderRightWidth: 0.5,
			borderRightColor: 'rgba(0,0,0,0.2)',
		},
		labelStyle: {
			fontSize: 14,
			fontWeight: 'bold',
		},
		// style: { position: 'absolute' },
	};

	const tabBarScreenOptions = ({ route }) => ({
		tabBarIcon: () => {
			if (route.name == 'הקבוצה שלי')
				return <FontAwesome name="group" size={24} color="blue" style={{ opacity: 0.5 }} />;
			if (route.name == 'משמרות ששולמו')
				return <MaterialIcons name="payment" size={24} color="green" style={{ opacity: 0.5 }} />;
			if (route.name == 'משמרות פתוחות')
				return (
					<MaterialCommunityIcons
						name="baby-bottle-outline"
						size={24}
						color="purple"
						style={{ opacity: 0.5 }}
					/>
				);
		},
	});

	return state.loading || groupState.loading ? (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<ActivityIndicator size="large" color="pink" />
		</View>
	) : (
		<NavigationContainer>
			{!state.token ? (
				loginStack()
			) : state.user.groupId && groupState.group ? (
				<Tab.Navigator
					initialRouteName="משמרות פתוחות"
					tabBarOptions={tabBarOptions}
					screenOptions={tabBarScreenOptions}
				>
					<Tab.Screen name="הקבוצה שלי" component={SettingsStack} />
					<Tab.Screen name="משמרות ששולמו" component={PaidShiftsStack} />
					<Tab.Screen name="משמרות פתוחות" component={HomeStack} />
				</Tab.Navigator>
			) : (
				<Stack.Navigator>
					<Stack.Screen
						name="Group"
						component={JoinGroupScreen}
						options={{
							headerTitle: headerTitle,
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
