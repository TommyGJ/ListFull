import axios from 'axios'

export default API = axios.create({
	baseURL: 'http://62a58ebb.ngrok.io'  
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

/*
 * Helper Functions
*/
const config = (token) => {
	return { headers: {Authorization: "Bearer " + String(token)} }
}
