import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Button } from 'react-native'

const ErrorBox = props => {

	if (props.isError) {
		return (
			<View style = {{alignItems: 'center'}}>
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
				<Text key = {key} style = {{color: 'gray'}}> 
					{ key + ' ' + data.toLowerCase() }
				</Text>
			);
	}))));
}

export default ErrorBox;



