import {combineReducers} from 'redux';
import * as Types from '../constants/types.js'; 
import build from 'redux-object';

const initialUserState = {
	token: '',
};

export const userReducer = (state = initialUserState, action) => {
	switch(action.type) {
		case Types.LOGIN_SUCCESSFUL:
			return {
				...state,
				token: action.payload.token,
			};
		case Types.USER_UPDATE_SUCCESS:
			const user = build(action.payload, 'user')[0];
			return {
				...state,
				email: user.email, 
				firstName: user.firstName, 
				lastName: user.lastName,
				id: user.id,
			};
		default:
			return state;
	}
}

export const userPreviewReducer = (state = [], action) => {
	switch(action.type) {
		case Types.USER_PREVIEW_SUCCESS:
			const user = build(action.payload, 'user')[0];
			return [
				...state,
				{
					email: user.email,
					firstName: user.firstName, 
					lastName: user.lastName,
				}
			]
		case Types.RESET_USER_PREVIEWS: 
			return []
		default:
			return state
	}
}

