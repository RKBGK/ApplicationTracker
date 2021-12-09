import React from 'react';
import { useParams } from 'react-router';
import AppDetail from '../Components/AppDetail';

export default function DetailApp() {
  const { firebaseKey } = useParams();
  return (
    <div>
      <h1 className="text-center">user id {firebaseKey}</h1>
      {/* <AppDetail firebaseKey={firebaseKey} /> */}
      <AppDetail />
    </div>
  );
}
