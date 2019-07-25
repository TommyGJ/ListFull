import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet,TextInput, TouchableOpacity,ScrollView, KeyboardAvoidingView} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import SingleLineTextEntry from './SingleLineTextEntry.js';
import MultipleLineTextEntry from './MultipleLineTextEntry.js';
import {Window} from './../utils/ScreenDimensions.js';
import NavigationButtons from './NavigationButtons.js';
import SubmitButton from './SubmitButton.js';
import PropTypes from 'prop-types';



const AddBulletForm = props => {
	[name, setName] = useState('');
	[info, setInfo] = useState('');
	[enableSubmit, setEnableSubmit] = useState(false);

	useEffect(() => {
		if (info !== '' && name !== '') {
			setEnableSubmit(true);
		} else {
			setEnableSubmit(false);
		}
	});
	

	const updateName = newName => {
		setName(newName);
		console.log(name);
	}

	const nameEntry = () => {
		return (
			<View style = {{flex: 1}}>
				<Text style = {{fontSize: 22, color: 'gray', fontWeight: 'bold', textAlign: 'center'}}>
					Pick A Name!
				</Text>	
				<SingleLineTextEntry
					value = {name}
					onChangeValue = {updateName}
					placeholder = {"Name"}
					focus = {true}
				/>
			</View>
		);
	}

	const infoEntry = () => {
		return (
			<View style = {{flex: 1,}}>
				<Text style = {{fontSize: 22, color: 'gray', fontWeight: 'bold', textAlign: 'center'}}>
						Add Some Info!	
				</Text>	
				<MultipleLineTextEntry
					value = {info}
					onChangeValue = {updateInfo}
					placeholder = {"Add any additional information here!"}
				/>
			</View>
		);
	}

	const submitEntry = () => {
		return (
			<View style = {{flex: 1,}}>
				<Text style = {{fontSize: 22, color: 'gray', fontWeight: 'bold', textAlign: 'center'}}>
						Finished?	
				</Text>	
			</View>
		);
	}

	const updateInfo = newInfo => {
		setInfo(newInfo);
		console.log(info);
	}

	navigate = (itemIndex) => {
		this._scrollView.scrollTo({x:itemIndex * Window.width()});
	}

	const submitItem = () => {
		props.submitItem(name,info);
		props.goBack();
	}


	return (
		<KeyboardAvoidingView style = {formStyles.container} behavior = "padding">
			<View style = {{flex: 1}}>
			</View>
				<View style = {{flex: 3}}>
					<ScrollView style = {{flex: 1}}  horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} ref={view => this._scrollView = view}>
						<View style = {formStyles.firstPage}>
							{nameEntry()}
							<NavigationButtons goBack = {props.goBack} itemIndex = {0} navigate = {navigate} />
						</View>
						<View style = {formStyles.centerPage}>
							{infoEntry()}	
							<NavigationButtons goBack = {props.goBack} itemIndex = {1} navigate = {navigate} />
						</View>
						<View style = {formStyles.lastPage}>
							{submitEntry()}	
							<View style = {{flex: 1, justifyContent: 'center'}}>
								<SubmitButton onSubmit = {submitItem} name = "Add Bullet!" enabled = {enableSubmit}  />
							</View>
							<NavigationButtons goBack = {props.goBack} itemIndex = {2} navigate = {navigate} />
						</View>
					</ScrollView>
				</View>
				<View style = {{flex: 1}}>
				</View>
		</KeyboardAvoidingView>
	);
}

AddBulletForm.propTypes = {
	goBack: PropTypes.func,
	submitItem: PropTypes.func,
}

const formStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E9EBEC',
	},
	body: {
		flex: 5, 
		justifyContent: 'flex-start',
	},
	subBody: {
		paddingBottom: 10,
	},
	centerPage: {
		backgroundColor: '#fff',
		opacity: 1.00,
		paddingVertical: 20,
		flex: 1,
		width: Window.width() - 10,
		marginHorizontal: 5,
	},
	firstPage: {
		backgroundColor: '#fff',
		opacity: 1.00,
		paddingVertical: 20,
		flex: 1,
		width: Window.width() - 5,
		marginRight: 5,
	},
	lastPage: {
		backgroundColor: '#fff',
		opacity: 1.00,
		paddingVertical: 20,
		flex: 1,
		width: Window.width() - 5,
		marginLeft: 5,
	},


});

export default AddBulletForm;

