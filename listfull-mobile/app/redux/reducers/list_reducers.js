import {combineReducers} from 'redux';
import * as Types from '../constants/types.js'; 
import build from 'redux-object';


const mapLists = (lists) => {
	return(lists.map(element => {
		return listObj(element)
	}));
}

const update = (lists, newList) => {
	return(lists.map(element => {
		if (element.id == newList.id) {
			return listObj(newList)
		}
		return {...element} 
	}));
}

const listObj = (list) => ({
		id: list.id,
		name: list.name,
		ownerID: list.ownerId,
		ownerName: list.ownerName,
		info: list.info,
		deadline: list.deadline,
});

export const userListsReducer = (state = [], action) => {
	switch(action.type) {
		case Types.USER_UPDATE_SUCCESS:
			const lists = build(action.payload, 'list', null);
			if (!lists) {
				return [];
			}
			const listsArray = mapLists(lists);
			return [
				...listsArray.reverse(),
			];
		case Types.ADD_LIST_SUCCESS:
			const list = build(action.payload, 'list', null)[0];
			return [
				listObj(list),
				...state
			];
		case Types.UPDATE_LIST_SUCCESS:
			const updatedList = build(action.payload, 'list', null)[0];
			return [
				...update(state, updatedList)
			];
		case Types.DELETE_LIST_SUCCESS:
			return state.filter(element => element.id !== action.payload)
		default:
			return state
	}
}

export const viewListReducer = (state = {}, action) => {
	switch(action.type) {
		case Types.VIEW_LIST_SUCCESS: 
			const list = build(action.payload, 'list', null)[0] 
			return {
				...listObj(list)
			}
		case Types.UPDATE_LIST_SUCCESS:
			const updatedList = build(action.payload, 'list', null)[0]
			return {
				...listObj(updatedList)
			}
		case Types.RESET_VIEW_LIST:
			return {};
		default: 
			return state
	}
}

