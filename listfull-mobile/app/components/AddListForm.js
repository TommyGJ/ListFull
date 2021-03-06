import React, { useState, useEffect } from 'react';
import { DatePickerIOS, View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AddUserForm from './AddUserForm.js';
import AddedUsers from './AddedUsers.js';
import ErrorBox from './ErrorBox.js';
import FormHeader from './FormHeader.js';
import SingleLineTextEntry from './SingleLineTextEntry.js';
import MultipleLineTextEntry from './MultipleLineTextEntry.js';
import FormSubHeader from './FormSubHeader.js';
 

const AddListForm = props => {
	const [newListName, setNewListName] = useState('');
	const [newListInfo, setNewListInfo] = useState('');
	const [deadline, setDeadline] = useState(new Date()); 

	const newListNameHandler = name => {
		setNewListName(name);
	}

	const deadlineHandler = newDeadline => {
		setDeadline(newDeadline);
	}

	const newListInfoHandler = info => {
		setNewListInfo(info);
	}

	const userEmailHandler = email => {
		setUserEmail(email);
	}

	const onPressSubmit = () => {
		props.commitList(newListName, newListInfo, deadline) 
	}

	return (
		<View style = {styles.container}>
			<View style = {styles.topContainer}>
				<FormHeader text = {"Create New List"} close = {props.closeModal} submit = {onPressSubmit} />  
			</View>

			<View style = {styles.body}>
				<KeyboardAwareScrollView
					extraScrollHeight= {60}
				>
					<View style = {styles.bodyChildrenContainer}>
						<SingleLineTextEntry
							value = {newListName}
							placeholder = "New List Name"
							onChangeValue = {newListNameHandler}
							focus = {false}
						/>
					</View>
					<View style = {styles.deadlineContainer}>
						<FormSubHeader
							text = "List Deadline"
						/>
						<DatePickerIOS
							date={deadline}
							onDateChange={deadlineHandler}
							mode={'date'}
						/>
					</View>
					<View style = {styles.bodyChildrenContainer}>
						<FormSubHeader
							text = "Additional Information"
						/>

						<MultipleLineTextEntry 
							value = {newListInfo}
							placeholder="Add any additional information here!"
							onChangeValue={newListInfoHandler}
						/>
					</View>
					<View style = {styles.bodyChildrenContainer}>
						<FormSubHeader
							text = "Add Collaborators"
						/>
						<AddedUsers users={props.newListUsers}/>
						<ErrorBox isError={props.err} messages={props.errMessage}/>
						<AddUserForm
							commitUser={props.addUserToList}
						/>
					</View>
				</KeyboardAwareScrollView>
			</View>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	bodyChildrenContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		paddingBottom: 10,
	},
	topContainer: {
		flex: 1, 
		justifyContent: 'flex-start',
		marginLeft: 5,
		marginTop: 10,
		marginRight: 5,
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
	},
	sectionHeader: {
		fontSize: 20,
		color:'lightsteelblue',
		fontWeight: 'bold', 
		alignSelf: 'flex-start', 
		paddingLeft: 20,
	},
	body: {
		flex: 5,
	}, 
	infoBox: {
		margin: 5,
		paddingLeft: 15,
		fontSize: 16,
		height: 100,
		borderColor: 'lightgray',
		borderBottomWidth: 2,
		borderTopWidth: 2,
	},
});
export default AddListForm

