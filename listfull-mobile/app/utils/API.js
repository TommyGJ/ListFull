import axios from 'axios'

export default API = axios.create({
	baseURL: 'http://3959b3a9.ngrok.io'  
});

export const login = (email, password) => {
	return API.post('/api/v1/authenticate', {
			auth: { email: email, password: password }
	});
}

export const getUser = (token) => {
	return API.get('/api/v1/me', config(token) 
	);
}

export const postNewList = (token, listData) => {
	return API.post('/api/v1/lists/', listData, config(token));
}

export const HTTPDeleteList = (token, listID) => {
	return API.delete('/api/v1/lists/' + String(listID),config(token))
}

export const HTTPPatchList = (token, listID, data) => {
	return API.patch('/api/v1/lists/' + String(listID) + '/add_user',data,config(token)); 
}

export const HTTPGetUserPreview = (token, email) => {
	return API.get('/api/v1/users/preview/' + String(email),config(token)); 
}

export const HTTPGetListItems = (token, listID) => {
	return API.get('/api/v1/lists/' + String(listID), config(token))
}

export const HTTPPatchItem = (token, itemID, url) => {
	return API.patch('/api/v1/items/' + String(itemID) + url,null, config(token))
}

export const HTTPPostItem = (token, itemData) => {
	return API.post('/api/v1/items/', itemData, config(token))
}

export const HTTPCreateAccount = (data) => {
	return API.post('/api/v1/new_account', data)
}

export const HTTPDeleteItem = (token, itemID) => {
	return API.delete('/api/v1/items/' + String(itemID),config(token))
}

export const HTTPRemoveUserFromList = (token,listID,userData) => {
	return API.patch('/api/v1/lists/' + String(listID) + '/remove_user/', userData, config(token)) 
}

export const HTTPUpdateList = (token, listID, listData) => {
	return API.patch('/api/v1/lists/' + String(listID), listData, config(token))
}

export const HTTPUpdateAccount = (token, userID, userData, url) => {
	return API.patch('/api/v1/users/' + String(userID) + url, userData, config(token))
}



/*
 * Helper Functions
*/
const config = (token) => {
	return { headers: {Authorization: "Bearer " + String(token)} }
}
