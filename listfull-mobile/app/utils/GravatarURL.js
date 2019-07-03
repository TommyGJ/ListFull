import md5 from 'crypto-js/md5'
import CryptoJS from 'crypto-js'

const GravatarURL = (email) => {
	const hash = CryptoJS.MD5(email);
	const url = "https://www.gravatar.com/avatar/" + hash; 
//	console.log(hash);
	return url;
}

export default GravatarURL;


