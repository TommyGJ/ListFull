import React from 'react'
import { View, Text } from 'react-native'
import {AsyncStorage} from 'react-native';
import { decode_jwt } from '../utils/Decode.js'
import axios from 'axios'
import API from './../utils/API.js'
import * as SecureStore from 'expo-secure-store';




export default class SettingsScreen extends React.Component {
	static navigationOptions = {
		 title: "Settings"
	};

	render() {
		return (
			<View>

			</View>
		);
	}
}

