import { login, getUser, HTTPGetUserPreview } from './../../utils/API.js';
import * as Types from './../constants/types.js';
import normalize from 'json-api-normalizer';
import build from 'redux-object';

export const logInUser = (email, password) => async dispatch => {
	dispatch({type: Types.LOGIN_STARTED,});
	try {
		const response = await login(email, password); 
		dispatch({ type: Types.LOGIN_SUCCESSFUL, payload: response.data});
	} catch(error) {
		dispatch({type: Types.LOGIN_FAILED, payload: error.response.data.errors});
	}
}

export const updateUser = (token) => async dispatch => {
	dispatch({type: Types.USER_UPDATE_STARTED});
	try {
		const {data} = await getUser(token); 
		const state = normalize(data);
		dispatch({ type: Types.USER_UPDATE_SUCCESS, payload: state });
	} catch(error) {
		console.log(error);
		dispatch({ type: Types.USER_UPDATE_FAILURE, payload: error.response.data.errors});
	}
}

export const getUserPreview = (token, email) => async dispatch => {
	dispatch({type: Types.USER_PREVIEW_STARTED});
	try {
		const {data} = await HTTPGetUserPreview(token,email);
		const state = normalize(data);
		dispatch({ type: Types.USER_PREVIEW_SUCCESS, payload: state });
	} catch(error) {
		dispatch({ type: Types.USER_PREVIEW_FAILURE });
	}
}

export const resetUserPreviews = () => ({
	type: Types.RESET_USER_PREVIEWS
})

