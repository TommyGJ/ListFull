import React, { useState, useEffect } from 'react';
import { DatePickerIOS, View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormHeader from './FormHeader.js';
import SingleLineTextEntry from './SingleLineTextEntry.js';
import MultipleLineTextEntry from './MultipleLineTextEntry.js';
import FormSubHeader from './FormSubHeader.js';
import PropTypes from 'prop-types';
import SubmitButton from './SubmitButton.js';
 

const EditListForm = props => {
	const [listName, setListName] = useState(props.list.name);
	const [listInfo, setListInfo] = useState(props.list.info);
	const [deadline, setDeadline] = useState(new Date(parseFloat(props.list.deadline))); 

	const listNameHandler = name => {
		setListName(name);
	}

	const deadlineHandler = newDeadline => {
		setDeadline(newDeadline);
	}

	const listInfoHandler = info => {
		setListInfo(info);
	}

	const onPressSubmit = () => {
		props.update(listName, listInfo, deadline) 
	}

	return (
		<View style = {styles.container}>
			<View style = {styles.body}>
				<KeyboardAwareScrollView
					extraScrollHeight= {60}
				>
					<View style = {styles.bodyChildrenContainer}>
						<SingleLineTextEntry
							value = {listName}
							placeholder = "List Name"
							onChangeValue = {listNameHandler}
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
							value = {listInfo}
							placeholder="Add any additional information here!"
							onChangeValue={listInfoHandler}
						/>
					</View>
					<View style = {styles.footerContainer}>
						<SubmitButton
							name = "Save Changes?"
							enabled = {listName !== '' && listInfo !== ''}
							onSubmit = {onPressSubmit}
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
	},
	bodyChildrenContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		paddingBottom: 10,
	},
	footerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	topContainer: {
		flex: 1, 
		justifyContent: 'flex-start',
		marginLeft: 5,
		marginTop: 10,
		marginRight: 5,
	},
	deadlineContainer: {
		flex: 1,
		justifyContent: 'flex-start',
	},
	body: {
		flex: 5,
	}, 
});

EditListForm.propTypes = {
	list: PropTypes.object,
	update: PropTypes.func,
}
export default EditListForm

