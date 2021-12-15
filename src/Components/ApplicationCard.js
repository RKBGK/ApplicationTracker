import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deleteApp, getAppEmail, getApps } from '../api/data/appData';

const Hstyle = styled.form`
  h5 {
    margin: 0;
    padding: 0;
  }
`;

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
      if (user != null && user.role !== 'Client') {
        deleteApp(card).then(() => {
          getApps().then(setCards);
        });
      } else {
        deleteApp(card).then(() => {
          getAppEmail(card.email).then((apps) => {
            setCards(apps);
          });
        });
      }
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
          <Hstyle className="card-title">{card.name}</Hstyle>
          <Hstyle className="card-title">{card.address}</Hstyle>
          <Hstyle className="card-title">{card.email}</Hstyle>
          <Hstyle className="card-title">{renderSwitch(card.status)}</Hstyle>
          {user?.role !== 'Client' ? (
            <Link to={`/editapp/${card.firebaseKey}`} className="btn btn-light">
              <Icon name="edit" />
            </Link>
          ) : (
            ''
          )}
          {user?.role === 'Admin' || user?.role === 'Staff' ? (
            <Link
              to={`/detailapp/${card.firebaseKey}`}
              className="btn btn-light"
            >
              <Icon name="file outline" />
            </Link>
          ) : (
            ''
          )}

          {card.status === '1' ? (
            <button
              onClick={() => handleClick('delete')}
              className="btn btn-danger"
              type="button"
            >
              <Icon name="trash" />
            </button>
          ) : (
            ''
          )}
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
