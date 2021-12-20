import React, { useState, useEffect } from 'react';
import { getApps } from '../api/data/appData';

export default function Summary() {
  const [cards, setCards] = useState([]);
  const [categorizedCards, setCategorizedCards] = useState({});

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
        return 'In-progress';
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
    console.warn('sortedObj', sortedObj);
    setCategorizedCards(sortedObj);
  };

  const chartData = () => Object.keys(categorizedCards).map((status) => [
    renderSwitch(status),
    categorizedCards[status].length,
  ]);
  console.warn(chartData());

  useEffect(() => {
    categoryGroups();
  }, [cards]);

  return (
    <div className="summary">
      <div>
        {Object.keys(categorizedCards).map((status) => (
          <div key={status}>
            <h2>
              {renderSwitch(status)} {categorizedCards[status].length}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
