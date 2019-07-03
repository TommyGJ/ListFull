import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import SettingsScreen from './../screens/SettingsScreen.js'

const SettingsStack = createStackNavigator(
	{
		Settings: SettingsScreen,
	},
	{
		initialRouteName: "Settings",
		cardStyle: {
			backgroundColor: '#E9EBEC',
		},

		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#2196f3',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		},
	}
);

export default SettingsStack

