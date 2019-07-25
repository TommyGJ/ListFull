import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

class ViewCollaboratorsScreen extends React.Component {
	static navigationOptions = {
		title: "Collaborators"
	};

	render() {
		return(
			<Text>
				Hello There
			</Text>
		);
	}
}

export default connect()(ViewCollaboratorsScreen);
