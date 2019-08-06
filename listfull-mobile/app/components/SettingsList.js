import React from 'react'
import {Button, View, Text, ScrollView, StyleSheet, TouchableHighlight } from 'react-native'; 
import PropTypes from 'prop-types'; 
import FormSubHeader from './FormSubHeader.js';


const Section = props => {
	return (
		<View style = {settingsStyles.section}>
			<FormSubHeader
				text = {props.text} 
			/>
		</View>
	);

}
const Item = props => {
	return (
		<TouchableHighlight style = {settingsStyles.item} underlayColor = "lightgray" onPress={() => props.press(props.text)}>
			<Text style = {settingsStyles.itemText}>
				{props.text}
			</Text>
		</TouchableHighlight>
	);
}
const SettingsList = props => {
	return( 
		<ScrollView>
			<Section text = "Account" />
			<Item text = "Change Name" press = {props.open} />
			<Item text = "Change Email" press = {props.open} />
			<Item text = "Change Password" press = {props.open} />
			<Section text = "Current Session"  />
			<Item text = "Log Out" press = {props.logOut} />
		</ScrollView>
	);

}

SettingsList.propTypes = {
	open: PropTypes.func,
	logOut: PropTypes.func,
}

const settingsStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		flex: 1,
		backgroundColor: '#fff',
		paddingVertical: 10,
		paddingLeft: 30,
		justifyContent: 'center',
		alignItems: 'flex-start',

	},
	itemText: {
		color: 'gray',
		fontWeight: 'bold',
		fontSize: 16,
	},
	section: {
		flex: 1,
		justifyContent: 'center',
		paddingVertical: 10,
	},
});

export default SettingsList;

