import React from 'react'
import { DatePickerIOS, View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AddUserForm from './AddUserForm.js';
import AddedUsers from './AddedUsers.js';
import ErrorBox from './ErrorBox.js';
 

const AddListForm = props => {
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
						<TouchableOpacity onPress={props.commitList}>
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
							value = {props.newListName}
							placeholder = "New List Name"
							onChangeText = {props.newListNameHandler}
						/>
					</View>
					<View style = {styles.deadlineContainer}>
						<Text style = {styles.sectionHeader}>
							List Deadline
						</Text>
						<DatePickerIOS
							date={props.deadline}
							onDateChange={props.setDeadline}
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
							value={props.newListInfo}
							onChangeText={props.newListInfoHandler}
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
							userEmail={props.userEmail}
							userEmailHandler={props.newUserEmailHandler}
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

