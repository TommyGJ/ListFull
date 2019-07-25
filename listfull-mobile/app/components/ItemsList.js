import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Header from './ItemsListHeader.js'
import ItemsRow from './ItemsRow.js'


const ItemsList = props => {

	const [refreshing,setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await props.getData();
		setRefreshing(false);
	}


	const renderItem = ({item}) => {
		return(
			<ItemsRow 
				item = {item}
				owner = {props.owner}
				openItem = {props.openItem}
			/>
		);
	};

	const extractKeys = (item,index) => item.id;

	return (
		<FlatList 
			style = {{flex: 1}}
			renderItem = {renderItem} 
			data = {props.items} 
			keyExtractor={extractKeys} 
			refreshing={refreshing}
			onRefresh  = {onRefresh}
			ListHeaderComponent = {<Header list={props.list} goTo = {props.goTo} />}
			
		/>
	);  
}

ItemsList.propTypes = {
	getData: PropTypes.func,
	items: PropTypes.array,
	list: PropTypes.object,
	goTo: PropTypes.func,
	owner: PropTypes.string,
	openItem: PropTypes.func,
}


export default ItemsList;


