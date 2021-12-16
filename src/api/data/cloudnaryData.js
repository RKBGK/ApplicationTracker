import axios from 'axios';

const BASE_URL = process.env.REACT_APP_CLOUDINARY_URL;
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

const uploadImage = (file) => new Promise((resolve, reject) => {
  const fileData = new FormData();
  fileData.append('file', file);
  fileData.append('upload_preset', PRESET);

  axios
    .post(`${BASE_URL}/image/upload`, fileData)
    .then((resp) => resolve(resp.data.url))
    .catch(reject);
});

export default uploadImage;
