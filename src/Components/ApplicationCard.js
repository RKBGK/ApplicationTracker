import React from 'react';
import PropTypes from 'prop-types';

// import { useHistory } from 'react-router';

export default function ApplicationCard({ card }) {
  const renderSwitch = () => {
    switch (card.status) {
      case '1':
        return 'Pending';
      case '2':
        return 'In-Review';
      case '3':
        return 'Rejected';
      case '4':
        return 'Approved';
      default:
        return card.status;
    }
  };
  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '3px' }}>
        <div className="card-body">
          <h5 className="card-title">{card.name}</h5>
          <h5 className="card-title">{card.address}</h5>
          <h5 className="card-title">{renderSwitch(card.status)}</h5>
        </div>
      </div>
    </div>
  );
}

ApplicationCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
};
