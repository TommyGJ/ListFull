import React from 'react'
import { View, Text, Button } from 'react-native'
import {AsyncStorage} from 'react-native';
import { decode_jwt } from '../utils/Decode.js'
import axios from 'axios'
import API from './../utils/API.js'
import * as SecureStore from 'expo-secure-store';
import TouchableList from './../components/TouchableList.js'
import AddList from './../components/AddList.js'

export default class ListViewScreen extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			listName: this.props.navigation.getParam('list').name,
			listID: this.props.navigation.getParam('list').id,
			token: '',
			items: [],
		}
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('list').name, 
			headerRight:  (
				<Button
					onPress={() => alert('This is a button!')}
					title="Info"
					color="#fff"
				/>
			)
		};
	};

	_retrieveData = async () => {
	  try {
			const value = await SecureStore.getItemAsync('user_token');
			if (value !== null) {
				this.setState({token: value});
			}
		} catch (error) {
				 // Error retrieving data
		}
	}

	_getListInfo = async () => {
		try {
			const {data} = await API.get('/api/v1/lists/' + String(this.state.listID), {
				headers: {Authorization: "Bearer " + String(this.state.token)}
			});
			console.log(data);
			this._storeListInfo(data);
		} catch(e) {
			console.log(e);
		}
	}

	_storeListInfo = data => {
		const items = data["included"].map( element => {
			return {
				id: element["id"], 
				name: element["attributes"]["name"], 
				info: element["attributes"]["info"],
			}
		});
		this.setState({items: [...items]});
	}


	async componentDidMount() {
		await this._retrieveData();
		await this._getListInfo();
		console.log(this.state.items);
	}

	render() {
		return(
			<View style = {{ flex: 1 }}>
				<TouchableList lists = {this.state.items}  />
			</View>
		);
	}
	
}

