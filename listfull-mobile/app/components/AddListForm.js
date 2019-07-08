import React from 'react'
import { DatePickerIOS, View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
 

const AddListForm = props => {
	return (
		<KeyboardAvoidingView style = {styles.container}>
			<View style = {styles.topContainer}>
				<View style = {{flex: 1, flexDirection: 'row'}}>
					<View style = {{flex: 1, alignItems: 'flex-start'}}>
						<TouchableOpacity onPress={props.closeModal}>
							<MaterialCommunityIcons name="window-close" size={32} color="gray"/>
						</TouchableOpacity>
					</View>
					<View style = {{flex: 1, alignItems: 'flex-end'}}>
						<TouchableOpacity onPress={props.commitList}>
							<MaterialIcons name="add" size={35} color="gray"/>
						</TouchableOpacity>
					</View>
				</View>
				<View style = {{flex: 1, alignItems: 'center'}}>
					<Text style = {{fontSize: 20, fontWeight: 'bold',color: 'gray'}}>
						Create New List
					</Text>
				</View>
			</View>
			<View style = {styles.middleContainer}>
				<TextInput
					style = {styles.text_box}
					value = {props.newListName}
					placeholder = "New List Name"
					onChangeText = {props.newListNameHandler}
				/>
			</View>
			<View style = {styles.bottomContainer}>
				<View style = {styles.deadlineContainer}>
					<Text style = {{fontSize: 20,color:'lightblue',fontWeight: 'bold', alignSelf: 'center'}}>
						List Deadline
					</Text>
					<DatePickerIOS
						date={props.deadline}
						onDateChange={props.setDeadline}
					/>
				</View>
				<View style = {{flex: 1}}>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

export default AddListForm

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		borderRadius: 20,
	},
	middleContainer: {
		flex: 1,
		justifyContent: 'flex-start',
	},
	topContainer: {
		flex: 1, 
		justifyContent: 'flex-start',
		marginLeft: 5,
		marginTop: 10,
		marginRight: 5,
	},
	bottomContainer: {
		flex: 5,
		justifyContent: 'flex-start',
	},
	text_box: {
		borderBottomColor: 'lightgray',
		borderBottomWidth: 2,
		fontSize: 20,
		height: 50,
		paddingLeft: 15,
		margin: 5,
	},
	deadlineContainer: {
		flex: 1,
		justifyContent: 'flex-start',
	}
});

