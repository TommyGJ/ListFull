import {combineReducers} from 'redux';
import { userReducer, userPreviewReducer, listUsersReducer } from './user_reducers.js'
import { errorReducer } from './error_reducers.js'
import { userListsReducer, viewListReducer } from './list_reducers.js'
import { listItemsReducer, toggleItemReducer } from './item_reducers.js';
import * as Types from '../constants/types.js'; 

const appReducer = combineReducers({
	user: userReducer,
	userPreviews: userPreviewReducer,
	errors: errorReducer,
	lists: userListsReducer, 
	viewList: viewListReducer,
	items: listItemsReducer,
	listUsers: listUsersReducer,
	toggledItem: toggleItemReducer,
});

const rootReducer = ( state, action ) => {
	if ( action.type === Types.LOG_OUT ) {
				state = undefined;
	}
	return appReducer(state, action)
}

export default rootReducer;




