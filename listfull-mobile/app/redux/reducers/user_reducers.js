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
		case Types.CREATE_ACCOUNT_SUCCESS:
			return {
				...state,
				creation_token: "Account Created Successfully",
			}
		case Types.RESET_CREATION_TOKEN:
			return {
				...state,
				creation_token: '',
			}
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

const mapUsers = (users) => {
	return(user.map(user => ({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		})
	));
}

export const listUsersReducer = (state = [], action) => {
	switch(action.type) {
		case Types.VIEW_LIST_SUCCESS:
			const users = build(action.payload, 'user', null);
			if (!users) return [];
			const usersArray = mapUsers(users);
			return [
				...usersArray,
			];
		case Types.RESET_VIEW_LIST: 
			return [];
		default: 
			return state
	}
}

