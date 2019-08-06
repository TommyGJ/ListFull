import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import FormHeader from './FormHeader.js';
import SingleLineTextEntry from './SingleLineTextEntry.js';
import SaveAndCloseButton from './SaveAndCloseButton.js';


const SettingsModal = props => {
	[firstName, setFirstName] = useState(props.user.firstName);
	[lastName, setLastName] = useState(props.user.lastName);
	[email, setEmail] = useState(props.user.email);
	[password, setPassword] = useState('');
	[newPassword, setNewPassword] = useState('');
	[newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

	const onChangeFirstName = (name) => {
		setFirstName(name);
	}

	const onChangeLastName = (name) => {
		setLastName(name);
	}

	const onChangeEmail = (newEmail) => {
		setEmail(newEmail);
	}

	const onChangePassword = (pswrd) => {
		setPassword(pswrd);
	}

	const onChangeNewPassword = (new_password) => {
		setNewPassword(new_password);
	}

	const onChangeNewPasswordConfirmation = (new_password_confirmation) => {
		setNewPasswordConfirmation(new_password_confirmation);
	}

	const nameData = () => ({
		user: {
			first_name: firstName,
			last_name: lastName, 
		}
	});
	const emailData = () => ({
		user: {
			email: email

		},
		old_password: password
	});

	const passwordData = () => ({
		user: {
			password: newPassword,
			password_confirmation: newPasswordConfirmation,
		},
		old_password: password
	});

	const closeModal = () => {
		setFirstName(props.user.firstName);
		setLastName(props.user.lastName);
		setPassword('');
		setEmail(props.user.email);
		setNewPassword('');
		setNewPasswordConfirmation('');
		props.close();
	}

	const changeName = () => {
		return (
			<View>
				<SingleLineTextEntry
					value = {firstName} 
					placeholder = "First Name"
					onChangeValue = {onChangeFirstName}
				/>
				<SingleLineTextEntry
					value = {lastName} 
					placeholder = "Last Name"
					onChangeValue = {onChangeLastName}
				/>
				<SaveAndCloseButton 
					enabled = {!(props.user.firstName === firstName && props.user.lastName === lastName) }
					onSave = {() => props.update(nameData(), '')}
					onClose = {closeModal}
				/>
			</View>
		);
	}
	const changeEmail = () => {
		return (
			<View>
				<SingleLineTextEntry
					value = {password} 
					placeholder = "Password"
					onChangeValue = {onChangePassword}
					secureTextEntry = {true}
				/>
				<SingleLineTextEntry
					value = {email} 
					placeholder = "New Name"
					onChangeValue = {onChangeEmail}
					keyboardType = 'email-address'
				/>
				<SaveAndCloseButton 
					enabled = {props.user.email !== email && password !== ''}
					onSave = {() => props.update(emailData(), '/update_secure')}
					onClose = {closeModal}
				/>
			</View>
		);
	}

	const changePassword = () => {
		return (
			<View>
				<SingleLineTextEntry
					value = {password} 
					placeholder = "Old Password"
					onChangeValue = {onChangePassword}
					secureTextEntry = {true}
				/>
				<SingleLineTextEntry
					value = {newPassword} 
					placeholder = "New Password"
					onChangeValue = {onChangeNewPassword}
					secureTextEntry = {true}
				/>
				<SingleLineTextEntry
					value = {newPasswordConfirmation} 
					placeholder = "New Password Confirmation"
					onChangeValue = {onChangeNewPasswordConfirmation}
					secureTextEntry = {true}
				/>
				<SaveAndCloseButton 
					enabled = {password !== '' && newPassword !== '' && newPasswordConfirmation !== '' }
					onSave = {() => props.update(passwordData(), '/update_secure')}
					onClose = {closeModal}
				/>
			</View>
		);
	}

	const dispalyContent = () => {
		switch(props.formKey) {
			case "Change Name":
				return changeName()
			case "Change Email":
				return changeEmail() 
			case "Change Password":
				return changePassword()
			default:
				return (
					<View>
					</View>
				);
		}
	}
	return (
		<Modal
			isVisible={props.show}
			animationInTiming={1000}
			animationOutTiming={300}
			onSwipeComplete={closeModal}
			onBackdropPress={closeModal}
			swipeDirection='down'
			animationOut='slideOutDown'
			onModalHide={props.onHide}
			hideModalContentWhileAnimating = {true}
			style={modalStyles.bottomModal}
		>
			<KeyboardAvoidingView style = {modalStyles.container} behavior='padding'>
				<View>
					<Text style = {{fontSize: 24, fontWeight: 'bold',color: 'gray', alignSelf: 'center'}}>
						{props.formKey}	
					</Text>
				</View>
				{dispalyContent()}
			</KeyboardAvoidingView>
		</Modal>
	);
	
}

SettingsModal.propTypes = {
	show: PropTypes.bool,
	close: PropTypes.func,	
	onHide: PropTypes.func,
	formKey: PropTypes.string,
	user: PropTypes.object,
	update: PropTypes.func,
}

modalStyles = StyleSheet.create({
	bottomModal: {
		justifyContent: 'flex-end',
		margin: 0,
	},
	container: {
		backgroundColor: 'white',
		paddingVertical: 10, 
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
	},
});

export default SettingsModal;

