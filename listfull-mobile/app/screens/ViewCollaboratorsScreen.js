import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { removeUserFromList, viewList, patchNewUser } from './../redux/actions/list_actions.js';
import { resetErrors } from './../redux/actions/error_actions.js';
import  CollaboratorsList  from './../components/CollaboratorsList.js';
import ErrorModal from './../components/ErrorModal.js';

class ViewCollaboratorsScreen extends React.Component {
	static navigationOptions = {
		title: "Collaborators"
	};

	_removeUser = (user) => {
		const userData = {user: { id: user.id }}
		this.props.removeUserFromList(this.props.token, this.props.list.id, userData) 
	}
	_getData =  () => {
		this.props.viewList(this.props.token, this.props.list.id);
	}

	_addUser = async (email) => {
		const listID = this.props.list.id
		const userData = { user: {email: email} }
		await this.props.patchNewUser(this.props.token, listID, userData)
		//TODO 
		//This could be made faster if have a reducer for patchNewUser instead of having to call get data again
		this._getData()
	}

	render() {
		return(
			<View style = {{flex: 1}}>
				<CollaboratorsList 
					users = {this.props.users}
					current_user = {this.props.current_user}
					list = {this.props.list}
					removeUser = {this._removeUser}
					getData = { this._getData }
					addUser = { this._addUser }
				/>
				<ErrorModal 
					err = {this.props.errors.err}
					canShowErr = {true}
					close = {() => this.props.resetErrors()} 
					headerMessage={this.props.errors.errHeader} 
					errMessage = {this.props.errors.errMessage}
				/>
			</View>

		);
	}
}

const mapStateToProps = state => ({
	list: state.viewList,
	users: state.listUsers,
	current_user: state.user,
	token: state.user.token,
	errors: state.errors,
})

const actionCreators = {
	removeUserFromList,
	viewList,
	patchNewUser,
	resetErrors,
}

export default connect(mapStateToProps, actionCreators)(ViewCollaboratorsScreen);
