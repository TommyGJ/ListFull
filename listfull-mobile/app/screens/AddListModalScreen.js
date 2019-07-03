import React from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

export default class AddListModalScreen extends React.Component  {
	constructor(props){
		super(props)
		this.state = {
			newListName: '',
		}
	}
	_onCloseModal = () => {
		this.props.closeModal();
		console.log("close modal");
	}

	render() {
		return (
			<Modal 
				isVisible={this.props.isModalVisible}
//					onBackdropPress={this._onCloseModal}
				animationInTiming={1000}
				animationOutTiming={500}
				onSwipeComplete={this._onCloseModal}
				swipeDirection="down"
				animationOut='slideOutDown'
				hideModalContentWhileAnimating = {true}
			>

				<KeyboardAvoidingView style = {styles.container}>
					<View style = {styles.topContainer}>
						<TouchableOpacity onPress={this._onCloseModal}>
							<MaterialCommunityIcons name="window-close" size={32} color="gray"/>
						</TouchableOpacity>
						<View style = {{flex: 1, alignItems: 'center'}}>
							<Text style = {{fontSize: 20, fontWeight: 'bold',color: 'gray'}}>
								Create New List
							</Text>
						</View>
					</View>
					<View style = {styles.middleContainer}>
						<TextInput
							style = {styles.text_box}
							value = {this.state.newListName}
							placeholder = "New List Name"
							onChangeText = {() => {
								this.setState({newListName: this.state.newListName});
							}}
						/>
					</View>
					<View style = {styles.bottomContainer}>
					</View>
				</KeyboardAvoidingView>
			</Modal>
		);
	}
}

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
});

