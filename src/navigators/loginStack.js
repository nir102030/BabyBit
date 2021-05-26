import React from 'react';
import { StyleSheet } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { headerTitle } from './options';

export const loginStack = (Stack) => {
	return (
		<Stack.Navigator headerMode="screen">
			<Stack.Screen
				name="Welcome"
				component={WelcomeScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					headerTitle: headerTitle,
					headerTitleStyle: styles.headerTitleStyle,
					headerTitleContainerStyle: styles.headerTitleContainerStyle,
				}}
			/>
			<Stack.Screen
				name="Signup"
				component={SignupScreen}
				options={{
					headerTitle: headerTitle,
					headerTitleStyle: styles.headerTitleStyle,
					headerTitleContainerStyle: styles.headerTitleContainerStyle,
				}}
			/>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	headerTitleStyle: {
		flex: 1,
		alignSelf: 'center',
	},
	headerTitleContainerStyle: {
		left: 0,
		zIndex: 1,
	},
});
