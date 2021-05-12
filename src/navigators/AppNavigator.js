import React, { useContext, useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { loginStack } from './loginStack';
import { mainStack } from './mainStack';
import { joinGroupStack } from './joinGroupStack';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as GroupContext } from '../context/GroupContext';
import * as Notifications from 'expo-notifications';
import Loader from '../components/Loader';

const AppNavigator = () => {
	//auth state and actions
	const { state, tryLocalSignin } = useContext(AuthContext);

	//group state and actions
	const groupContext = useContext(GroupContext);
	const { getGroup } = groupContext;
	const groupState = groupContext.state;
	const setGroupLoading = groupContext.setLoading;

	//initiate notifications configuration
	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: true,
		}),
	});

	//notifications refs
	const notificationListener = useRef();
	const responseListener = useRef();

	//initiate the user and the group states
	const initiateParams = async () => {
		const user = await tryLocalSignin();
		if (user) {
			getGroup(user.groupId);
		} else {
			setGroupLoading(false);
		}
	};

	useEffect(() => {
		initiateParams();
	}, []);

	//initiate notifications listeners
	useEffect(() => {
		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {});

		//remove listeners on unmount
		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
		};
	}, []);

	const Stack = createStackNavigator();

	// if user or group are in loading state, render the loader
	return state.loading || groupState.loading ? (
		<Loader />
	) : (
		// else, show the render the app navigator
		<NavigationContainer>
			{
				// if there is no auth token, render the login stack
				!state.token
					? loginStack(Stack)
					: // else if there is a token and the user belongs to a group, render the main stack
					state.user.groupId && groupState.group
					? mainStack(Stack, state.user.image)
					: // else, render the join group stack
					  joinGroupStack(Stack)
			}
		</NavigationContainer>
	);
};

export default AppNavigator;
