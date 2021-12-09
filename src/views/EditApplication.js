import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAppFB } from '../api/data/appData';
import ApplicationForm from '../Components/ApplicationForm';

export default function EditApplication() {
  const [modApp, setEditApp] = useState({});
  const { firebaseKey } = useParams();
  useEffect(() => {
    getAppFB(firebaseKey).then(setEditApp);
  }, []);

  return (
    <div>
      <h1>Edit </h1>
      <ApplicationForm appobj={modApp} />
    </div>
  );
}
