import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity } from 'react-native';

const List = props => {
	const onPress = () => {
		props.onPress(props.item);
	}
	return(
		<TouchableOpacity onPress = {onPress}>
			<View style = {styles.row}>
				<Text>
					{props.item.name}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

const ShowLists = props => {
	const renderItem = ({item}) => {
		return(
			<List 
				item = {item}
				onPress = {props.onPress}
			/>
		);
	};

	const extractKeys = (item,index) => item.id;

	return (
		<FlatList style = {styles.lists}  renderItem = {renderItem} data = {props.lists} keyExtractor={extractKeys} />
	);  
}

export default ShowLists;

const styles = StyleSheet.create({
	list: {
		flex: 1,
	},
	subRow: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		flexWrap: 'wrap', 
		marginTop: 2,
	},
	row: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
		marginBottom: 2,
		paddingTop: 20,
		paddingBottom: 20,
	}
})

