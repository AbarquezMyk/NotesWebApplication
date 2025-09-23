import React from "react";

function Sidebar({ folders, activeFolder, setActiveFolder }) {
  return (
    <aside className="sidebar">
      <h2>Folders</h2>
      <ul>
        {folders.map((folder) => (
          <li
            key={folder}
            className={folder === activeFolder ? "active" : ""}
            onClick={() => setActiveFolder(folder)}
          >
            {folder}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
