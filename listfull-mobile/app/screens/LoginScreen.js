import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Button } from 'react-native'
import  Constants  from 'expo-constants'
import axios from 'axios'
import API from './../utils/API.js'
import * as SecureStore from 'expo-secure-store';
import ErrorBox from '../components/ErrorBox.js'



export default class LoginScreen extends React.Component {
	state = {
		email: 'example@example.com',
		password: 'password',
		err: false,
		errMessage: [],
	}

	static navigationOptions = {
		 title: "Login"
	};


	_handleEmail = email => {
		this.setState({email: email.toLowerCase()});
		console.log(this.state.email);
	}

	_handleLogin = async () => {
		try {
			const response = await API.post('/api/v1/authenticate', {
				auth: { email: this.state.email, password: this.state.password }
			})
			console.log(response.data);
			this._storeData(response.data);
			this.props.navigation.navigate('App');

		} catch(error) {
			console.log(error.response.data.errors);
			this.setState({err: true, errMessage: error.response.data.errors});
		}
	}

	componentDidMount() {
		this.setState({err: false});
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

	_storeData = async (data) => {
		try {
			await SecureStore.setItemAsync('user_token', data.token);
		} catch (error) {
			console.log(error);
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
						onChangeText = {this._handleEmail}
						placeholder = "Email"
						keyboardType = 'email-address'
					/>  
					<TextInput 
						style = {styles.text_box}
						value = {this.state.password}
						onChangeText = {this._handlePassword}
						placeholder = "Password"
						secureTextEntry = {true}
					/>  
				</View>
				<View style = {styles.bottomContainer}>
					<Button
						onPress={() => {
							this.setState({ err: false, errMessage: [] }, () =>
								this._handleLogin()
							);
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

