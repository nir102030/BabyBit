import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import AppNavigator from './src/navigators/AppNavigator';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as GroupProvider } from './src/context/GroupContext';
import { Provider as ShiftProvider } from './src/context/ShiftContext';
import { I18nManager, LogBox } from 'react-native';
import { Restart } from 'fiction-expo-restart';

LogBox.ignoreLogs(['Cannot update a component from inside the function body of a different component.']);

export default function App() {
	useEffect(() => {
		if (I18nManager.isRTL) {
			I18nManager.allowRTL(false);
			I18nManager.forceRTL(false);
			Restart();
		}
	}, []);

	return (
		<AuthProvider>
			<GroupProvider>
				<ShiftProvider>
					<AppNavigator />
				</ShiftProvider>
			</GroupProvider>
		</AuthProvider>
	);
}
