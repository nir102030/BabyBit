import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as GroupProvider } from './src/context/GroupContext';

export default function App() {
	return (
		<AuthProvider>
			<GroupProvider>
				<AppNavigator />
			</GroupProvider>
		</AuthProvider>
	);
}
