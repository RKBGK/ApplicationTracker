import React from 'react';
import PropTypes from 'prop-types';
import { deleteNote } from '../api/data/noteData';

export default function NoteCard({ noteObj, setNoteCards, setEditNote }) {
  // const [showForm, setShowForm] = useState(false);
  const deleteNoteObj = () => {
    deleteNote(noteObj).then(setNoteCards);
  };
  console.warn(setEditNote);

  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '3px' }}>
        <div className="card-body">
          <h5 className="card-title">{noteObj.note}</h5>
          <button
            onClick={() => setEditNote(noteObj)}
            className="btn btn-info"
            type="button"
          >
            Edit Note
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
NoteCard.propTypes = {
  noteObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    appId: PropTypes.string,
    note: PropTypes.string,
  }).isRequired,
  setNoteCards: PropTypes.func.isRequired,
  setEditNote: PropTypes.func.isRequired,
};
