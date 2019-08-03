import { postNewList, HTTPDeleteList, HTTPPatchList, HTTPGetListItems, HTTPRemoveUserFromList, HTTPUpdateList } from './../../utils/API.js';
import * as Types from './../constants/types.js';
import normalize from 'json-api-normalizer';
import build from 'redux-object';

export const addNewList = (token, listData) => async dispatch => {
	dispatch({type: Types.ADD_LIST_STARTED});
	try {
		const {data} = await postNewList(token, listData);
		const state = normalize(data);
		dispatch({type: Types.ADD_LIST_SUCCESS, payload: state });
	} catch(error) {
		dispatch({ type: Types.ADD_LIST_FAILURE, payload: error.response.data.errors});
	}
}

export const deleteList = (token, listID) => async dispatch => {
	dispatch({type: Types.DELETE_LIST_STARTED});
	try {
		const {data} = await HTTPDeleteList(token, listID); 
		dispatch({type: Types.DELETE_LIST_SUCCESS, payload: listID});
	} catch(error) {
		dispatch({ type: Types.DELETE_LIST_FAILURE, payload: error.response.data.errors});
	}
}

export const patchNewUser = (token, listID, userData) => async dispatch => {
	dispatch({type: Types.PATCH_NEW_USER_STARTED});
	try {
		const {data} = await HTTPPatchList(token, listID, userData); 
		dispatch({type: Types.PATCH_NEW_USER_SUCCESS});
	} catch(error) {
		dispatch({ type: Types.PATCH_NEW_USER_FAILURE, payload: error.response.data.errors});
	}
}

export const removeUserFromList = (token, listID, userData) => async dispatch => {
	dispatch({type: Types.REMOVE_USER_STARTED})
	try {
		await HTTPRemoveUserFromList(token, listID, userData);
		dispatch({type: Types.REMOVE_USER_SUCCESS, payload: userData}); 
	} catch(error) {
		dispatch({type: Types.REMOVE_USER_FAILURE, payload: error.response.data.errors});
	}

}

export const updateList = (token, listID, listData) => async dispatch => {
	dispatch({type: Types.UPDATE_LIST_STARTED});
	try {
		const {data} = await HTTPUpdateList(token, listID, listData);
		state = normalize(data)
		dispatch({type: Types.UPDATE_LIST_SUCCESS, payload: state}); 
	} catch(error) {
		dispatch({type: Types.UPDATE_LIST_FAILURE, payload: error.response.data.errors});
	}
}

export const viewList = (token, listID) => async dispatch => {
	dispatch({type: Types.VIEW_LIST_STARTED});
	try {
		const {data} = await HTTPGetListItems(token, listID);
		state = normalize(data)
		dispatch({type: Types.VIEW_LIST_SUCCESS, payload: state}); 
	} catch(error) {
		dispatch({type: Types.VIEW_LIST_FAILURE});
	}
}

export const resetViewList = () => ({
	type: Types.RESET_VIEW_LIST,
});

