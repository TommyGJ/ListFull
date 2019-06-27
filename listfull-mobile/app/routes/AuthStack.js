import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './../screens/LoginScreen.js'
import SignUpScreen from './../screens/SignUpScreen.js'

const AuthStack = createStackNavigator(
	{
		Login: LoginScreen,
		SignUp: SignUpScreen,
	},
	{
		initialRouteName: "Login",
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

export default AuthStack;

