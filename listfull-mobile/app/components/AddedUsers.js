import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import UserPreview from './UserPreview.js';

const AddedUsers = props => {

	return (props.users.map(user => {
		return(
			<UserPreview key = {user.email} user={user} />
		);
	}));
}

AddedUsers.propTypes = {
	users: PropTypes.array, 
}

export default AddedUsers;

