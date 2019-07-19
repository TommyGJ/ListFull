import React, { useState, useEffect } from 'react';
import { DatePickerIOS, View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AddUserForm from './AddUserForm.js';
import AddedUsers from './AddedUsers.js';
import ErrorBox from './ErrorBox.js';
 

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
				<View style = {{flex: 1, flexDirection: 'row'}}>
					<View style = {{flex: 1, alignItems: 'flex-start'}}>
						<TouchableOpacity onPress={props.closeModal}>
							<MaterialCommunityIcons name="window-close" size={32} color="gray"/>
						</TouchableOpacity>
					</View>
					<View style = {{flex: 1, alignItems: 'flex-end'}}>
						<TouchableOpacity onPress={onPressSubmit}>
							<MaterialIcons name="add" size={35} color="gray"/>
						</TouchableOpacity>
					</View>
				</View>
				<View style = {{flex: 1, alignItems: 'center'}}>
					<Text style = {{fontSize: 24, fontWeight: 'bold',color: 'gray'}}>
						Create New List
					</Text>
				</View>
			</View>

			<View style = {styles.body}>
				<KeyboardAwareScrollView
					extraScrollHeight= {60}
				>
					<View style = {styles.bodyChildrenContainer}>
						<TextInput
							style = {styles.text_box}
							value = {newListName}
							placeholder = "New List Name"
							onChangeText = {newListNameHandler}
						/>
					</View>
					<View style = {styles.deadlineContainer}>
						<Text style = {styles.sectionHeader}>
							List Deadline
						</Text>
						<DatePickerIOS
							date={deadline}
							onDateChange={deadlineHandler}
							mode={'date'}
						/>
					</View>
					<View style = {styles.bodyChildrenContainer}>
						<Text style = {styles.sectionHeader}>
							Additional Info	
						</Text>
						<TextInput
							placeholder="Add any additional information here!"
							maxLength={100}
							value={newListInfo}
							onChangeText={newListInfoHandler}
							multiline={true}
							style={styles.infoBox}
						/>
						
					</View>
					<View style = {styles.bodyChildrenContainer}>
						<Text style = {styles.sectionHeader}>
							Add Collaborators
						</Text>
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

