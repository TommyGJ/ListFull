import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Window } from './../utils/ScreenDimensions.js';
import UserPreview from './UserPreview.js';



const PressItemModal = props => {
	return (
	<Modal
		isVisible={props.show}
		animationInTiming={1000}
		animationOutTiming={300}
		onBackdropPress={props.close}
		onSwipeComplete={props.close}
		swipeDirection='down'
		animationOut='slideOutDown'
		onModalHide={props.onHide}
		hideModalContentWhileAnimating = {true}
		style={itemModalStyles.bottomModal}
	>
		<View style = {itemModalStyles.container}>
			<View style = {itemModalStyles.titleBox}>
				<Text style = {itemModalStyles.titleText}>
					{props.item.name}
				</Text>
			</View>
			<View style = {{flex: 5,paddingTop: 5}}>
				<View style = {itemModalStyles.bodyBox}>
					<Text style = {itemModalStyles.bodyTitle}>
						Added By:
					</Text>
					<View style = {itemModalStyles.bodyContent}>
						<Text 
							style = {itemModalStyles.bodyContentText}
							adjustsFontSizeToFit = {true} 
							numberOfLines = {1}
						>
						{`${(props.item.user === props.item.ownerId)? "Me" : props.item.ownerName} x hours/minutes/days ago`} 
						</Text>
					</View>
				</View>
				<View style = {itemModalStyles.largeBodyBox}>
					<Text style = {itemModalStyles.bodyTitle}>
						Additional Information: 
					</Text>
					<View style = {itemModalStyles.bodyContent}>
						<Text 
							style = {itemModalStyles.bodyContentText} 
							adjustsFontSizeToFit = {true} 
							numberOfLines = {3}
						>
							{props.item.info + "This is a test to see how well this works when the the text must get smaller. I hope this goes over three lines. Remeber to get some avocados from Mexico :)"}
						</Text>
					</View>
				</View>
			</View>
		
			<View style = {itemModalStyles.footer}>
				<View style = {itemModalStyles.outerBox}>
					<TouchableOpacity onPress = {() => props.toggle('/toggle_priority')} style = {{justifyContent: 'center', alignItems: 'center'}}>

						<MaterialIcons name="priority-high" size={40} color= {`${props.item.priority? 'dodgerblue' : 'lightgray'}`}/>
						<Text 
							adjustsFontSizeToFit = {true} 
							numberOfLines = {1}
							style = {itemModalStyles.iconText}
						> 
							{`${props.item.priority? 'Unprioritize' : 'Prioritize'}`}
						</Text>
					</TouchableOpacity>
				</View>
				<View style = {itemModalStyles.innerBox}> 
					<TouchableOpacity onPress = {() => props.toggle('/toggle_complete')} style = {{justifyContent: 'center', alignItems: 'center'}}>
						<MaterialIcons name="check" size={40} color= {`${props.item.complete? 'green' : 'lightgray'}`}/>
						<Text 
							adjustsFontSizeToFit = {true} 
							numberOfLines = {1}
							style = {itemModalStyles.iconText}
						> 
							{`Mark ${props.item.complete? 'Incomplete' : 'Complete'}`} 
						</Text>
					</TouchableOpacity>
				</View>

				<View style = {itemModalStyles.outerBox}> 
					<TouchableOpacity style = {{justifyContent: 'center', alignItems: 'center'}}>

						<MaterialIcons name="delete" size={40} color="lightcoral"/>
						<Text 
							adjustsFontSizeToFit = {true} 
							numberOfLines = {1}  
							style = {itemModalStyles.iconText}
						> 
							Delete 
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	</Modal>
	);
}

PressItemModal.propTypes = {
	show: PropTypes.bool,
	close: PropTypes.func,
	onHide: PropTypes.func,
	item: PropTypes.object,
	user: PropTypes.string,
	toggle: PropTypes.func,
}

itemModalStyles = StyleSheet.create({
	bottomModal: {
		flex: 1,
		justifyContent: 'flex-end',
		marginTop: (Window.height() / 2),
		margin: 0,
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 5,
		paddingBottom: 5,
	},
	footer: {
		alignSelf: 'flex-end',
		flex: 2,
		flexDirection: 'row',
		borderTopWidth: 1,
		marginHorizontal: 5,
		borderColor: 'lightgray',
	},
	outerBox: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 2,
		paddingHorizontal: 10,
		paddingTop: 10,
		marginTop: 5,
		paddingBottom: 5
	},
	innerBox: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 1,
		borderLeftWidth: 1,
		borderColor: 'lightgray',
		paddingHorizontal: 10,
		marginTop: 5,
		paddingTop: 10,
		paddingBottom: 5
	},
	iconText: {
		fontWeight: 'bold',
		color: 'gray',
	},
	titleText: {
		color: 'dimgray',
		fontSize: 24,
	},
	titleBox: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		borderBottomWidth: 1,
		borderColor: 'lightgray',
	},
	bodyBox: {
		flex: 2,
		paddingLeft: 5,
		justifyContent: 'center',
		paddingBottom: 5,
	},
	largeBodyBox: {
		flex: 3,
		paddingLeft: 5,
		justifyContent: 'center',
		paddingBottom: 5,
	},
	bodyTitle: {
		color: 'dimgray',
		fontSize: 20,
	},
	bodyContent: {
		flex: 1,
		paddingLeft: 5,
		paddingRight: 5,
		flexWrap: 'wrap',
	},
	bodyContentText: {
		flex: 1,
		textAlign: 'center',
		fontSize: 18,
		paddingHorizontal: 10,
		color: 'gray',
	}
		
});

export default PressItemModal;
