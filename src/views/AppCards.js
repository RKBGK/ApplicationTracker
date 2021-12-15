import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getApps } from '../api/data/appData';
import ApplicationCard from '../Components/ApplicationCard';

export default function AppCards({ user }) {
  const [cards, setCards] = useState([]);
  const [categorizedCards, setCategorizedCards] = useState({});
  const userRole = user.role;

  useEffect(() => {
    let isMounted = true;
    getApps().then((cardsArray) => {
      if (isMounted) setCards(cardsArray);
    });
    return () => {
      isMounted = false;
    }; // cleanup function
  }, []);

  const renderSwitch = (status) => {
    switch (status) {
      case '1':
        return 'Pending';
      case '2':
        return 'In-Review';
      case '3':
        return 'Rejected';
      case '4':
        return 'Approved';
      default:
        return status;
    }
  };

  const categoryGroups = () => {
    const sortedObj = cards.reduce((cardObject, currentObject) => {
      const main = cardObject;
      // if the current category already exists, push the currentObject into the array...otherwise, set the value to an array and push the currentObject into it.
      (main[currentObject.status] = main[currentObject.status] || []).push(
        currentObject,
      );
      return main;
    }, {});

    setCategorizedCards(sortedObj);
  };

  useEffect(() => {
    categoryGroups();
  }, [cards]);

  return (
    <div className="container">
      {user ? (
        <h5>Role APP CARD VIEW new val - {userRole}</h5>
      ) : (
        ' Role APP CARD VIEW-No Role'
      )}
      <div>
        {Object.keys(categorizedCards).map((status) => (
          <div key={status}>
            <h4>{renderSwitch(status)}</h4>
            <h4>{status}</h4>
            {categorizedCards[status].map((card) => (
              <ApplicationCard
                key={card.firebaseKey}
                card={card}
                setCards={setCards}
                user={user}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

AppCards.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

AppCards.defaultProps = {
  user: null,
};
