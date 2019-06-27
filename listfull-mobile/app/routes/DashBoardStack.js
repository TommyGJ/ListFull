import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import DashBoardScreen from './../screens/DashBoardScreen.js'

const DashBoardStack = createStackNavigator(
	{
		DashBoard: DashBoardScreen,
	},
	{
		initialRouteName: "DashBoard",
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

export default DashBoardStack

