import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const SaveAndCloseButton = props => {
	const saveBttn = () => {
		return(
			<TouchableOpacity onPress = {props.onSave} style = {bttnStyles.save}>
				<Text style = {bttnStyles.saveText}>
					{"Save"}
				</Text>
			</TouchableOpacity>
		);
	}

	const closeBttn = () => {
		return(
			<TouchableOpacity onPress = {props.onClose} style = {bttnStyles.close}>
				<Text style = {bttnStyles.closeText}>
					{"Close"}
				</Text>
			</TouchableOpacity>
		);
	}

	return (
		<View style = {bttnStyles.container}>
			{props.enabled && saveBttn()}
			{!props.enabled && closeBttn()}
		</View>

	);

}

SaveAndCloseButton.propTypes = {
	enabled: PropTypes.bool,
	onSave: PropTypes.func,
	onClose: PropTypes.func,
}

const bttnStyles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		paddingHorizontal: 5,
		paddingVertical: 5,
	},
	close: {
		paddingVertical: 10,
		paddingVertical: 5,
		borderRadius: 5,
		backgroundColor: 'lightgray',
	},
	save: {
		paddingVertical: 10,
		paddingVertical: 5,
		borderRadius: 5,
		backgroundColor: 'dodgerblue',
	},
	closeText: {
		color: "gray",
		fontSize: 16,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	saveText: {
		color: "white",
		fontSize: 16,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
})

export default SaveAndCloseButton;

