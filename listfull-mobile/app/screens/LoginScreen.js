import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Button, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import  Constants  from 'expo-constants';
import API from './../utils/API.js';
import * as SecureStore from 'expo-secure-store';
import ErrorModal from '../components/ErrorModal.js';
import SingleLineTextEntry from '../components/SingleLineTextEntry.js';

import { logInUser } from './../redux/actions/user_actions.js'; 
import { resetErrors } from './../redux/actions/error_actions.js'; 



class LoginScreen extends React.Component {
	state = {
		email: 'example@example.com',
		password: 'password',
	}

	static navigationOptions = {
		 title: "Login"
	};

	_handleEmail = email => {
		this.setState({email: email.toLowerCase()});
		console.log(this.state.email);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.token) {
			console.log(nextProps.token);
			this.props.navigation.navigate('App')
		}
	}
	_handleLogin = async () => {
		this.props.logInUser(this.state.email, this.state.password);
	}

	_closeError = () => {
		this.props.resetErrors();
		this.setState({email: '', password: ''});
	}
	componentDidMount() {
		this.props.resetErrors();
	}
	_handlePassword = password => {
		this.setState({password: password});
	}

	_handleButton = () => {
		if (this.state.password === '' || this.state.email === '') {
			return true;
		}
		return false;
	}

	render() {
		return (
			<KeyboardAvoidingView behavior = "padding" style={styles.container}>
				<View style = {styles.topContainer}>
					<ErrorModal 
						err={this.props.err}
						close={this._closeError}
						canShowErr={true}
						headerMessage={"Login Error!"}
						errMessage = {this.props.errMessage}
					/>
					<SingleLineTextEntry
						value = {this.state.email}
						placeholder = "Email"
						onChangeValue = {this._handleEmail}
						keyboardType = 'email-address'
					/>
					<SingleLineTextEntry
						value = {this.state.password}
						onChangeValue = {this._handlePassword}
						placeholder = "Password"
						secureTextEntry = {true}
					/>
				</View>
				<View style = {styles.bottomContainer}>
					<Button
						onPress={() => {
								Keyboard.dismiss();
								this._handleLogin();
							
						}}
						title="Log In"
						disabled = {this._handleButton()}
					/>
					<View style = {styles.bottomSubContainer}>
						<Button 
							onPress = {() => {this.props.navigation.navigate('SignUp')}}
							title="Sign Up"
						/>
						<Button 
							onPress = {() => {this.props.navigation.navigate('SignUp')}}
							title="Forgot Password"
						/>
					</View>
				</View>
			</KeyboardAvoidingView>

		);
	}
}

const styles = StyleSheet.create({
	  container: {
			backgroundColor: '#fff',
			flex: 3, 
			paddingTop: Constants.statusBarHeight,
		},
	  topContainer: {
			flex: 2,
			justifyContent: 'flex-end',
		},
	  bottomContainer: {
			flex: 2,
			justifyContent: 'flex-start',
		},
		bottomSubContainer: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'baseline',
			justifyContent: 'center',
		},
		error: {
			alignItems: 'center',
		}
});

const mapStateToProps = state => ({
	err: state.errors.err,
	errMessage: state.errors.errMessage,
	token: state.user.token,
	user: state.user,
});

const actionCreators = {
	logInUser,
	resetErrors,
}

export default connect(mapStateToProps, actionCreators)(LoginScreen)

