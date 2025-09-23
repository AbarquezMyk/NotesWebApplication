import React from "react";

function Header({ activeFolder, search, setSearch }) {
  return (
    <header>
      <h1>{activeFolder}</h1>
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </header>
  );
}

export default Header;
