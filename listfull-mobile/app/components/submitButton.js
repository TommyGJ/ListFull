import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const MyButton = props => {
	return (
		<TouchableOpacity style = {buttonStyles.container}>
			<Text style = {buttonStyles.textStyle} >
				{props.text}
			</Text>
		</TouchableOpacity>
	);
}

MyButton.propTypes = {
	text: PropTypes.string,
	submit: PropTypes.func,
}

const buttonStyles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
		paddingTop: 5,
		paddingBottom: 5,
		backgroundColor: 'dodgerblue',
		justifyContent: 'center',
		alignItems: 'center',
	},
	textStyle: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
	}
});

export default MyButton;


