import {combineReducers} from 'redux';
import * as Types from '../constants/types.js'; 
import build from 'redux-object';

const mapItems = (items) => {
	return (items.map(item => {
		return {
			...itemFormat(item)
		};
	}));
}

const mapReplaceItems = (state, item) => {
	return (state.map(element => {
		if (element.id === item.id) {
			return {
				...itemFormat(item)
			};
		}
		return {
			...element
		};
	}));
}

const itemFormat = (item) => ({
	id: item.id,
	name: item.name,
	info: item.info,
	complete: item.complete,
	priority: item.priority,
	ownerID: item.ownerId,
	ownerName: item.ownerName,
});
export const listItemsReducer = (state = [], action) => {
	switch(action.type) {
		case Types.VIEW_LIST_SUCCESS:
			const items = build(action.payload, 'item', null)
			if (!items) return [] 
			const mappedItems = mapItems(items);
			return [ 
				...mappedItems
			];
		case Types.TOGGLE_SUCCESS:
			const item = build(action.payload, 'item', null)[0];
			//console.log(mapReplaceItems(state,item));
			return [
				...mapReplaceItems(state,item)
			];
		case Types.POST_ITEM_SUCCESS:
			const newItem = build(action.payload, 'item', null)[0];
			return [
				...state,
				itemFormat(newItem)
			];
		case Types.DELETE_ITEM_SUCCESS:
			return state.filter(element => element.id !== action.payload)
		case Types.RESET_VIEW_LIST:
			return [];
		default:
			return state;
	}
}

export const toggleItemReducer = (state = {} , action) => {
	switch(action.type) {
		case Types.TOGGLE_ITEM:
			return {
				...action.payload
			};
		case Types.UN_TOGGLE_ITEM:
			return {};
		case Types.TOGGLE_SUCCESS:
			const item = build(action.payload, 'item', null)[0];
			return {
				...itemFormat(item) 
			}
		default:
			return state;

	}
}


