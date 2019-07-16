import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
import AddUserModal from './../components/AddUserModal.js';

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
		newListInfo: '',
		newListDeadline: new Date(),
		newListUsers: [],
		canShowErr: false,
		err: false,
		errMessage: [],
		errHeader: '',
		isAddUserModalVisible: false,
		listToAddUser: {},
		newUserEmail: '',
		refreshing: false,
	}

	static navigationOptions = {
		 title: "My Lists"
	};

	_onRefresh = async () => {
		await this.setState({refreshing: true});
		await this._getUserInfo();
		this.setState({refreshing: false});
	}

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

	//Go to list screen
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
		const userEmails = this.state.newListUsers.map(user => user.email)
		const listData = { list: { name: this.state.newListName, deadline: this.state.newListDeadline.getTime(), info: this.state.newListInfo, users: userEmails }};
		try {
			const {data} = await API.post('/api/v1/lists', listData, config);
			this._addToMyLists(data);	
		} catch(e) {
			console.log(e.response.data.errors);
			this.setState({err: true, errMessage: e.response.data.errors, errHeader: "Can't Add New List"});
			console.log(this.state.err);
		}
	}

	_deleteList = async (list) => {
		const config = { headers: {Authorization: "Bearer " + String(this.state.token)}};
		const listID = list.id;
		try {
			const {data} = await API.delete('/api/v1/lists/' + String(listID),config); 
			this._deleteFromMyLists(listID);
		} catch(e) {
			console.log(e.response.data.errors);
		}
	}

	_patchNewUser = async () => {
		const config = { headers: {Authorization: "Bearer " + String(this.state.token)}};
		const listID = this.state.listToAddUser.id; 
		const userData = { user: {email: this.state.newUserEmail } }; 
		try {
			const {data} = await API.patch('/api/v1/lists/' + String(listID) + '/add_user',userData,config); 
			return true;
		} catch(e) {
			this.setState({err: true, errMessage: e.response.data.errors, errHeader: "Can't Add User"});
			return false;
		}
	}

	_getUserPreview = async () => {
		const config = { headers: {Authorization: "Bearer " + String(this.state.token)}};
		const email = this.state.newUserEmail;
		try {
			const {data} = await API.get('/api/v1/users/preview/' + String(email),config); 
			this.setState({newListUsers: [...this.state.newListUsers, { email: email, first_name: data.data.attributes.first_name, last_name: data.data.attributes.last_name }]});
		} catch (e) {
			console.log(e.response.data.errors);
			this.setState({err: true, errMessage: e.response.data.errors});
		}
	}

	_initiateAddUser = (list) => {
		//TODO
		this.setState({isAddUserModalVisible: !this.state.isAddUserModalVisible, canShowErr: false, listToAddUser: list});
	}

	_addNewUser = async () => {
		if ( await this._patchNewUser()) {
			this.setState({newUserEmail: ''});
		} else {
			this._onCloseAddUserModal();
		}
	}

	_userAlreadyPresent = () => {
		const newEmail = this.state.newUserEmail;
		const userEmail = this.state.userEmail;
		const addedUsers = this.state.newListUsers;
		for (let user in addedUsers) {
			console.log(user);
			if (addedUsers[user].email === newEmail || addedUsers[user].email === userEmail) {
				console.log("hit");
				return true;
			}
		}
		return false;
	}

	_newListAddUser = () => {
		this.setState({err: false, errMessage: []});
		if (!this._userAlreadyPresent()) {
			this._getUserPreview();
		}
		this.setState({newUserEmail: ''});

//		console.log(this.state.newListUsers);
	}

	_deleteFromMyLists = (listID) => {
		const newUserLists = this.state.userLists.filter(list => list.id !== listID); 
//		console.log(newUserLists);
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
				deadline: deadline.toLocaleDateString('en-US'),  
				info: element["attributes"]["info"],
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
			info: data["data"]["attributes"]["info"],

		}
		this.setState({userLists: [addedList, ...this.state.userLists]});
	}

	_onCloseModal = () => {
		this.setState({isModalVisible: !this.state.isModalVisible})
		this.setState({newListName: '',newListInfo: '', newListDeadline: new Date(), newListUsers: []});
	}

	_onCloseAddUserModal = () => {
		this.setState({isAddUserModalVisible: !this.state.isAddUserModalVisible, newUserEmail: '', listToAddUser: {}})
	}

	_hideAddUserModal = () => {
		this.setState({canShowErr: true});
	}

	_newListNameHandler = (name) => {
		console.log(name);
		this.setState({newListName: name});
		console.log(this.state.newListName);
	}

	_newListInfoHandler = (info) => {
		this.setState({newListInfo: info});
		console.log(this.state.newListInfo);
	}

	_newUserEmailHandler = (email) => {
		this.setState({newUserEmail: email});
		console.log(this.state.newUserEmail);
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

	//function used to make AddListForm modal scrollable
	_handleScrollTo = p => {
		if (this.scrollViewRef) {
			this.scrollViewRef.scrollTo(p);
		}
	};

	render() {
		return (
			<View style = {{flex: 1}}>
				<View style = {{flex: 1}} >
					<AddList userEmail={this.state.userEmail} newList={this._showNewListForm} viewImage={this._onPressProfileImage} />
				</View>
				<View style = {{flex: 7}}>
					<TouchableList 
						onPressAddUser={this._initiateAddUser} 
						onPressDelete={this._deleteList} 
						lists = {this.state.userLists} 
						onPressRow = { this._onPress } 
						refreshing = { this.state.refreshing }
						onRefresh = { this._onRefresh }
					/>
				</View>
				<Modal 
					isVisible={this.state.isModalVisible}
	//					onBackdropPress={this._onCloseModal}
					animationInTiming={1000}
					animationOutTiming={300}
					animationOut='slideOutDown'
//					swipeDirection="down"
					hideModalContentWhileAnimating = {true}
					onModalHide={() => this.setState({canShowErr: true})}
					scrollTo={this._handleScrollTo}
			    scrollOffset={this.state.scrollOffset}
					scrollOffsetMax={400 - 300} // content height - ScrollView height
					style={{marginTop: 20,marginBottom: 0, marginRight: 0, marginLeft: 0, justifyContent: 'flex-end'}}
				>
					<AddListForm 
						newListName={this.state.newListName} 
						newListInfo={this.state.newListInfo}
						closeModal={this._onCloseModal} 
						newListNameHandler={this._newListNameHandler} 
						newListInfoHandler={this._newListInfoHandler}
						commitList={this._addNewList} 
						setDeadline={this._setDeadline} 
						deadline={this.state.newListDeadline}
						addUserToList={this._newListAddUser}
						userEmail={this.state.newUserEmail}
						newUserEmailHandler={this._newUserEmailHandler}
						newListUsers={this.state.newListUsers}
						err={this.state.err}
						errMessage={this.state.errMessage}
					/>
				</Modal>
				<ErrorModal 
					err = {this.state.err}
					canShowErr = {this.state.canShowErr}
					close = {this._closeErrorModal} 
					headerMessage={this.state.errHeader} 
					errMessage = {this.state.errMessage}
				/>
				<AddUserModal
					show = {this.state.isAddUserModalVisible} 
					close = {this._onCloseAddUserModal}
					onHide = {this._hideAddUserModal}
					commitUser = {this._addNewUser}
					listName = {this.state.listToAddUser.name}
					userEmailHandler = {this._newUserEmailHandler}
					userEmail = {this.state.newUserEmail}
				/>
			</View>
		);
	}
}
