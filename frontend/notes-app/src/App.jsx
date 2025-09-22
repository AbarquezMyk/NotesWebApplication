import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [activeFolder, setActiveFolder] = useState('All Notes');

  const folders = ['All Notes', 'School', 'Personal', 'Ideas'];

  const addNote = () => {
    if (input.trim()) {
      const newNote = {
        text: input,
        folder: activeFolder,
        timestamp: new Date().toLocaleString(),
      };
      setNotes([newNote, ...notes]);
      setInput('');
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const filteredNotes = notes.filter(
    (note) =>
      (activeFolder === 'All Notes' || note.folder === activeFolder) &&
      note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-wrapper">
      <aside className="sidebar">
        <h2>Folders</h2>
        <ul>
          {folders.map((folder) => (
            <li
              key={folder}
              className={folder === activeFolder ? 'active' : ''}
              onClick={() => setActiveFolder(folder)}
            >
              {folder}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        <header>
          <h1>{activeFolder}</h1>
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>

        <section className="note-input-wrapper">
          <div className="note-input">
            <textarea
              placeholder="Start typing your note..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addNote}>+ Add</button>
          </div>
        </section>

        <section className="note-list">
          {filteredNotes.length === 0 ? (
            <p className="empty">No notes found.</p>
          ) : (
            filteredNotes.map((note, index) => (
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
      </main>
    </div>
  );
}

export default App;
