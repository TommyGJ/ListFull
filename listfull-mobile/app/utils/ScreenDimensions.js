import { Dimensions } from 'react-native';

export const Window = {
	height: () => Dimensions.get('window').height,
	width: () => Dimensions.get('window').width,
}
