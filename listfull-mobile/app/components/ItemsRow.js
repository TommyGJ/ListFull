import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const ItemsRow = props => {
	const isOwner = () => {
		return (props.item.ownerID === props.owner); 
	}

	return (
		<View style = {rowStyles.container}>
			<View style = {rowStyles.body}>
				<View style = {rowStyles.leftIcons}>
					<View style = {rowStyles.bullet}>
						<MaterialCommunityIcons name = {`star-four-points${isOwner() ? '' : '-outline'}`} size={25} color="goldenrod"/>
					</View>
					<View style= {rowStyles.checkBox}>
						<MaterialIcons name = "check"  size={25} color={`${props.item.complete ? 'green' : 'lightgray'}`}/>
					</View>
					<View style = {rowStyles.priority}>
						<MaterialIcons name = "priority-high" size={25} color= {`${props.item.priority ? 'dodgerblue' : 'lightgray'}`}/>
					</View>
				</View>
				<TouchableHighlight style = {rowStyles.title} underlayColor="lightgray" onPress = {() => props.openItem(props.item)} >
						<Text style = {{fontSize: 16}}> {props.item.name} </Text>
				</TouchableHighlight>

			</View>

		</View>
	);




}

ItemsRow.propTypes = {
	item: PropTypes.object,
	owner: PropTypes.string,
	openItem: PropTypes.func,
}

const rowStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderColor: '#E9EBEC',
		paddingHorizontal: 5,
		paddingTop: 5,
		paddingBottom: 5,
	},
	body: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	bullet: {
		flex: 1,
	},
	checkBox: {
		flex: 1,
	},
	priority: {
		flex: 1,
	},
	leftIcons: {
		flex: 1,
		flexDirection: 'row',
		borderRightWidth: 1,
		borderColor: 'lightgray',
	},
	title: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},

});

export default ItemsRow;

