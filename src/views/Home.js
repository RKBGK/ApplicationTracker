import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/globals/home.scss';
import { Card } from 'react-bootstrap';

export default function Home() {
  const history = useHistory();
  return (
    <div className="homebtnStyle">
      <Card className="homeCard">
        <button
          className="app-btn"
          type="submit"
          onClick={() => history.push('/application')}
        >
          Start Application
        </button>
        <button
          className="status-btn"
          type="submit"
          onClick={() => history.push('statuscheck')}
        >
          Check Application Status
        </button>
      </Card>
    </div>
  );
}
