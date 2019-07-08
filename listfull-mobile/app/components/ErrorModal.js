import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ErrorBox from './ErrorBox.js'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';


const ErrorModal = props => {
	

	return (
		<Modal
			isVisible={props.err && props.canShowErr}
			animationInTiming={1000}
			animationOutTiming={300}
			swipeDirection="right"
			animationOut='slideOutRight'
			onSwipeComplete={props.close}
		>
			<View style = {styles.container}>
				<View style = {styles.headerContainer}>
						<TouchableOpacity onPress={props.close}>
							<MaterialCommunityIcons name="window-close" size={32} color="gray"/>
						</TouchableOpacity>
						<View style = {{alignItems: 'center'}}>
							<Text style = {{fontSize: 20, fontWeight: 'bold',color: 'lightcoral'}}>
								{props.headerMessage}	
							</Text>
						</View>
					</View>
				<View style = {styles.bodyContainer}>
					<ErrorBox isError = {true} messages = {props.errMessage} />
				</View>
			</View>
		</Modal>
	);

	
}

ErrorModal.propTypes = {
	err: PropTypes.bool,
	canShowErr: PropTypes.bool,
	close: PropTypes.func,
	headerMessage: PropTypes.string,
	errMessage: PropTypes.array
}

export default ErrorModal;

styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 10, 
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerContainer: {
		alignItems: 'center'
	},
	bodyContainer: {
		padding: 5,
		alignItems: 'center',
	}
	

});
