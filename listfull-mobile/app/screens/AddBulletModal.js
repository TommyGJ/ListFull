import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { postNewItem } from './../redux/actions/item_actions.js';
import { enableShowErrors } from './../redux/actions/error_actions.js';
import { getNewAccessToken } from './../redux/actions/user_actions.js';
import AddBulletForm from './../components/AddBulletForm.js';
import { needRefresh } from './../utils/API.js';

class AddBulletModal extends React.Component {

	_postNewItem = (itemName, itemInfo) => {
		needRefresh(this.props.token, this.props.refresh_token, this.props.getNewAccessToken);
		const itemData = { item: {name: itemName, info: itemInfo, list_id: this.props.list.id, user_id: this.props.user.id} };
		this.props.postNewItem(this.props.token, itemData);
		this.props.enableShowErrors();
	}

	render() {
		return(
			<View style = {{flex: 1}}>
				<AddBulletForm 
					goBack = {this.props.navigation.goBack} 
					submitItem = {this._postNewItem}
				/>
			</View>

		);
	}
}

const mapStateToProps = state => ({
	list: state.viewList,
	token: state.user.token,
	refresh_token: state.user.refresh_token,
	user: state.user
});

const actionCreators = {
	postNewItem,
	enableShowErrors,
	getNewAccessToken,
}

export default connect(mapStateToProps, actionCreators)(AddBulletModal);
