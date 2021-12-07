import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;
const getUserEmail = (useremail) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/users.json?orderBy="email"&equalTo="${useremail}"`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export default getUserEmail;
