import {combineReducers} from 'redux';
import * as Types from '../constants/types.js'; 
import build from 'redux-object';


const mapLists = (lists) => {
	return(lists.map(element => {
		return listObj(element)
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
		case Types.DELETE_LIST_SUCCESS:
			return state.filter(element => element.id !== action.payload)
		default:
			return state
	}
}

