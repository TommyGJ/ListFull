import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';

const ShowLists = props => {

	const renderItem = ({item}) => {
		console.log(item);
		return(
			<View style = {styles.row}>
				<Text>
					{item.name}
				</Text>
			</View>
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
		flex: 2,
		alignItems: 'center',
		backgroundColor: '#fff',
		marginBottom: 7,
	}

})

