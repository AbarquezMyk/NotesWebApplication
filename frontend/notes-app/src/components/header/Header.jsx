import React from "react";
import ProfileMenu from "./ProfileMenu";

export default function Header({ user, setUser, onLogout, setActivePage }) {
  return (
    <header
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 20px",
        backgroundColor: "#BFA67A",
        borderBottom: "1px solid #8C5E3C",
      }}
    >
      {user && (
        <ProfileMenu
          username={user.username}
          profilePic={user.profilePic || "/assets/imgs/1.png"} // 🔹 fallback default
          setUser={setUser}
          onLogout={onLogout}
          setActivePage={setActivePage}
          buttonColor="#C69C6D"
          dropdownColor="#D8C3A5"
        />
      )}
    </header>
  );
}
