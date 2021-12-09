import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const createContact = (object) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/contacts.json`, object)
    .then((response) => {
      axios
        .patch(`${baseURL}/contacts/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(resolve);
    })
    .catch(reject);
});
export default createContact;
