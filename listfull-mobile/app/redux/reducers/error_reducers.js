import {combineReducers} from 'redux';
import * as Types from '../constants/types.js'; 

export const errorReducer = (state = {}, action) => {
	switch(action.type) {
		case Types.LOGIN_FAILED:
			return {
				...state,
				err: true,
				errMessage: [...action.payload],
				errHeader: "Login Failed!"
			};
		case Types.ADD_LIST_FAILURE:
			return {
				...state,
				err: true,
				errMessage: [...action.payload],
				errHeader: "Can't Add New List!" 
			}
		case Types.PATCH_NEW_USER_FAILURE: 
			return {
				...state,
				err: true,
				errMessage: [...action.payload],
				errHeader: "Can't Add Collaborator!" 
			}
		case Types.USER_PREVIEW_FAILURE:
			return {
				...state,
				err: true,
				errMessage: [...action.payload],
				errHeader: "Can't Get User Preview!",
			}
		case Types.CREATE_ACCOUNT_FAILURE:
			return {
				...state,
				err: true,
				errMessage: [...action.payload],
				errHeader:"New Account Error!", 
			}
		case Types.DELETE_ITEM_FAILURE:
			return {
				...state,
				err: true,
				errMessage: [...action.payload],
				errHeader:"Can't Delete Bullet!", 
			}

		case Types.POST_ITEM_FAILURE:
			return {
				...state,
				err: true,
				errMessage: [...action.payload],
				errHeader:"Can't Add Bullet!", 
			}
		case Types.UPDATE_LIST_FAILURE:
			return {
				...state,
				err: true,
				errMessage: [...action.payload],
				errHeader:"Can't Update List!", 
			}
		case Types.RESET_ERRORS: 
			return {
				...state,
				err: false,
				errMessage: [],
				errHeader: '',
			}
		case Types.SHOW_ERRORS:
			return {
				...state,
				canShowErr: true,
			}
		case Types.HIDE_ERRORS:
			return {
				...state,
				canShowErr: false,
			}
		default:
			return state 
	}
}

