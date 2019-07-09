import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import { decode_jwt } from '../utils/Decode.js';
import axios from 'axios';
import API from './../utils/API.js';
import TouchableList  from './../components/TouchableList.js';
import * as SecureStore from 'expo-secure-store';
import AddList from './../components/AddList.js';
import AddListForm from './../components/AddListForm.js';
import Modal from 'react-native-modal';
import ErrorModal from './../components/ErrorModal.js';

export default class DashBoardScreen extends React.Component {
	state = {
		token: null,
		userID: null,
		userEmail: '',
		userFirstName: '',
		userLastName: '',
		userLists: [],
		isModalVisible: false,
		newListName: '',
		canShowErr: false,
		err: false,
		errMessage: [],
		newListDeadline: new Date(),
	}

	static navigationOptions = {
		 title: "My Lists"
	};

	_retrieveData = async () => {
	  try {
			const value = await SecureStore.getItemAsync('user_token');
			if (value !== null) {
				this.setState({token: value, userID: decode_jwt(value)["sub"]});
			}
		} catch (error) {
				 // Error retrieving data
		}
	}
	_onPress = (listData) => {
		console.log(listData)
		this.props.navigation.navigate('ListView', {
			list: listData,
		});
	}

	_getUserInfo = async () => {
		try {
			const {data} = await API.get('/api/v1/me', {
				headers: {Authorization: "Bearer " + String(this.state.token)}
			});
			console.log(data);
			this._storeUserInfo(data);
		} catch(e) {
			console.log(e);
		}
	}

	_postNewList = async () => {
		const config = { headers: {Authorization: "Bearer " + String(this.state.token)}};
		const listData = { list: { name: this.state.newListName, deadline: this.state.newListDeadline.getTime() }};
		try {
			const {data} = await API.post('/api/v1/lists', listData, config);
			this._addToMyLists(data);	
		} catch(e) {
			console.log(e.response.data.errors);
			this.setState({err: true, errMessage: e.response.data.errors});
			console.log(this.state.err);
		}
	}

	_deleteList = async (list) => {
		const config = { headers: {Authorization: "Bearer " + String(this.state.token)}};
		console.log(list);
		const listID = list.id;
		try {
			const {data} = await API.delete('/api/v1/lists/' + String(listID),config); 
			this._deleteFromMyLists(listID);
		} catch(e) {
			console.log(e.response.data.errors);
		}
	}

	_deleteFromMyLists = (listID) => {
		const newUserLists = this.state.userLists.filter(list => list.id !== listID); 
		console.log(newUserLists);
		this.setState({userLists: [...newUserLists]});
	}

	_showNewListForm = () => {
			this.setState({isModalVisible: !this.state.isModalVisible, canShowErr: false},() => {
			console.log("showModal state = ");
			console.log(this.state.isModalVisible);
		});
	}

	_onPressProfileImage = () => {
		//TODO
		console.log("Press profile image");
	}

	_storeUserInfo = data => {
		const email = data["data"]["attributes"]["email"]; 
		const firstName = data.data.attributes.first_name;
		const lastName = data.data.attributes.last_name; 
		const lists = data["included"].map( element => {
			let deadline = new Date(parseFloat(element["attributes"]["deadline"])); 
			let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
			return {
				id: element["id"], 
				name: element["attributes"]["name"], 
				ownerID: element["attributes"]["owner_id"],
				ownerName: element["attributes"]["owner_name"],
				creationDate: element["attributes"]["created-at"], 
				lastUpdate: element["attributes"]["updated-at"], 
				deadline: deadline.toLocaleDateString('en-US')  
			}
		});
		console.log(lists);
		this.setState({userEmail: email, userFirstName: firstName, userLastName: lastName, userLists: [...lists.reverse()]});
	}

	_addToMyLists = data => {
		let deadline = new Date(parseFloat(data["data"]["attributes"]["deadline"])); 
		const addedList = {
			id: data["data"]["id"],
			name: data["data"]["attributes"]["name"],
			ownerID: data["data"]["attributes"]["owner_id"],
			ownerName: data["data"]["attributes"]["owner_name"],
			deadline: deadline.toLocaleDateString('en-US'), 

		}
		this.setState({userLists: [addedList, ...this.state.userLists]});
	}

	_onCloseModal = () => {
		this.setState({isModalVisible: !this.state.isModalVisible})
		this.setState({newListName: '', newListDeadline: new Date()});
	}

	_newListNameHandler = (name) => {
		console.log(name);
		this.setState({newListName: name});
		console.log(this.state.newListName);
	}

	_addNewList = () => {
		this._postNewList();
		this._onCloseModal();
	}

	_setDeadline = (newDeadline) => {
		this.setState({newListDeadline: newDeadline}, () =>
		console.log(this.state.newListDeadline.toLocaleDateString()));
	}

	_closeErrorModal = () => {
		this.setState({err: !this.state.err, canShowErr: !this.state.canShowErr});
	}

	async componentDidMount() {
		await this._retrieveData();
		await this._getUserInfo();
		await this.setState({showModal: false});
	}
				
	render() {
		return (
			<View style = {{flex: 1}}>
				<View style = {{flex: 1}} >
					<AddList userEmail={this.state.userEmail} newList={this._showNewListForm} viewImage={this._onPressProfileImage} />
				</View>
				<View style = {{flex: 7}}>
					<TouchableList onPressDelete={this._deleteList} lists = {this.state.userLists} onPressRow = { this._onPress } />
				</View>
				<Modal 
					isVisible={this.state.isModalVisible}
	//					onBackdropPress={this._onCloseModal}
					animationInTiming={1000}
					animationOutTiming={300}
					onSwipeComplete={this._onCloseModal}
					swipeDirection="down"
					animationOut='slideOutDown'
					hideModalContentWhileAnimating = {true}
					onModalHide={() => this.setState({canShowErr: true})}
				>
					<AddListForm newListName={this.state.newListName} closeModal={this._onCloseModal} newListNameHandler = {this._newListNameHandler} commitList = {this._addNewList} setDeadline={this._setDeadline} deadline={this.state.newListDeadline}/>
				</Modal>
				<ErrorModal 
					err = {this.state.err}
					canShowErr = {this.state.canShowErr}
					close = {this._closeErrorModal} 
					headerMessage={"Can't Add New List"} 
					errMessage = {this.state.errMessage}
				/>
			</View>
		);
	}
}
