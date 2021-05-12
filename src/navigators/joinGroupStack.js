import React from 'react';
import JoinGroupScreen from '../screens/JoinGroupScreen';
import { profileScreenOptions } from './options';

export const joinGroupStack = (Stack) => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Group" component={JoinGroupScreen} options={profileScreenOptions} />
		</Stack.Navigator>
	);
};
