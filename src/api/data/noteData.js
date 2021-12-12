import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getNotes = (appId) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/notes.json?orderBy="appId"&equalTo="${appId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createNote = (object) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/notes.json`, object)
    .then((response) => {
      axios
        .patch(`${baseURL}/notes/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(() => getNotes(object.appId).then(resolve));
    })
    .catch(reject);
});
// working option 1
const deleteNote = (noteObj) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/notes/${noteObj.firebaseKey}.json`)
    .then(() => getNotes(noteObj.appId).then(resolve))
    .catch(reject);
});

const updateNote = (noteObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/notes/${noteObj.firebaseKey}.json`, noteObj)
    .then(() => getNotes(noteObj.appId).then(resolve))
    .catch(reject);
});

export {
  createNote, getNotes, deleteNote, updateNote,
};
