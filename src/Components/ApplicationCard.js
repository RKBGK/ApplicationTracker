import React from 'react';
import PropTypes from 'prop-types';

// import { useHistory } from 'react-router';

export default function ApplicationCard({ card }) {
  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '3px' }}>
        <div className="card-body">
          <h5 className="card-title">{card.status}</h5>
        </div>
      </div>
    </div>
  );
}

ApplicationCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
};
