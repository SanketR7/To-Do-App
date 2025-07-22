import React from "react";
import "./Header.css"; // Import separate CSS file

const Header = ({ totalTasks, completedTasks }) => {
  return (
    <header className="header">
      <h1 className="header-title">📋 My To-Do App</h1>
      <p className="header-subtitle">Stay organized and get things done!</p>

      {totalTasks > 0 && (
        <div className="header-progress">
          <span className="header-progress-text">
            ✅ <strong>{completedTasks}</strong> of{" "}
            <strong>{totalTasks}</strong> tasks completed
          </span>
          <div className="header-progress-bar">
            <div
              className="header-progress-fill"
              style={{
                width: `${
                  totalTasks ? (completedTasks / totalTasks) * 100 : 0
                }%`,
              }}
            ></div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
