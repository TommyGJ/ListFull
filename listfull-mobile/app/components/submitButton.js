import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const SubmitButton = props => {

	const disabledBttn = () => {
		return (
			<TouchableOpacity style = {buttonStyles.disabledButton}>
				<Text style = {buttonStyles.text}>
					{props.name}
				</Text>
			</TouchableOpacity>
		);
	}

	const enabledBttn = () => {
		return (
			<TouchableOpacity onPress = {() => props.onSubmit()} style = {buttonStyles.enabledButton}>
				<Text style = {buttonStyles.text}>
					{props.name}
				</Text>
			</TouchableOpacity>
		);
	}

	return ( 
		<View style = {buttonStyles.container}>
			{props.enabled && enabledBttn()}
			{!props.enabled && disabledBttn()}
		</View>
	);
}

SubmitButton.propTypes = {
	name: PropTypes.string,
	enabled: PropTypes.bool,
	onSubmit: PropTypes.func,
}

const buttonStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	disabledButton: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		justifyContent: 'center',
		backgroundColor: 'dodgerblue',
		borderRadius: 5,
		opacity: 0.25,
	},
	enabledButton: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		justifyContent: 'center',
		backgroundColor: 'dodgerblue',
		borderRadius: 5,
	},

	text: {
		color: "white",
		fontSize: 22,
		fontWeight: 'bold',
	},
});

export default SubmitButton;


