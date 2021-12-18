import axios from 'axios';
import firebase from 'firebase/app';
import firebaseConfig from '../apiKeys';

const getCurrentUsersUid = () => firebase.auth().currentUser?.uid;
const baseURL = firebaseConfig.databaseURL;
const getUserEmail = (useremail) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/users.json?orderBy="email"&equalTo="${useremail}"`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const createUser = (userObj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/users.json`, userObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios
        .patch(`${baseURL}/users/${response.data.name}.json`, body)
        .then(() => resolve({ ...userObj, ...body }));
    })
    .catch(reject);
});

const checkUserExists = (user) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/users.json?orderBy="email"&equalTo="${user.email}"`)
    .then((response) => {
      if (Object.values(response.data).length) {
        const [foundUser] = Object.values(response.data);
        resolve({ ...foundUser });
      } else {
        resolve('create user');
      }
    })
    .catch(reject);
});
export {
  getUserEmail, createUser, checkUserExists, getCurrentUsersUid,
};
