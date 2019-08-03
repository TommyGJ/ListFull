import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const FormHeader = props => {
	return (
		<View style = {headerStyles.container}>
			<View style = {{flex: 1, flexDirection: 'row'}}>
				<View style = {{flex: 1, alignItems: 'flex-start'}}>
					<TouchableOpacity onPress = {props.close} >
						<MaterialCommunityIcons name="window-close" size={32} color="gray"/>
					</TouchableOpacity>
				</View>
				<View style = {{flex: 1, alignItems: 'flex-end'}}>
					<TouchableOpacity onPress = {props.submit} >
						<MaterialIcons name="add" size={35} color="dodgerblue"/>
					</TouchableOpacity>
				</View>
			</View>
			<View style = {{flex: 1, alignItems: 'center'}}>
				<Text style = {{fontSize: 24, fontWeight: 'bold',color: 'gray'}}>
					{props.text}	
				</Text>
			</View>
		</View>

	);
}

FormHeader.propTypes = {
	text: PropTypes.string,
	close: PropTypes.func,
	submit: PropTypes.func,

}


const headerStyles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'flex-start',
		marginLeft: 5,
		marginTop: 10,
		marginRight: 5,
	},
});

export default FormHeader;


