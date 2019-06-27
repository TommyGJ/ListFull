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
//	console.log(props.messages);
		return (props.messages.map(subarray => subarray.map(element => {
		//	console.log(element);
			return(
				<Text key = {element.id} style = {styles.errorText}> 
					{element.id + ' ' + element.title}
				</Text>
			);

	})));
	
	

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


