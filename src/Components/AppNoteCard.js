import React from 'react';
import PropTypes from 'prop-types';
import { deleteNote } from '../api/data/noteData';

export default function AppNoteCard({ noteObj, setNoteCards }) {
  const deleteNoteObj = () => {
    deleteNote(noteObj).then(setNoteCards);
  };
  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '3px' }}>
        <div className="card-body">
          <h5 className="card-title">{noteObj.note}</h5>
          <button
            onClick={() => deleteNoteObj()}
            className="btn btn-danger"
            type="button"
          >
            DELETE
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
