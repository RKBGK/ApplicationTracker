import React, { useState, useEffect } from 'react';
import { getApps } from '../api/data/appData';
import ApplicationCard from '../Components/ApplicationCard';

export default function AppCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getApps().then((cardsArray) => {
      if (isMounted) setCards(cardsArray);
    });
    return () => {
      isMounted = false;
    }; // cleanup function
  }, []);

  return (
    <div className="container">
      {cards ? (
        <>
          <h1 className="text-center">All Cards</h1>
          <div className="d-flex flex-wrap">
            {cards.map((card) => (
              <ApplicationCard
                key={card.firebaseKey}
                card={card}
                setCards={setCards}
              />
            ))}
          </div>
        </>
      ) : (
        'Add a card'
      )}
    </div>
  );
}
