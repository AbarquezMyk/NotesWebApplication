import React from "react";

function NoteList({ notes, deleteNote }) {
  return (
    <section className="note-list">
      {notes.length === 0 ? (
        <p className="empty">No notes found.</p>
      ) : (
        notes.map((note, index) => (
          <div className="note-card" key={index} data-folder={note.folder}>
            <div>
              <p>{note.text}</p>
              <span className="timestamp">{note.timestamp}</span>
            </div>
            <button onClick={() => deleteNote(index)}>🗑</button>
          </div>
        ))
      )}
    </section>
  );
}

export default NoteList;
