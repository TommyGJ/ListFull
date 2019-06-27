import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import AuthStack from './AuthStack.js'
import AppTabs from './AppTabs.js'
import AuthLoadingScreen from './../screens/AuthLoadingScreen.js'

const AppNavigator = createSwitchNavigator(
	{
		Auth: AuthStack,
		App: AppTabs,
		AuthLoading: AuthLoadingScreen, 
	},
	{
		initialRouteName: "AuthLoading",
	}
);

export const AppContainer = createAppContainer(AppNavigator);


