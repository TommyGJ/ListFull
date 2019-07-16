import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import GravatarURL from './../utils/GravatarURL.js';

const AddedUsers = props => {

	return (props.users.map(user => {
		return(
			<View key = {user.email} style = {addedUsersStyles.container}>
				<View style = {addedUsersStyles.imageBox}>
					<Image
						style={{
							borderRadius: 25,
							width: 50,
							height: 50,
							resizeMode: 'cover',
						}}
						source={{
							uri: GravatarURL(user.email),
						}}
					/>
				</View>
				<View style = {addedUsersStyles.preview}>
					<Text style = {{fontSize: 18}}>
						{user.first_name + ' ' + user.last_name}
					</Text>
				</View>
				
			</View>
		);
	}));


}

AddedUsers.propTypes = {
	users: PropTypes.array, 


}

const addedUsersStyles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 5,
		paddingBottom: 5,
		marginRight: 5,
		marginLeft: 5,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: 'lightgray',
	},
	imageBox: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	preview: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},


});

export default AddedUsers;

