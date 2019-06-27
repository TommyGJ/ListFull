import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import DashBoardStack from './DashBoardStack.js'

const AppTabs = createBottomTabNavigator(
	{
		Dashboard: DashBoardStack
	},
);

export default AppTabs;


