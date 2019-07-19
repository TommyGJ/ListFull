import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

const InfoModal = props => {
	return(
	<Modal
		isVisible={props.show}
		animationInTiming={1000}
		animationOutTiming={300}
		onSwipeComplete={props.close}
		swipeDirection='down'
		animationOut='slideOutDown'
		onModalHide={props.hide}
		hideModalContentWhileAnimating = {true}
	>
		<View style = {infoStyles.container}>
			<View style = {infoStyles.headers}>
				<View style = {{alignItems: 'center'}}>
					<TouchableOpacity onPress={props.close}>
						<MaterialCommunityIcons name="window-close" size={32} color="gray"/>
					</TouchableOpacity>
				</View>
				<Text style = {{fontSize: 20, fontWeight: 'bold', color: 'gray'}}>
					{props.name} Information
				</Text>
			</View>
			<View style = {infoStyles.body}>
				<Text style = {{fontSize: 16, color: 'gray'}}>
					{props.info}
				</Text>
			</View>
		</View>
	</Modal>

	);
}

InfoModal.propTypes = {
	show: PropTypes.bool,
	close: PropTypes.func,
	hide: PropTypes.func,
	info: PropTypes.string,
	name: PropTypes.string,
}


infoStyles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 20,
	},
	headers: {
		paddingLeft: 10,
		paddingRight: 10,
	},
	body: {
		padding: 10,
		borderTopWidth: 1,
		borderTopColor: 'lightgray',
		justifyContent: 'center',
		alignItems: 'center',
	}
});
export default InfoModal;


