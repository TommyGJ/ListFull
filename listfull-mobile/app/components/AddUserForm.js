import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const AddUserForm = props => {

	const canSubmit = () => {
		if (props.userEmail.length > 0) {
			return true;
		} else {
			return false;
		}
	}
	const submit = () => {
		if (canSubmit()) {
			props.commitUser();
		}
	}

	return (
		<View>
			<View style = {formStyles.inputContainer}> 
				<TextInput
					style = {formStyles.text_box}
					value = {props.userEmail}
					placeholder = "Email"
					onChangeText = {props.userEmailHandler}
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
	userEmail: PropTypes.string,
	userEmailHandler: PropTypes.func,
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

