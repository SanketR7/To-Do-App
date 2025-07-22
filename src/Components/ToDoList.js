import React from "react";
import ToDoItem from "./TodoItem";
import "./ToDoList.css"; // Import the separate CSS file

const ToDoList = ({ todos, onToggleComplete, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <div className="todo-list-empty-icon">📝</div>
        <p className="todo-list-empty-text">
          No tasks yet. Add one above to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ToDoList;
