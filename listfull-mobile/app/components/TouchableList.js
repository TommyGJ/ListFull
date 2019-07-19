import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import nameShortener from './../utils/NameShortener.js';

const Row = props => {
	const onPress = () => {
		props.onPress(props.item);
	}

	const onPressDelete = () => {
		props.onPressDelete(props.item);
	}

	const onPressAddUser = () => {
		props.onPressAddUser(props.item);
	}
	const onPressInfo = () => {
		props.onPressInfo(props.item);
	}
	const convertToDate = (deadline) => {
		let formattedDeadline = new Date(parseFloat(deadline));
		let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		return formattedDeadline.toLocaleDateString('en-US');


	}
	return(
		<View style = {styles.row}>
			<View style={styles.headers}>
				<View style={styles.headerInfoSub}>
					<Text style={{color: 'gray', fontSize: 12}}>
					Deadline: {convertToDate(props.item.deadline)}
					</Text>
				</View>
				<View style={styles.headerInfoSub} >
					<Text style={{color: 'gray', fontSize: 12}}>
					Owner: {nameShortener(props.item.ownerName)}  
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
				<View style={styles.subFooter}>
					<TouchableOpacity onPress={onPressDelete}>
						<MaterialCommunityIcons name="delete" size={30} color="gray"/>
					</TouchableOpacity>
				</View>
				<View style={styles.subFooter}>
					<TouchableOpacity onPress={onPressAddUser}>
						<MaterialIcons name="person-add" size={30} color="gray"/>
					</TouchableOpacity>
				</View>
				<View style={styles.subFooter}>
					<TouchableOpacity onPress={onPressInfo}>
						<MaterialIcons name="info" size={30} color="gray"/>
					</TouchableOpacity>
				</View>

			</View>
		</View>
	);
}

const TouchableList = props => {

	const [refreshing,setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await props.getData();
		setRefreshing(false);
	}


	const renderItem = ({item}) => {
		return(
			<Row 
				item = {item}
				onPress = {props.onPressRow}
				onPressDelete = {props.onPressDelete}
				onPressAddUser = {props.onPressAddUser}
				onPressInfo = {props.onPressInfo}
			/>
		);
	};

	const extractKeys = (item,index) => item.id;

	return (
		<FlatList 
			style = {styles.lists}  
			renderItem = {renderItem} 
			data = {props.lists} 
			keyExtractor={extractKeys} 
			refreshing={refreshing}
			onRefresh  = {onRefresh}
		/>
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
		paddingTop: 5,
		
	},
	headerInfoSub: {
		paddingRight: 5, 
		paddingLeft: 5, 
		borderRightWidth: 1, 
		borderRightColor: 'lightgray',
	},
	footer: {
		flex: 1,
		flexDirection: 'row-reverse',
		marginLeft: 5,
		marginRight: 5,
	},
	subFooter: {
		paddingLeft: 5,
	}
})

