import React from 'react'
import { View, Text } from 'react-native'
import {AsyncStorage} from 'react-native';
import { decode_jwt } from '../utils/Decode.js'
import axios from 'axios'
import API from './../utils/API.js'
import  ShowLists  from './../components/ShowLists.js'
import * as SecureStore from 'expo-secure-store';




export default class DashBoardScreen extends React.Component {
	state = {
		token: null,
		userID: null,
		userEmail: '',
		userName: '',
		userLists: [],
	}

	 static navigationOptions = {
		 title: "Listr"
	 };


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

	_getUserInfo = async () => {
		try {
			const {data} = await API.get('/api/v1/users/' + String(this.state.userID), {
				headers: {Authorization: "Bearer " + String(this.state.token)}
			});
			console.log(data);
			this._storeUserInfo(data);
		} catch(e) {
			console.log(e);
		}
	}

	_storeUserInfo = data => {
		const email = data["data"]["attributes"]["email"]; 
		const name = data["data"]["attributes"]["name"]; 
		const lists = data["included"].map( element => {
			return {
				id: element["id"], 
				name: element["attributes"]["name"], 
				ownerID: element["relationships"]["user"]["data"]["id"],
				creationDate: element["attributes"]["created-at"], 
				lastUpdate: element["attributes"]["updated-at"], 
			}
		});

		this.setState({userEmail: email, userName: name, userLists: [...lists]});
		console.log(this.state.userEmail);
		console.log(this.state.userName);
		console.log(this.state.userLists);

	}

	async componentDidMount() {
		await this._retrieveData();
		console.log(this.state.userID);
		await this._getUserInfo();
	}
				
	render() {
		return (
			<View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ShowLists lists = {this.state.userLists} />
			</View>
		);
	}
}
