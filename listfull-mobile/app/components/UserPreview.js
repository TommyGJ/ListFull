import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import GravatarURL from './../utils/GravatarURL.js';

const UserPreview = props => {

	const handleName = () => {
		full_name = props.user.firstName + ' ' + props.user.lastName; 
		if (props.owner && props.owner.id === props.user.id) 
			return "Me"
		else
			return full_name;
	}
	return(
		<View style = {UserPreviewStyles.container}>
			<View style = {UserPreviewStyles.imageBox}>
				<Image
					style={
						UserPreviewStyles.largeImage
					}
					source={{
						uri: GravatarURL(props.user.email),
					}}
				/>
			</View>
			<View style = {UserPreviewStyles.preview}>
				<Text style = {UserPreviewStyles.largeText}>
					{handleName()}
				</Text>
			</View>
			
		</View>
	);
}

UserPreview.propTypes = {
	user: PropTypes.object, 
	list: PropTypes.object,
}

const UserPreviewStyles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 5,
		paddingBottom: 5,
		flexDirection: 'row',
		backgroundColor: '#fff',
	},
	imageBox: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	preview: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	largeImage: {
		borderRadius: 25,
		width: 50,
		height: 50,
		resizeMode: 'cover',
	},
	largeText: {
		fontSize: 18
	},
	smallImage: {
		borderRadius: 15,
		width: 30,
		height: 30,
		resizeMode: 'cover',

	},
	smallText: {
		fontSize: 14
	},


});

export default UserPreview;

