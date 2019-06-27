import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Button } from 'react-native'
import  Constants  from 'expo-constants'
import axios from 'axios'
import API from './../utils/API.js'
import {AsyncStorage} from 'react-native';
import ErrorBox from '../components/ErrorBox.js'


export default class SignUpScreen extends React.Component {
	state = {
		email: 'tommy.johnson@yale.edu',
		password: 'password',
		firstName: 'Tommy',
		lastName: 'Johnson',
		password_confirmation: 'password',
		err: false,
		errMessage: [],
	};

	static navigationOptions = {
		 title: "New Account"
	};

	_handleButton = () => {
		if (this.state.password === '' || this.state.email === '' || this.state.firstName === '' || this.state.lastName === '' || this.state.password_confirmation === '') {
			return true;
		}
		return false;
	}

	_isValidEmail = () => {
		let re = /\S+@\S+\.\S+/;
		return re.test(this.state.email);
	}

	_handleSignUp = () => {
		if (this.state.password_confirmation !== this.state.password) {
			this.setState({ err: true, errMessage: [...this.state.errMessage, [{id: "passwords", title: "don't match"}]]});
		}	else if (!this._isValidEmail()) {
			this.setState({ err: true, errMessage: [...this.state.errMessage, [{id: "email", title: "is not in correct form"}]]});
		} else {
			this._createAccount();
		}
	}

	_createAccount = async () => {
		try {
			const response = await API.post('/api/v1/users', {
				user: {
					email: this.state.email,
					password: this.state.password,
					name: this.state.firstName + ' ' + this.state.lastName,
				}
			});
			console.log(response.data);
			if (response.data["errors"]) {
				this.setState({err: true, errMessage: [...this.state.errMessage, response.data["errors"]]});
			} else {
				this.props.navigation.navigate('AuthLoading');
			}
		} catch (e) {
			console.log(e);
		}
	}

	_resetErrors = () => {
		if (this.state.err) {
			this.setState(prevState => ({err: false , errMessage: []  }));
		}
	}


	render() {
		return (
			<KeyboardAvoidingView behavior = "padding" style={styles.container}>
				<View style = {styles.topContainer}>
					<ErrorBox isError = {this.state.err} messages = {this.state.errMessage}  />
					<TextInput 
						style = {styles.text_box}
						value = {this.state.email}
						onChangeText = {email => {	
							this.setState({email: email.toLowerCase()});
							this._resetErrors();
						}}
						placeholder = "Email"
						keyboardType = 'email-address'
					/>  
					<TextInput 
						style = {styles.text_box}
						value = {this.state.firstName}
						onChangeText = {(firstName) => {
							this.setState({firstName: firstName});
							this._resetErrors();
						}}
						placeholder = "First Name"
					/>  
					<TextInput 
						style = {styles.text_box}
						value = {this.state.lastName}
						onChangeText = {(lastName) => {
							this.setState({lastName: lastName});
							this._resetErrors()
						}}
						placeholder = "Last Name"
					/>  

				</View>
				<View style = {styles.bottomContainer}>
					<TextInput 
						style = {styles.text_box}
						value = {this.state.password}
						onChangeText = {password => {
							this.setState({password: password});
							this._resetErrors();
						}}
						placeholder = "Password"
						secureTextEntry = {true}
					/>  
					<TextInput 
						style = {styles.text_box}
						value = {this.state.password_confirmation}
						onChangeText = {password_confirmation => {
							this.setState({password_confirmation: password_confirmation});
							this._resetErrors();
						}}
						placeholder = "Password Confirmation"
						secureTextEntry = {true}
					/>  
					<Button
						onPress={() => {
							this.setState({ err: false, errMessage: [] }, () =>
									this._handleSignUp()
							);
						}}
						title="Create Account"
						disabled = {this._handleButton()}
					/>
				</View>
			</KeyboardAvoidingView>

		);
	}
}

const styles = StyleSheet.create({
	  container: {
			backgroundColor: '#fff',
			flex: 2, 
			paddingTop: Constants.statusBarHeight,
		},
	  topContainer: {
			flex: 1,
			justifyContent: 'flex-end',
		},
	  bottomContainer: {
			flex: 1,
			justifyContent: 'flex-start',
		},
	  text_box: {
			borderWidth: 2,
			borderRadius: 3,
			height: 40,
			borderColor: 'black',
			margin: 5,
			paddingLeft: 15,
		},
		error: {
			alignItems: 'center',
		}
});

