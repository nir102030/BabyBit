import React, { useContext, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, CommonActions, useNavigation } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import JoinGroupScreen from '../screens/JoinGroupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PaidShiftsScreen from '../screens/PaidShiftsScreen';
import GroupScreen from '../screens/GroupScreen';
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

	const options = ({ navigation }) => {
		return {
			headerTitle: headerTitle,
			headerTitleStyle: { flex: 1, alignSelf: 'center' },
			headerTitleContainerStyle: { left: 0, zIndex: 1 },
			headerRightContainerStyle: { marginHorizontal: 10, zIndex: 2 },
			headerRight: () => (
				<Icon
					name="menu"
					type="material"
					size={30}
					style={{ marginLeft: 10 }}
					onPress={() => navigation.openDrawer()}
				/>
			),
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

	return state.loading || groupState.loading ? (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<ActivityIndicator size="large" color="pink" />
		</View>
	) : (
		<NavigationContainer>
			{!state.token ? (
				loginStack()
			) : state.user.groupId && groupState.group ? (
				<Drawer.Navigator initialRouteName="Home" drawerPosition="right">
					<Drawer.Screen name="משמרות פתוחות" component={HomeStack} />
					<Drawer.Screen name="משמרות ששולמו" component={PaidShiftsStack} />
					<Drawer.Screen name="הקבוצה שלי" component={SettingsStack} />
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
						}}
					/>
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};

export default AppNavigator;
