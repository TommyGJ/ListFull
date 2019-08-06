import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { resetErrors, enableShowErrors, disableShowErrors } from './../redux/actions/error_actions.js';
import { updateAccount, logOut } from './../redux/actions/user_actions.js';
import API from './../utils/API.js';
import SettingsList from './../components/SettingsList.js';
import SettingsModal from './../components/SettingsModal.js';
import ErrorModal from './../components/ErrorModal.js';

class SettingsScreen extends React.Component {
	state = {
		isVisible: false,
		modalKey: '',
	}
	static navigationOptions = {
		 title: "Settings"
	};

	_closeModal = () => {
		this.setState({isVisible: !this.state.isVisible, modalKey: ''});
	}

	_onHide = () => {
		this.props.enableShowErrors()
	}

	_openModal = (key) => {
		this.setState({isVisible: !this.state.isVisible, modalKey: key});
		this.props.disableShowErrors()
	}

	_update = (userData, url) => {
		this.props.updateAccount(this.props.token, this.props.user.id, userData, url);
		this._closeModal();
	}

	_closeErrorModal = () => {
		this.props.resetErrors()
	}
	_logOut = (key) => {
		this.props.logOut();
		this.props.navigation.navigate('AuthLoading');
	}



	render() {
		return (
			<View style = {{flex: 1}}>
				<SettingsList 
					open = {this._openModal}
					logOut = {this._logOut}

				/>
			
				<SettingsModal 
					show = {this.state.isVisible} 
					close = {this._closeModal}
					onHide = {this._onHide}
					formKey = {this.state.modalKey}
					user = {this.props.user}
					update = {this._update}
				/>
				<ErrorModal 
					err = {this.props.errors.err}
					canShowErr = {this.props.errors.canShowErr}
					close = {this._closeErrorModal} 
					headerMessage={this.props.errors.errHeader} 
					errMessage = {this.props.errors.errMessage}
				/>

			</View>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	token: state.user.token,
	errors: state.errors,
})

const actionCreators = {
	updateAccount,
	resetErrors,
	enableShowErrors,
	disableShowErrors,
	logOut
}

export default connect(mapStateToProps, actionCreators)(SettingsScreen);
