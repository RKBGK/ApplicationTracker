import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAppFB, updateAppFB } from '../api/data/appData';

export default function DetailAppCard() {
  const [card, setCard] = useState({});
  const { firebaseKey } = useParams();
  const [checked, setChecked] = useState();
  useEffect(() => {
    let isMounted = true;
    getAppFB(firebaseKey).then((cardObj) => {
      if (isMounted) setCard(cardObj);
    });
    return () => {
      isMounted = false;
    }; // cleanup function
  }, []);
  // since need to track change in notcard separately, created a new useeffect
  const handleToggle = () => {
    setChecked(!checked);
    const drawingcard = {
      email: card.email,
      name: card.name,
      address: card.address,
      firebaseKey: card.firebaseKey,
      details: card.details,
      status: card.status,
      phone: card.phone,
      image: card.image,
      drawingReceived: !card.drawingReceived,
      dateReceived: card.dateReceived,
    };
    updateAppFB(drawingcard).then(setCard);
  };
  // you can use const { name, value } = e.target; and [name: value, or replace name by status at both places
  const handleStatus = (e) => {
    const { name, value } = e.target;
    const drawingcard = {
      email: card.email,
      name: card.name,
      address: card.address,
      firebaseKey: card.firebaseKey,
      details: card.details,
      //   status: card.status,
      [name]: value,
      phone: card.phone,
      image: card.image,
      drawingReceived: card.drawingReceived,
      dateReceived: card.dateReceived,
    };
    updateAppFB(drawingcard).then(setCard);
  };
  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '3px' }}>
        <div className="card-body">
          <h5 className="card-title">{card.email}</h5>
          <h5 className="card-title">{card.status}</h5>
          <div>
            <label>
              <input
                type="checkbox"
                checked={card.drawingReceived ? 'checked' : ''}
                onChange={handleToggle}
              />
              Drawing Received
            </label>
          </div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={card.status}
            placeholder="Select Status"
            onChange={handleStatus}
          >
            <option value="">Status</option>
            <option value="1">Pending</option>
            <option value="2">In-Review</option>
            <option value="3">Rejected</option>
            <option value="4">Approved</option>
          </select>
        </div>
      </div>
    </div>
  );
}
