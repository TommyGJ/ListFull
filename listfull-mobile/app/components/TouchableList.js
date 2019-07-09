import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const Row = props => {
	const onPress = () => {
		props.onPress(props.item);
	}

	const onPressDelete = () => {
		props.onPressDelete(props.item);
	}
	return(
		<View style = {styles.row}>
			<View style={styles.headers}>
				<View style={styles.headerInfoSub} >
					<Text style={{color: 'gray'}}>
					Owner: {props.item.ownerName}  
					</Text>
				</View>
				<View style={styles.headerInfoSub}>
					<Text style={{color: 'gray'}}>
					Deadline: {props.item.deadline}
					</Text>
				</View>
			</View>
			<TouchableOpacity onPress = {onPress}>
				<View style = {styles.body}>
					<Text style = {{fontSize: 15, fontWeight: 'bold'}}>
						{props.item.name}
					</Text>
				</View>
			</TouchableOpacity>
			<View style={styles.footer}>
				<View style={{flex:1, alignItems: 'flex-end'}}>
					<TouchableOpacity onPress={onPressDelete}>
						<MaterialCommunityIcons name="delete" size={30} color="gray"/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const TouchableList = props => {
	const renderItem = ({item}) => {
		return(
			<Row 
				item = {item}
				onPress = {props.onPressRow}
				onPressDelete = {props.onPressDelete}
			/>
		);
	};

	const extractKeys = (item,index) => item.id;

	return (
		<FlatList style = {styles.lists}  renderItem = {renderItem} data = {props.lists} keyExtractor={extractKeys} />
	);  
}

export default TouchableList;

const styles = StyleSheet.create({
	list: {
		flex: 1,
	},
	headers: {
		flex: 1,
		flexDirection: 'row',
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
		alignItems: 'flex-start',
	},
	row: {
		flex: 1,
		backgroundColor: '#fff',
		borderRadius: 20,
		marginBottom: 2,
		marginRight: 2,
		marginLeft: 2,
		paddingTop: 5,
		paddingBottom: 5,
	},
	body: {
		flex: 5,
		alignItems: 'center',
	},
	headerInfoSub: {
		paddingRight: 5, 
		paddingLeft: 5, 
		borderRightWidth: 1, 
		borderRightColor: 'lightgray',
	},
	footer: {
		flex: 1,
		flexDirection: 'row',
		marginLeft: 5,
		marginRight: 5,
	},

})

