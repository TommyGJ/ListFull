import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const NavigationButtons = props => {
	return (
		<View style = {buttonStyles.container}>
			<TouchableOpacity onPress = {() => navigate(props.itemIndex - 1)} >
				<MaterialIcons name="navigate-before" size={50} color="dodgerblue"/>
			</TouchableOpacity>
			<TouchableOpacity onPress = {() => props.goBack()}>
				<MaterialIcons name="close" size={45} color="lightcoral"/>
			</TouchableOpacity>
			<TouchableOpacity onPress = {() => navigate(props.itemIndex + 1)}>
				<MaterialIcons name="navigate-next" size={50} color="dodgerblue"/>
			</TouchableOpacity>
		</View>


	);
}

NavigationButtons.propTypes = {	
	navigate: PropTypes.func,
	itemIndex: PropTypes.number,
	goBack: PropTypes.func,
}

const buttonStyles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	}
});

export default NavigationButtons;


