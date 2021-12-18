import React, { useState, useEffect } from 'react';
import { getApps } from '../api/data/appData';
import ApplicationCard from '../Components/ApplicationCard';

export default function Summary() {
  const [cards, setCards] = useState([]);
  const [categorizedCards, setCategorizedCards] = useState({});
  // const calcsummary = (appArray) => {
  //   const summary = appArray.reduce((statusCategory, statuscount) => {
  //     const [status] = statuscount.status;
  //     if (statusCategory[status] == null) statusCategory[status] = [];
  //     statusCategory[status].push(statuscount);
  //     return statusCategory;
  //   }, {});
  //   return summary;
  // };
  useEffect(() => {
    let isMounted = true;
    getApps().then((cardsArray) => {
      if (isMounted) setCards(cardsArray);
      // calcsummary(cardsArray);
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
      <div>
        {Object.keys(categorizedCards).map((status) => (
          <div key={status}>
            <h2>{renderSwitch(status)}</h2>
            {categorizedCards[status].map((card) => (
              <ApplicationCard
                key={card.firebaseKey}
                card={card}
                setCards={setCards}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
