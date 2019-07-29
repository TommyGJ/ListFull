import React, { useState } from 'react'
import { TouchableOpacity,View, Text, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import UserPreview from './UserPreview.js';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import  CollaboratorsListRow  from './CollaboratorsListRow.js';
import AddUserForm from './AddUserForm.js';
import FormSubHeader from './FormSubHeader.js';


export const Footer = props => {
	[activated, setActivated] = useState(false);

	const initiateAddUser = () => {
		return (
			<TouchableOpacity onPress = {() => setActivated(true)} style = {footerStyles.box}>
				<View style = {{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
					<MaterialIcons name="add" size={50} color="dodgerblue" />
				</View>
				<View style = {{flex: 2, justifyContent: 'center', alignItems: 'flex-start'}}>
					<FormSubHeader text = "Add Collaborators"/>
				</View>
			</TouchableOpacity>
		);
	}
	const commitUser = (email) => {
		props.addUser(email)
		setActivated(false)

	}
	const footerState = () => {
		if (!props.canAdd) {
			return
		} else if(activated) {
			return <AddUserForm commitUser = {commitUser} />
		} else {
			return initiateAddUser()
		}

	}

	
	return(
		<View style = {footerStyles.footerContainer}>
		{footerState()}
		</View>
	);
}

Footer.propTypes = {
	canAdd: PropTypes.bool,
	addUser: PropTypes.func,
}

const footerStyles = StyleSheet.create({
	footerContainer: {
		flex: 1,
		backgroundColor: '#fff',
	},
	box: {
		flex: 1,
		flexDirection: 'row',
	},
});

