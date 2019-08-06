import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar } from 'react-native';
import { AppContainer } from './routes/SwitchNav.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store.js';
//import store from './redux/store.js';

export default class App extends React.Component {
	_loading = () => {
		return (
			<View style = {{flex: 1,justifyContent: 'center'}}>
				<ActivityIndicator size = "large" />
			</View>
		);
	}
	render() {
		return ( 
			<Provider store = {store} >
				<PersistGate loading={this._loading()} persistor={persistor}>
					<AppContainer />
				</PersistGate>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
