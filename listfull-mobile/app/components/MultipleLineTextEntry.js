import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

const MultipleLineTextEntry = props => {
	return (
		<TextInput
			style = {textEntryStyles.multipleLineBox}
			maxLength={100}
			multiline={true}
			value = {props.value}
			placeholder = {props.placeholder} 
			onChangeText = {props.onChangeValue}
			blurOnSubmit={true}
		/>
	);
}

const textEntryStyles = StyleSheet.create({
	multipleLineBox: {
		borderColor: 'lightgray',
		borderBottomWidth: 2,
		borderTopWidth: 2,
		fontSize: 16,
		height: 100,
		paddingLeft: 15,
		margin: 5,
	},
});

MultipleLineTextEntry.propTypes = {
	value: PropTypes.string,
	placeholder: PropTypes.string,
	onChangeValue: PropTypes.func,
}

export default MultipleLineTextEntry

