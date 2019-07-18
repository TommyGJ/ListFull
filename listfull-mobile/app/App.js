import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppContainer } from './routes/SwitchNav.js'
import { Provider } from 'react-redux'
import store from './redux/store.js'

export default class App extends React.Component {
	render() {
		return ( 
			<Provider store = {store} >
				<AppContainer />
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
