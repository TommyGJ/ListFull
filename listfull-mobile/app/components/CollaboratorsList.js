import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import UserPreview from './UserPreview.js';
import  CollaboratorsListRow  from './CollaboratorsListRow.js';
import AddUserForm from './AddUserForm.js';
import { Footer } from './CollaboratorsListFooter.js';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

const CollaboratorsList = props => {
	const [refreshing,setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await props.getData();
		setRefreshing(false);
	}

	const renderItem = ({item}) => {
		console.log(item);
		return(
			<CollaboratorsListRow
				user = {item}
				current_user = {props.current_user}
				list = {props.list}
				removeUser = {props.removeUser}
			/>
		);
	};

	const extractKeys = (item,index) => item.id;

	return (
		<KeyboardAwareFlatList 
			extraScrollHeight = {60}
			style = {{flex: 1}}
			renderItem = {renderItem} 
			data = {props.users} 
			keyExtractor={extractKeys} 
			refreshing={refreshing}
			onRefresh  = {onRefresh}
			ListFooterComponent = {<Footer canAdd = {props.current_user.id == props.list.ownerID} addUser = {props.addUser} /> }
		/>
	);  
}

CollaboratorsList.propTypes = {
	list: PropTypes.object,
	users: PropTypes.array,
	current_user: PropTypes.object,
	removeUser: PropTypes.func,
	getData: PropTypes.func,
	addUser: PropTypes.func,
}

const listStyles = StyleSheet.create({
	footerContainer: {
		flex: 1,
		backgroundColor: '#fff',
	}
});


export default CollaboratorsList;

