import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const AddUserForm = props => {

	const [email, setEmail] = useState('');

	const canSubmit = () => {
		if (email.length > 0) {
			return true;
		} else {
			return false;
		}
	}
	const handleEmail = newEmail => {
		setEmail(newEmail);
	}
	const submit = () => {
		if (canSubmit()) {
			props.commitUser(email);
			setEmail('');
		}
	}

	return (
		<View>
			<View style = {formStyles.inputContainer}> 
				<TextInput
					style = {formStyles.text_box}
					value = {email}
					placeholder = "Email"
					onChangeText = {handleEmail}
					keyboardType = 'email-address'
				/>
			</View>
			<View style = {formStyles.buttonContainer}>
				<TouchableOpacity onPress = {submit}  >
					<MaterialIcons name={ `add-circle${canSubmit() ? '' : '-outline'}` } size={50} color="lightsteelblue"/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

AddUserForm.propTypes = {
	commitUser: PropTypes.func,
}

formStyles = StyleSheet.create({
	buttonContainer: {
		alignItems: 'center',
		paddingBottom: 10,
	},
	inputContainer: {
		justifyContent: 'flex-start',
	},
	text_box: {
		borderBottomColor: 'lightgray',
		borderBottomWidth: 2,
		fontSize: 20,
		paddingLeft: 15,
		margin: 5,
		height: 50,
	},

});

export default AddUserForm;

