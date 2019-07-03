import React from 'react';
import { View, Text } from 'react-native';
import {AsyncStorage} from 'react-native';
import { decode_jwt } from '../utils/Decode.js';
import axios from 'axios';
import API from './../utils/API.js';
import  ShowLists  from './../components/ShowLists.js';
import * as SecureStore from 'expo-secure-store';
import AddList from './../components/AddList.js';
import AddListModalScreen from './../screens/AddListModalScreen.js'

export default class DashBoardScreen extends React.Component {
	state = {
		token: null,
		userID: null,
		userEmail: '',
		userName: '',
		userLists: [],
		showModal: false,
	}

	static navigationOptions = {
		 title: "My Lists"
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
	_onPress = (listData) => {
		console.log(listData)
		this.props.navigation.navigate('ListView', {
			list: listData,
		});
	}

	_getUserInfo = async () => {
		try {
			const {data} = await API.get('/api/v1/me', {
				headers: {Authorization: "Bearer " + String(this.state.token)}
			});
			//console.log(data);
			this._storeUserInfo(data);
		} catch(e) {
			console.log(e);
		}
	}

	_showNewListForm = async () => {
		await this.setState({showModal: !this.state.showModal},() => {
			console.log("showModal state = ");
			console.log(this.state.showModal);
		});
	}

	_onPressProfileImage = () => {
		console.log("Press profile image");
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
	}

	async componentDidMount() {
		await this._retrieveData();
		await this._getUserInfo();
		await this.setState({showModal: false});
	}
				
	render() {
		return (
			<View style = {{flex: 1}}>
				<View style = {{flex: 1}} >
					<AddList newList={this._showNewListForm} viewImage={this._onPressProfileImage} />
				</View>
				<View style = {{flex: 7}}>
					<ShowLists lists = {this.state.userLists} onPress = { this._onPress } />
				</View>
					<AddListModalScreen isModalVisible={this.state.showModal} closeModal={() => this.setState({showModal: !this.state.showModal})}   />
			</View>
		);
	}
}
