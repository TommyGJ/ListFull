import React from 'react';
import { connect } from 'react-redux';
import { updateUser, getUserPreview, resetUserPreviews } from './../redux/actions/user_actions.js';
import { addNewList, deleteList, patchNewUser } from './../redux/actions/list_actions.js';
import { resetErrors, enableShowErrors, disableShowErrors } from './../redux/actions/error_actions.js';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { decode_jwt } from '../utils/Decode.js';
import API from './../utils/API.js';
import axios from 'axios';
import TouchableList  from './../components/TouchableList.js';
import AddList from './../components/AddList.js';
import AddListForm from './../components/AddListForm.js';
import Modal from 'react-native-modal';
import ErrorModal from './../components/ErrorModal.js';
import AddUserModal from './../components/AddUserModal.js';

class DashBoardScreen extends React.Component {
	state = {
		isModalVisible: false,
		newListName: '',
		newListInfo: '',
		newListDeadline: new Date(),
		isAddUserModalVisible: false,
		listToAddUser: {},
		newUserEmail: '',
		refreshing: false,
	}

	static navigationOptions = {
		 title: "My Lists"
	};

	componentDidMount() {
		this._getUserInfo();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.lists) {
			console.log(nextProps.lists)
		}
	}

	_onRefresh = async () => {
		await this.setState({refreshing: true});
		await this._getUserInfo();
		await this.setState({refreshing: false});
	}

	//Go to list screen
	_onPress = (listData) => {
		//console.log(listData)
		this.props.navigation.navigate('ListView', {
			list: listData,
		});
	}

	_getUserInfo = () => {
		this.props.updateUser(this.props.token);
	}

	_postNewList = () => {
		const userEmails = this.props.userPreviews.map(user => user.email)
		const listData = { list: { name: this.state.newListName, deadline: this.state.newListDeadline.getTime(), info: this.state.newListInfo, users: userEmails }};
		this.props.addNewList(this.props.token, listData);
	}

	_deleteList = (list) => {
		const listID = list.id;
		this.props.deleteList(this.props.token, listID);
	}

	_patchNewUser = async () => {
		const listID = this.state.listToAddUser.id; 
		const userData = { user: {email: this.state.newUserEmail } }; 
		this.props.patchNewUser(this.props.token, listID, userData);
	}

	_getUserPreview = () => {
		const email = this.state.newUserEmail;
		this.props.getUserPreview(this.props.token, email);
	}

	_initiateAddUser = (list) => {
		//TODO
		this.setState({isAddUserModalVisible: !this.state.isAddUserModalVisible, listToAddUser: list});
		this.props.enableShowErrors();
	}

	_addNewUser = async () => {
		this._patchNewUser();
		this._onCloseAddUserModal();
	}

	_userAlreadyPresent = () => {
		const newEmail = this.state.newUserEmail;
		const userEmail = this.props.user.email;
		if (newEmail === userEmail) {
			return true;
		}
		const addedUsers = this.props.userPreviews;
		for (let user in addedUsers) {
			if (addedUsers[user].email === newEmail) {
				console.log("hit");
				return true;
			}
		}
		return false;
	}

	_newListAddUser = () => {
		//this.setState({err: false, errMessage: []});
		if (!this._userAlreadyPresent()) {
			this._getUserPreview();
		}
		this.setState({newUserEmail: ''});

	}

	_showNewListForm = () => {
			this.props.disableShowErrors
			this.setState({isModalVisible: !this.state.isModalVisible},() => {
			console.log("showModal state = ");
//			console.log(this.state.isModalVisible);
		});
	}

	_onPressProfileImage = () => {
		//TODO
		console.log("Press profile image");
	}

	_onCloseModal = () => {
		this.setState({isModalVisible: !this.state.isModalVisible})
		this.setState({newListName: '',newListInfo: '', newListDeadline: new Date(),});
		this.props.resetUserPreviews();
	}

	_onCloseAddUserModal = () => {
		this.setState({isAddUserModalVisible: !this.state.isAddUserModalVisible, newUserEmail: '', listToAddUser: {}})
	}

	_hideAddUserModal = () => {
		this.props.enableShowErrors();
	}

	_newListNameHandler = (name) => {
//		console.log(name);
		this.setState({newListName: name});
		console.log(this.state.newListName);
	}

	_newListInfoHandler = (info) => {
		this.setState({newListInfo: info});
//		console.log(this.state.newListInfo);
	}

	_newUserEmailHandler = (email) => {
		this.setState({newUserEmail: email});
//		console.log(this.state.newUserEmail);
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
		this.props.disableShowErrors()
		this.props.resetErrors();
	}
	_handleScrollTo = p => {
		if (this.scrollViewRef) {
			this.scrollViewRef.scrollTo(p);
		}
	};

	render() {
		return (
			<View style = {{flex: 1}}>
				<View style = {{flex: 1}} >
					<AddList userEmail={this.props.userEmail} newList={this._showNewListForm} viewImage={this._onPressProfileImage} />
				</View>
				<View style = {{flex: 7}}>
					<TouchableList 
						onPressAddUser={this._initiateAddUser} 
						onPressDelete={this._deleteList} 
						lists = {this.props.lists} 
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
					onModalHide={() => this.props.enableShowErrors()}
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
						newListUsers={this.props.userPreviews}
						err={this.props.err}
						errMessage={this.props.errMessage}
					/>
				</Modal>

				<ErrorModal 
					err = {this.props.errors.err}
					canShowErr = {this.props.errors.canShowErr}
					close = {this._closeErrorModal} 
					headerMessage={this.props.errors.errHeader} 
					errMessage = {this.props.errors.errMessage}
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

const mapStateToProps = state => ({
	user: state.user,
	token: state.user.token,
	lists: state.lists,
	errors: state.errors,
	userPreviews: state.userPreviews,
})
const actionCreators = {
	updateUser,
	addNewList,
	deleteList,
	resetErrors,
	enableShowErrors,
	disableShowErrors,
	patchNewUser,
	getUserPreview,
	resetUserPreviews,
}

export default connect(mapStateToProps,actionCreators)(DashBoardScreen);


