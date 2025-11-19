import React from "react";


function SearchBar({ search, setSearch }) {
  return (
    <div className="search-bar-wrapper">
      <span className="search-icon">&#128269;</span>
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
