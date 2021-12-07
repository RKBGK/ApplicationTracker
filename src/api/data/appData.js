import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getApps = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/applications.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getAppEmail = (email) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/applications.json?orderBy="email"&equalTo="${email}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createApp = (object) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/applications.json`, object)
    .then((response) => {
      axios
        .patch(`${baseURL}/applications/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(resolve);
    })
    .catch(reject);
});
// .then(() => getAppEmail(object.uid).then(resolve));
const deleteApp = (object) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/applications/${object.firebaseKey}.json`)
    .then(() => getAppEmail(object.uid).then(resolve))
    .catch(reject);
});

const updateApp = (object) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/applications/${object.firebaseKey}.json`, object)
    .then(() => getApps().then(resolve))
    .catch(reject);
});

export {
  getApps, updateApp, deleteApp, createApp, getAppEmail,
};
