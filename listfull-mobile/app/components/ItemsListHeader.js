import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import nameShortener from './../utils/NameShortener.js';
import PropTypes from 'prop-types';
import { dateFormatter } from './../utils/DateFormatter.js';

const Header = props => {

	const infoText = () => {
		return (props.list.info? props.list.info : "Add additional information about this list!");
	}

	const deadlineText = () => {
		return (props.list.deadline? dateFormatter(props.list.deadline, true) : "Add a deadline to this list!"); 
	}

	return (
		<View style = {headerStyles.container}>
			
			<View style = {headerStyles.body}>
				<View style = {headerStyles.bodyHeader}>
					<Text style = {headerStyles.bodyTitle} > Additional Information </Text>
				</View>
				<TouchableOpacity onPress = {() => props.goTo("ListSettings")}>
					<View style = {headerStyles.bodyContent}>
						<Text style = {{fontSize: 14, color: 'gray', textAlign: 'center'}}>
							{infoText()}
						</Text>
					</View>
				</TouchableOpacity>
			</View>

			<View style = {headerStyles.body}>
				<View style = {headerStyles.bodyHeader}>
					<Text style = {headerStyles.bodyTitle} > Deadline </Text>
				</View>
				<TouchableOpacity onPress = {() => props.goTo("ListSettings")}>
					<View style = {headerStyles.bodyContent}>
						<Text style = {{fontSize: 14, color: 'gray', textAlign: 'center'}}> 
							{deadlineText()}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View style = {headerStyles.footer}>
				<TouchableHighlight style = {headerStyles.outerOutsideBox} underlayColor="lightgray" onPress={() => props.goTo('AddBullet')} >
					<View style = {headerStyles.innerBox}>
							<MaterialCommunityIcons name="square-edit-outline" size={25} color="goldenrod"/>
							<Text style = {headerStyles.iconText}>
								Add Bullet
							</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight style = {headerStyles.outerCenterBox} underlayColor="lightgray" onPress={() => props.goTo('Collaborators')}>
					<View style = {headerStyles.innerCenterBox}>
							<MaterialIcons name="people" size={25} color="dodgerblue"/>
							<Text style = {headerStyles.iconText}>
								View	
							</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight style = {headerStyles.outerOutsideBox}underlayColor="lightgray" onPress={() => props.goTo('ListSettings')}>
					<View style = {headerStyles.innerBox}>
							<MaterialIcons name="settings" size={25} color="goldenrod"/>
							<Text style = {headerStyles.iconText}>
								Edit List
							</Text>
					</View>
				</TouchableHighlight>
			</View>
		</View>
	);

}

Header.propTypes = {
	list: PropTypes.object,
	goTo: PropTypes.func,

}

headerStyles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		flex: 1,
		backgroundColor: '#fff',
		marginBottom: 5,
		paddingTop: 5,
		paddingBottom: 5,
	},
	footer: {
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		paddingTop: 5,
		borderTopWidth: 1,
		borderColor: 'lightgray',
	},
	innerBox: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 5,
	},
	innerCenterBox: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 5,
		paddingTop: 10,
		paddingBottom: 5,
	},
	outerCenterBox: {
		flex: 2,
		borderRightWidth: 1,
		borderLeftWidth: 1,
		borderColor: 'lightgray',
	},
	outerOutsideBox: {
		flex: 3,
		marginHorizontal: 5,
	},
	iconText: {
		fontSize: 12,
		paddingLeft: 5,
		fontWeight: 'bold',
		color: 'gray',
	},
	body: {
		flex: 1,
		paddingBottom: 10
	},
	bodyTitle: {
		fontSize: 20,
		color: 'dimgray',
	},
	bodyHeader: {
		flex: 1,
		paddingLeft: 5,
	},
	bodyContent: {
		paddingLeft: 20,
		paddingRight: 20,
		flex: 1,
		flexWrap: 'wrap',
	},
});

export default Header;

