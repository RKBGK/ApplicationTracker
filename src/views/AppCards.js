import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getApps } from '../api/data/appData';
import ApplicationCard from '../Components/ApplicationCard';

export default function AppCards({ user }) {
  const [cards, setCards] = useState([]);
  const [categorizedCards, setCategorizedCards] = useState({});

  useEffect(() => {
    let isMounted = true;
    getApps().then((cardsArray) => {
      if (isMounted) setCards(cardsArray);
    });
    return () => {
      isMounted = false;
    }; // cleanup function
  }, []);

  // const renderSwitch = (status) => {
  //   switch (status) {
  //     case '1':
  //       return 'Pending';
  //     case '2':
  //       return 'In-Review';
  //     case '3':
  //       return 'Rejected';
  //     case '4':
  //       return 'Approved';
  //     default:
  //       return status;
  //   }
  // };

  const categoryGroups = () => {
    const sortedObj = cards.reduce((cardObject, currentObject) => {
      const main = cardObject;
      // if the current category already exists, push the currentObject into the array...otherwise, set the value to an array and push the currentObject into it.
      (main[currentObject.status] = main[currentObject.status] || []).push(
        currentObject,
      );
      return main;
    }, {});
    console.warn('sort obj', sortedObj);
    setCategorizedCards(sortedObj);
  };

  useEffect(() => {
    categoryGroups();
  }, [cards]);

  // const sumStat = () => {
  //   const data = [];
  //   for (const stat of cards) {
  //     let entryFound = false;
  //     const tempObj = {
  //       name: stat.status,
  //       count: 1,
  //     };
  //     for (const item of data) {
  //       if (item.name === tempObj.name) {
  //         item.count += 1;
  //         entryFound = true;
  //         break;
  //       }
  //     }

  //     if (!entryFound) {
  //       data.push(tempObj);
  //     }
  //   }
  // };
  // console.warn(sumStat);

  return (
    <div className="container">
      {user ? (
        <h5>Role APP CARD VIEW- {user.role}</h5>
      ) : (
        ' Role APP CARD VIEW-No Role'
      )}
      <div>
        {Object.keys(categorizedCards).map((status) => (
          <div key={status}>
            <h4>Status {status}</h4>
            {/* <h4>{renderSwitch(categorizedCards[status])}</h4> */}
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
      {/* {cards ? (
        <>
          <h1 className="text-center">All Cards</h1>
          {user ? (
            <h5>Role - {user.role}</h5>
          ) : (
            'No Role Appcards'
          )}
          <div className="d-flex flex-wrap">
            {cards.map((card) => (
              <ApplicationCard
                key={card.firebaseKey}
                card={card}
                setCards={setCards}
                user={user}
              />
            ))}
          </div>
        </>
      ) : (
        'Add a card'
      )} */}
    </div>
  );
}

AppCards.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

AppCards.defaultProps = {
  user: null,
};
