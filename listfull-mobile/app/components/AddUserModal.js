import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import AddUserForm from './AddUserForm.js'

const AddUserModal = props => {
	return (
	<Modal
		isVisible={props.show}
		animationInTiming={1000}
		animationOutTiming={300}
		onSwipeComplete={props.close}
		swipeDirection='down'
		animationOut='slideOutDown'
		onModalHide={props.onHide}
		hideModalContentWhileAnimating = {true}

		style={styles.bottomModal}
	>
		<KeyboardAvoidingView style = {styles.addUserContainer} behavior="padding" enabled>
			<View style = {styles.headers}>
				<View style = {{alignItems: 'center'}}>
					<TouchableOpacity onPress={props.close}>
						<MaterialCommunityIcons name="window-close" size={32} color="gray"/>
					</TouchableOpacity>
				</View>
				<Text style = {{fontSize: 20, fontWeight: 'bold', color: 'gray'}}>
					Add User To {props.listName}
				</Text>
			</View>
			<AddUserForm 
				commitUser = {props.commitUser} 
			/>
		</KeyboardAvoidingView>
	</Modal>
	)


}

AddUserModal.propTypes = {
	show: PropTypes.bool,
	close: PropTypes.func,
	onHide: PropTypes.func,
	commitUser: PropTypes.func,
	listName: PropTypes.string,
}
styles = StyleSheet.create({
	bottomModal: {
		justifyContent: 'flex-end',
		margin: 0,
	},
	addUserContainer: {
		backgroundColor: 'white',
		paddingTop: 10, 
		paddingBottom: 10,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
	},
	headers: {
		paddingLeft: 10,
		paddingRight: 10,
	},
});

export default AddUserModal;
