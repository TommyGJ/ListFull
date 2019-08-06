import React from 'react';
import { connect } from 'react-redux';
import {
	  ActivityIndicator,
	  AsyncStorage,
	  StatusBar,
	  StyleSheet,
	  View,
} from 'react-native';

class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props);
		this._bootstrapAsync();
	}

	_bootstrapAsync = async () => {
		this.props.navigation.navigate(this.props.token ? 'App' : 'Auth')
	};

	render() {
		return (
			<View style = {{flex: 1, justifyContent: 'center'}}>
				<ActivityIndicator size = "large" />
				<StatusBar barStyle="default" />
			</View>
		);
	}
}

const mapStateToProps = state => ({
	token: state.user.token
});
export default connect(mapStateToProps)(AuthLoadingScreen)

