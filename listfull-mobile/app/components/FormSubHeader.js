import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';

const FormSubHeader = props => {
	return (
		<Text style = {formSubHeaderStyles.header}>
			{props.text}
		</Text>
	);
}


FormSubHeader.propTypes = {
	text: PropTypes.string,
}

const formSubHeaderStyles = StyleSheet.create({
	header: {
		fontSize: 20,
		color: 'dimgray',
		alignSelf: 'flex-start',
		paddingLeft: 20,

	},
});

export default FormSubHeader;

