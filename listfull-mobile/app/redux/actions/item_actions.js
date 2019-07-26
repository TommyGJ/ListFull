import { HTTPPostItem, HTTPPatchItem, HTTPDeleteItem } from './../../utils/API.js';
import * as Types from './../constants/types.js';
import normalize from 'json-api-normalizer';
import build from 'redux-object';

export const resetItems = () => ({
	type: Types.RESET_ITEMS
});

export const deleteItem = (token, itemID) => async dispatch => {
	dispatch({type: Types.DELETE_ITEM_STARTED});
	try {
		await HTTPDeleteItem(token, itemID);  
		dispatch({type: Types.DELETE_ITEM_SUCCESS, payload: itemID});
	} catch(error) {
		dispatch({type: Types.DELETE_ITEM_FAILURE, payload: error.response.data.errors });
	}
}

export const postNewItem = (token, itemData) => async dispatch => {
	dispatch({type: Types.POST_ITEM_STARTED});
	try {
		const {data} = await HTTPPostItem(token, itemData)  
		const state = normalize(data)
		dispatch({type: Types.POST_ITEM_SUCCESS, payload: state});
	} catch(error) {
		dispatch({type: Types.POST_ITEM_FAILURE, payload: error.response.data.errors });
	}
}

export const toggle = (token, itemID, url_ext) => async dispatch => {
	console.log("here");
	dispatch({type: Types.TOGGLE_STARTED});
	try {
		const {data} = await HTTPPatchItem(token, itemID, url_ext)  
		const state = normalize(data)
		dispatch({type: Types.TOGGLE_SUCCESS, payload: state});
	} catch(error) {
		dispatch({type: Types.TOGGLE_FAILURE});
	}
}

export const toggleItem = (item) => ({
	type: Types.TOGGLE_ITEM,
	payload: item,
});

export const unToggleItem = () => ({
	type: Types.UN_TOGGLE_ITEM,
});

