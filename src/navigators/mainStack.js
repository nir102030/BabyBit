import React from 'react';
import { tabNavigator } from './tabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import { options, profileScreenOptions } from './options';

export const mainStack = (Stack, userImg) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="tab"
				component={tabNavigator}
				options={({ navigation }) => options(navigation, userImg)}
			/>
			<Stack.Screen name="Profile" component={ProfileScreen} options={profileScreenOptions} />
		</Stack.Navigator>
	);
};
