import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { postNewItem } from './../redux/actions/item_actions.js';
import { enableShowErrors } from './../redux/actions/error_actions.js';
import AddBulletForm from './../components/AddBulletForm.js';

class AddBulletModal extends React.Component {

	_postNewItem = (itemName, itemInfo) => {
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
	user: state.user
});

const actionCreators = {
	postNewItem,
	enableShowErrors,
}

export default connect(mapStateToProps, actionCreators)(AddBulletModal);
