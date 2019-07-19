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
import InfoModal from './../components/InfoModal.js';

class DashBoardScreen extends React.Component {
	state = {
		isModalVisible: false,
		isAddUserModalVisible: false,
		isInfoModalVisible: false,
		toggledList: {},
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

	_postNewList = (name, info, deadline) => {
		const userEmails = this.props.userPreviews.map(user => user.email)
		const listData = { list: { name: name, deadline: deadline.getTime(), info: info, users: userEmails }};
		this.props.addNewList(this.props.token, listData);
	}

	_deleteList = (list) => {
		const listID = list.id;
		this.props.deleteList(this.props.token, listID);
	}

	_patchNewUser = (email) => {
		const listID = this.state.toggledList.id; 
		const userData = { user: {email: email } }; 
		this.props.patchNewUser(this.props.token, listID, userData);
	}

	_getUserPreview = (email) => {
		this.props.getUserPreview(this.props.token, email);
	}

	_initiateAddUser = (list) => {
		//TODO
		this.setState({isAddUserModalVisible: !this.state.isAddUserModalVisible, toggledList: list});
		this.props.enableShowErrors();
	}

	_initiateShowInfo = (list) => {
		this.setState({isInfoModalVisible: !this.state.isInfoModalVisible, toggledList: list});
	}

	_addNewUser = (email) => {
		this._patchNewUser(email);
		this._onCloseAddUserModal();
	}

	_userAlreadyPresent = (email) => {
		const userEmail = this.props.user.email;
		if (email === userEmail) return true;
		const addedUsers = this.props.userPreviews;
		for (let user in addedUsers) {
			if (addedUsers[user].email === email) return true;
		}
		return false;
	}

	_newListAddUser = (email) => {
		if (!this._userAlreadyPresent(email)) {
			this._getUserPreview(email);
		}
	}

	_showNewListForm = () => {
			this.props.disableShowErrors();
			this.setState({isModalVisible: !this.state.isModalVisible});
	}

	_onPressProfileImage = () => {
		//TODO
		console.log("Press profile image");
	}

	_onCloseModal = () => {
		this.setState({isModalVisible: !this.state.isModalVisible})
		this.props.resetUserPreviews();
	}

	_onCloseAddUserModal = () => {
		this.setState({isAddUserModalVisible: !this.state.isAddUserModalVisible,toggledList: {}})
	}

	_onCloseInfoModal = () => {
		this.setState({isInfoModalVisible: !this.state.isInfoModalVisible,toggledList: {}})


	}

	_addNewList = (name, info, deadline) => {
		this._postNewList(name, info, deadline);
		this._onCloseModal();
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
						onPressInfo = {this._initiateShowInfo}
						lists = {this.props.lists} 
						onPressRow = { this._onPress } 
						getData = { this._getUserInfo }
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
						closeModal={this._onCloseModal} 
						commitList={this._addNewList} 
						addUserToList={this._newListAddUser}
						newListUsers={this.props.userPreviews}
						err={this.props.errors.err}
						errMessage={this.props.errors.errMessage}
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
					onHide = {this.props.enableShowErrors}
					commitUser = {this._addNewUser}
					listName = {this.state.toggledList.name}
				/>
				<InfoModal 
					show = {this.state.isInfoModalVisible}
					close = {this._onCloseInfoModal}
					hide = {this.props.enableShowErrors}
					info = {this.state.toggledList.info}
					name = {this.state.toggledList.name}
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


