import React, { useState } from 'react';
// import AppDetail from '../Components/AppDetail';
import DetailAppCard from '../Components/DetailAppCard';
import NoteCardForm from '../Components/NoteCardForm';
import NoteCardList from '../Components/NoteCardList';

export default function DetailApp() {
  const [noteCards, setNoteCards] = useState([]);
  const [editNote, setEditNote] = useState({});
  return (
    <div>
      <DetailAppCard />
      <NoteCardForm
        noteCards={noteCards}
        editNote={editNote}
        setNoteCards={setNoteCards}
        setEditNote={setEditNote}
      />
      <NoteCardList />
      {/* <AppDetail /> */}
    </div>
  );
}
