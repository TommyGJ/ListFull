import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import EditListForm from './../components/EditListForm.js'
import { resetErrors } from './../redux/actions/error_actions.js';
import { updateList } from './../redux/actions/list_actions.js';
import ErrorModal from './../components/ErrorModal.js';

class ListSettingsScreen extends React.Component {
	static navigationOptions = {
		title: "Edit List"
	};

	_updateList = (name, info, deadline) => {
		const listData = { list: {name: name, deadline: deadline.getTime(), info: info} };
		this.props.updateList(this.props.token, this.props.list.id, listData)
		this.props.navigation.setParams({list: name})
	}
	render() {
		return (
			<View style = {{flex: 1}}>
				<EditListForm 
					list = {this.props.list} 
					update = {this._updateList}
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
	current_user: state.user,
	token: state.user.token,
	errors: state.errors,
})

const actionCreators = {
	resetErrors,
	updateList,
}

export default connect(mapStateToProps, actionCreators)(ListSettingsScreen);
