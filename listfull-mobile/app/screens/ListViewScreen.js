import React from 'react';
import { connect } from 'react-redux';
import { resetViewList, viewList } from './../redux/actions/list_actions.js';
import { toggle, toggleItem, unToggleItem, deleteItem } from './../redux/actions/item_actions.js';
import { resetErrors, enableShowErrors } from './../redux/actions/error_actions.js';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import API from './../utils/API.js';
import AddList from './../components/AddList.js';
import ItemsList from './../components/ItemsList.js';
import PressItemModal from './../components/PressItemModal.js';
import ErrorModal from './../components/ErrorModal.js';

class ListViewScreen extends React.Component {
	state = {
		isItemModalVisible: false,
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('list'),  
		};
	};

	_navigateTo = (screen) => {
		this.props.navigation.navigate(screen);
	}

	componentDidMount() {
		this._updateTitle()
	}

	componentDidUpdate() {
		if (this.props.navigation.getParam('list') != this.props.list.name) {
			this._updateTitle()
		}
	}
	_updateTitle = () => {
		this.props.navigation.setParams({list: this.props.list.name})
	}

	componentWillUnmount() {
		this.props.resetViewList();
	}

	_getData =  () => {
		this.props.viewList(this.props.token, this.props.list.id);
	}

	_toggleItemModal = ()  => {
		this.setState({isItemModalVisible: !this.state.isItemModalVisible});
	}

	_openItemModal = (item) => {
		this.props.toggleItem(item);
		this._toggleItemModal();
	}

	_closeItemModal = () => {
		this.props.unToggleItem();
		this._toggleItemModal();
	}

	_deleteItem = () => {
		console.log("delete this item");
		console.log(this.props.toggledItem.id);
		this.props.deleteItem(this.props.token, this.props.toggledItem.id);
		this._closeItemModal();
	}

	_toggle = (url) => {
		this.props.toggle(this.props.token, this.props.toggledItem.id, url)
	}

	_hideItemModal = () => {
		this.props.enableShowErrors();
	}

	render() {
		return (
			<View style = {{flex: 1}}>
				<ItemsList
					items = {this.props.items}
					owner = {this.props.owner}
					list = {this.props.list}
					goTo = {this._navigateTo}
					getData = {this._getData}
					openItem = {this._openItemModal}
				/>
				<PressItemModal
					show = {this.state.isItemModalVisible}
					close = {this._closeItemModal}
					onHide = {this._hideItemModal}
					user = {this.props.owner}
					item = {this.props.toggledItem}
					toggle = {this._toggle}
					del = {this._deleteItem}
				/>
				<ErrorModal 
					err = {this.props.errors.err}
					canShowErr = {this.props.errors.canShowErr}
					close = {() => this.props.resetErrors()} 
					headerMessage={this.props.errors.errHeader} 
					errMessage = {this.props.errors.errMessage}
				/>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	list: state.viewList,
	users: state.listUsers,
	token: state.user.token,
	items: state.items,
	owner: state.user.id,
	toggledItem: state.toggledItem,
	errors: state.errors,
})

const actionCreators = {
	resetViewList,
	resetErrors,
	viewList,
	toggle,
	toggleItem,
	unToggleItem,
	deleteItem,
	enableShowErrors
}

export default connect(mapStateToProps, actionCreators)(ListViewScreen);   


