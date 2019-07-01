import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Button } from 'react-native'

const ErrorBox = props => {

	if (props.isError) {
		return (
			<View style = {styles.errorBox}>
				<ErrorMessage messages = {props.messages}  />
			</View>
			
		);
	} else {
		return null;
	}
}

const ErrorMessage = props => {
		console.log(props.messages);
		return (props.messages.map(block => Object.keys(block).map(key => block[key].map(data => {
			return(
				<Text key = {key} style = {styles.errorText}> 
					{ key + ' ' + data.toLowerCase() }
				</Text>
			);

	}))));
	
	

}

export default ErrorBox;

styles = StyleSheet.create({
	errorBox: {
		alignItems: 'center',
	},
	errorText: {
		color: 'red',
	}

});


