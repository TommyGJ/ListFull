import React from 'react'
import { TouchableOpacity,View, Text, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import UserPreview from './UserPreview.js';

const CollaboratorsListRow = props => {
	// only show when user is the owner of the list
	const removeCollaborator = () => {
		if (props.user.id != props.current_user.id) {
			return (
				<TouchableOpacity onPress = {() => props.removeUser(props.user)}>
					<MaterialIcons name="close" size={30} color= 'lightcoral'/>
				</TouchableOpacity>
			);
		}
	}
	return(
		<View style = {rowStyles.conatainer} >
			<View style = {{flex: 3}}>
				<UserPreview
					user = {props.user}
					owner = {props.current_user}
				/>
			</View>
			<View style = {{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
				{(props.current_user.id === props.list.ownerID) && removeCollaborator() }
			</View>
		</View>
	);

}

CollaboratorsListRow.propTypes = {
	user: PropTypes.object,
	current_user: PropTypes.object,
	list: PropTypes.object,
	removeUser: PropTypes.func,
}

const rowStyles = StyleSheet.create({
	conatainer: {
		flex: 1,
		marginBottom: 2,
		flexDirection: 'row',
		backgroundColor: '#fff',
	}
});

export default CollaboratorsListRow

