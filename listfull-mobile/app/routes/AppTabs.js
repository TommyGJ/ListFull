import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import DashBoardStack from './DashBoardStack.js'
import SettingsStack from './SettingsStack.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const AppTabs = createBottomTabNavigator(
	{
		Dashboard: DashBoardStack,
		Settings: SettingsStack
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				let IconComponent;
				let iconName;
				if (routeName === 'Dashboard') {
					IconComponent = MaterialCommunityIcons;
					iconName = `view-dashboard${focused ? '' : '-outline'}`;
				} else if (routeName === 'Settings') {
					IconComponent = MaterialCommunityIcons;
					iconName = `settings${focused ? '' : '-outline'}`;
				}
				return <IconComponent name={iconName} size={40} color={tintColor} />; 
			},  
		}), 
		tabBarOptions: {
			showLabel: false,
			},  
		},  

);

export default AppTabs;

