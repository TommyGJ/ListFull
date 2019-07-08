import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Button, Keyboard } from 'react-native'
import  Constants  from 'expo-constants'
import axios from 'axios'
import API from './../utils/API.js'
import {AsyncStorage} from 'react-native';
import ErrorModal from '../components/ErrorModal.js'


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

	_closeError = () => {
		this.setState({err: false});
	}

	_createAccount = async () => {
		try {
			const response = await API.post('/api/v1/new_account', {
				user: {
					email: this.state.email,
					password: this.state.password,
					password_confirmation: this.state.password_confirmation,
					first_name: this.state.firstName,
					last_name: this.state.lastName
				}
			});
			console.log(response.data);
			this.props.navigation.navigate('AuthLoading');
		} catch (e) {
			console.log(e.response.data)
			this.setState({err: true, errMessage: e.response.data["errors"]});

		}
	}

	render() {
		return (
			<KeyboardAvoidingView behavior = "padding" style={styles.container}>
				<View style = {styles.topContainer}>
					<ErrorModal 
						err={this.state.err}
						close={this._closeError}
						canShowErr={true}
						headerMessage={"New Account Error!"}
						errMessage = {this.state.errMessage}
					/>
					<TextInput 
						style = {styles.text_box}
						value = {this.state.email}
						onChangeText = {email => {	
							this.setState({email: email.toLowerCase()});
						}}
						placeholder = "Email"
						keyboardType = 'email-address'
					/>  
					<TextInput 
						style = {styles.text_box}
						value = {this.state.firstName}
						onChangeText = {(firstName) => {
							this.setState({firstName: firstName});
						}}
						placeholder = "First Name"
					/>  
					<TextInput 
						style = {styles.text_box}
						value = {this.state.lastName}
						onChangeText = {(lastName) => {
							this.setState({lastName: lastName});
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
						}}
						placeholder = "Password"
						secureTextEntry = {true}
					/>  
					<TextInput 
						style = {styles.text_box}
						value = {this.state.password_confirmation}
						onChangeText = {password_confirmation => {
							this.setState({password_confirmation: password_confirmation});
						}}
						placeholder = "Password Confirmation"
						secureTextEntry = {true}
					/>  
					<Button
						onPress={() => { 
								Keyboard.dismiss();
								this._createAccount();
							}
						}
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

