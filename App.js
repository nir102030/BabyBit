import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as GroupProvider } from './src/context/GroupContext';
import { Provider as ShiftProvider } from './src/context/ShiftContext';
import { I18nManager } from 'react-native';

I18nManager.allowRTL(false);

export default function App() {
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
