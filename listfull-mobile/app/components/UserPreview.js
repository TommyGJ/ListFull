import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import GravatarURL from './../utils/GravatarURL.js';

const UserPreview = props => {
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
					{props.user.firstName + ' ' + props.user.lastName}
				</Text>
			</View>
			
		</View>
	);
}

UserPreview.propTypes = {
	user: PropTypes.object, 
}

const UserPreviewStyles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 5,
		paddingBottom: 5,
		marginRight: 5,
		marginLeft: 5,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: 'lightgray',
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

