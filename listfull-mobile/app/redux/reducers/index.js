import {combineReducers} from 'redux';
import { userReducer, userPreviewReducer } from './user_reducers.js'
import { errorReducer } from './error_reducers.js'
import { userListsReducer } from './list_reducers.js'

const rootReducer = combineReducers({
	user: userReducer,
	userPreviews: userPreviewReducer,
	errors: errorReducer,
	lists: userListsReducer, 
});

export default rootReducer;




