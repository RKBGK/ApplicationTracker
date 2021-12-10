import React from 'react';
import PropTypes from 'prop-types';
import { deleteNote } from '../api/data/noteData';

export default function AppNoteCard({ noteObj, setNoteCards }) {
  // const [showForm, setShowForm] = useState(false);
  // useEffect(() => {
  //   let isMounted = true;
  //   getAppFB(firebaseKey).then((cardObj) => {
  //     if (isMounted) setCard(cardObj);
  //   });
  //   return () => {
  //     isMounted = false;
  //   }; // cleanup function
  // }, []);

  const editNoteObj = () => {
    console.warn('hi');
  };
  const deleteNoteObj = () => {
    deleteNote(noteObj).then(setNoteCards);
  };
  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '3px' }}>
        <div className="card-body">
          <h5 className="card-title">{noteObj.note}</h5>
          <button
            onClick={() => editNoteObj()}
            className="btn btn-info"
            type="button"
          >
            Edit
          </button>
          <button
            onClick={() => deleteNoteObj()}
            className="btn btn-danger"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
AppNoteCard.propTypes = {
  noteObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    appId: PropTypes.string,
    note: PropTypes.string,
  }).isRequired,
  setNoteCards: PropTypes.func.isRequired,
};
