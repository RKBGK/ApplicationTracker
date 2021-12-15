import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { deleteNote } from '../api/data/noteData';

export default function NoteCard({ noteObj, setNoteCards, setEditNote }) {
  // const [showForm, setShowForm] = useState(false);
  const deleteNoteObj = () => {
    deleteNote(noteObj).then(setNoteCards);
  };

  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '30px' }}>
        <div className="card-body">
          <h5 className="card-title">{noteObj.note}</h5>
          <button
            onClick={() => setEditNote(noteObj)}
            className="btn btn-info"
            type="button"
          >
            <Icon name="edit" />
          </button>
          <button
            onClick={() => deleteNoteObj()}
            className="btn btn-danger"
            type="button"
          >
            <Icon name="trash" />
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
