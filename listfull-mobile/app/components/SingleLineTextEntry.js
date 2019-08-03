import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const SingleLineTextEntry = props => {
	return (
		<TextInput
			style = {textEntryStyles.text_box}
			value = {props.value}
			placeholder = {props.placeholder} 
			onChangeText = {props.onChangeValue}
			autoFocus = {props.focus}
			keyboardType = {props.keyboardType}
			secureTextEntry = {props.secureTextEntry}
		/>
	);
}

const textEntryStyles = StyleSheet.create({
	text_box: {
		borderBottomColor: 'lightgray',
		borderBottomWidth: 2,
		fontSize: 20,
		height: 50,
		paddingLeft: 15,
		margin: 5,
	},
});

SingleLineTextEntry.propTypes = {
	value: PropTypes.string,
	placeholder: PropTypes.string,
	onChangeValue: PropTypes.func,
	focus: PropTypes.bool,
	keyboardType: PropTypes.string,
	secureTextEntry: PropTypes.bool,
}

export default SingleLineTextEntry

