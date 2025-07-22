import React, { useState } from "react";
import { Trash2, Edit, Check, X } from "lucide-react";
import "./ToDoItem.css";

const ToDoItem = ({ todo, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      if (editText.trim()) {
        onEdit(todo.id, editText.trim());
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleEdit();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : "pending"}`}>
      {/* Checkbox */}
      <button
        onClick={() => onToggleComplete(todo.id)}
        className={`todo-checkbox ${todo.completed ? "checked" : ""}`}
      >
        {todo.completed && <Check size={14} />}
      </button>

      {/* Editable Text */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyPress}
          className="todo-edit-input"
          autoFocus
        />
      ) : (
        <span className={`todo-text ${todo.completed ? "text-completed" : ""}`}>
          {todo.text}
        </span>
      )}

      {/* Action Buttons */}
      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleEdit} className="btn save-btn" title="Save">
              <Check size={16} />
            </button>
            <button
              onClick={handleCancel}
              className="btn cancel-btn"
              title="Cancel"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} className="btn edit-btn" title="Edit">
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="btn delete-btn"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoItem;
