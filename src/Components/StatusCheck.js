import React, { useState, useEffect } from 'react';
import { getAppEmail } from '../api/data/appData';
import ApplicationCard from './ApplicationCard';

const initialState = {
  email: 'none',
};

export default function StatusCheck() {
  const [formInput, setFormInput] = useState(initialState);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getAppEmail(formInput.email).then((cardsArray) => {
      setCards(cardsArray);
    });
  }, []);
  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getAppEmail(formInput.email).then((cardsArray) => {
      setCards(cardsArray);
    });
    resetForm();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h6>StatusCheck</h6>
        <div className="m-3">
          <label htmlFor="email" className="form-label visually-hidden">
            Enter Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formInput.email}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-info" type="submit">
          Search
        </button>
      </form>
      <div className="container">
        <div className="d-flex flex-wrap">
          {cards.map((card) => (
            <ApplicationCard
              key={card.firebaseKey}
              card={card}
              setCards={setCards}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
