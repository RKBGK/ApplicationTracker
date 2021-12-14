import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteApp, getAppEmail } from '../api/data/appData';

// import { useHistory } from 'react-router';

export default function ApplicationCard({ card, setCards, user }) {
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

  // const handleClick = (method) => {
  //   if (method === 'delete') {
  //     deleteApp(card).then(setCards);
  //   }
  // };

  const handleClick = (method) => {
    if (method === 'delete') {
      deleteApp(card).then(() => {
        getAppEmail(card.email).then((apps) => {
          setCards(apps);
        });
      });
    }
  };
  // getAppFB(firebaseKey).then((appObj) => {
  //   getNotes(appObj.appId).then((notes) => {
  //     setNoteCards(notes);
  //   });
  // });

  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '3px' }}>
        <div className="card-body">
          <h5 className="card-title">{card.name}</h5>
          <h5 className="card-title">{card.address}</h5>
          <h5 className="card-title">{card.email}</h5>
          <h5 className="card-title">{card.status}</h5>
          <h5 className="card-title">{renderSwitch(card.status)}</h5>
          {user ? <h5>Role - {user.role}</h5> : 'No Role'}
          {user?.role !== 'Client' ? (
            <Link
              to={`/editapp/${card.firebaseKey}`}
              className="btn btn-warning"
            >
              Edit
            </Link>
          ) : (
            ''
          )}
          {user?.role === 'Admin' || user?.role === 'Staff' ? (
            <Link
              to={`/detailapp/${card.firebaseKey}`}
              className="btn btn-warning"
            >
              Detail
            </Link>
          ) : (
            ''
          )}
          <div>
            {card.status === '1' ? (
              <button
                onClick={() => handleClick('delete')}
                className="btn btn-danger"
                type="button"
              >
                DELETE
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ApplicationCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
  setCards: PropTypes.func.isRequired,
  user: PropTypes.shape(PropTypes.obj),
};

ApplicationCard.defaultProps = {
  user: null,
};
