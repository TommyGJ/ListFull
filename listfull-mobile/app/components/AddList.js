import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import GravatarURL from './../utils/GravatarURL.js'; 

const AddList = props => {
	const onPressImage = () => {
		props.viewImage();
	}

	const onPressNewList = () => {
		props.newList();

	}
	return (
		<View style = {styles.container}>
			<View style = {styles.imageBox}>
				<TouchableOpacity onPress={onPressImage}>
					<Image
						style={{
							borderRadius: 10,
							width: 50,
							height: 50,
							resizeMode: 'cover',
						}}
						source={{
							uri: GravatarURL(props.userEmail),
						}}
					/>
				</TouchableOpacity>
			</View>
			<View style = {styles.createBox} >
				<TouchableOpacity onPress = {onPressNewList}>
					<Text style = {{fontSize: 20, color: 'gray' }}>
						{"Create A New List"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default AddList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		marginBottom: 2,
		paddingTop: 20,
		paddingBottom: 20,
		flexDirection: 'row',
	},
	imageBox: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	createBox: {
		flex: 4,
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
});

