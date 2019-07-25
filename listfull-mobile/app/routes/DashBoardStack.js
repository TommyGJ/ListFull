import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import DashBoardScreen from './../screens/DashBoardScreen.js';
import ListViewScreen from './../screens/ListViewScreen.js';
import ViewCollaboratorsScreen from './../screens/ViewCollaboratorsScreen.js';
import ListSettingsScreen from './../screens/ListSettingsScreen.js';
import AddBulletModal from './../screens/AddBulletModal.js';

const MainDashBoardStack = createStackNavigator(
	{
		DashBoard: DashBoardScreen,
		ListView: ListViewScreen,
		Collaborators: ViewCollaboratorsScreen,
		ListSettings: ListSettingsScreen,
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

const DashBoardStack = createStackNavigator(
	{
		Main: {
			screen: MainDashBoardStack,
		},
		AddBullet: {
			screen: AddBulletModal,
		},
	},
	{
		mode: 'modal',
		headerMode: 'none',
	}
);

export default DashBoardStack

