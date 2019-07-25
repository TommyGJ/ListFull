import { HTTPPostItem } from './../../utils/API.js';
import * as Types from './../constants/types.js';
import normalize from 'json-api-normalizer';
import build from 'redux-object';

export const resetItems = () => ({
	type: Types.RESET_ITEMS
});

export const postNewItem = (token, itemData) => async dispatch => {
	dispatch({type: Types.POST_ITEM_STARTED});
	try {
		const {data} = await HTTPPostItem(token, itemData)  
		const state = normalize(data)
		dispatch({type: Types.POST_ITEM_SUCCESS, payload: state});
	} catch(error) {
		dispatch({type: Types.POST_ITEM_FAILURE});
	}
}

export const toggle = (token, itemID, url_ext) => async dispatch => {
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

