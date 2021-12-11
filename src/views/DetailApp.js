import React, { useState } from 'react';
// import AppDetail from '../Components/AppDetail';
import DetailAppCard from '../Components/DetailAppCard';
import NoteCardForm from '../Components/NoteCardForm';
import NoteCardList from '../Components/NoteCardList';

export default function DetailApp() {
  const [noteCards, setNoteCards] = useState([]);
  const [editNote, setEditNote] = useState({});
  console.warn(noteCards);
  return (
    <div>
      <DetailAppCard />
      <NoteCardForm
        editNote={editNote}
        setNoteCards={setNoteCards}
        setEditNote={setEditNote}
      />
      <NoteCardList noteCards={noteCards} setNoteCards={setNoteCards} />
      {/* <AppDetail /> */}
    </div>
  );
}
