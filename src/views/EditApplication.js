import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getAppFB } from '../api/data/appData';
import ApplicationForm from '../Components/ApplicationForm';

export default function EditApplication({ user }) {
  const [modApp, setEditApp] = useState({});
  const { firebaseKey } = useParams();
  useEffect(() => {
    getAppFB(firebaseKey).then(setEditApp);
  }, []);

  return (
    <div>
      <h1>Edit </h1>
      <ApplicationForm appobj={modApp} user={user} />
    </div>
  );
}

EditApplication.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

EditApplication.defaultProps = {
  user: {},
};
