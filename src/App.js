import React, { useState } from "react";
import { Plus } from "lucide-react";
import "./App.css";

import Header from "./Components/Header";
import ToDoList from "./Components/ToDoList";

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React components", completed: true },
    { id: 2, text: "Build a to-do app", completed: false },
    { id: 3, text: "Master state and props", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const newTask = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, newTask]);
      setNewTodo("");
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="app-container">
      <div className="app-wrapper">
        {/* Header with progress */}
        <Header totalTasks={todos.length} completedTasks={completedCount} />

        {/* Add new todo input */}
        <div className="add-todo-section">
          <div className="add-todo-wrapper">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTodo(e)}
              placeholder="Add a new task..."
              className="todo-input"
            />
            <button onClick={addTodo} className="add-button">
              <Plus size={18} />
              Add Task
            </button>
          </div>
        </div>

        {/* Filter buttons */}
        {todos.length > 0 && (
          <div className="filter-buttons">
            {[
              { key: "all", label: "All Tasks" },
              { key: "active", label: "Active" },
              { key: "completed", label: "Completed" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`filter-button ${
                  filter === key ? "active-filter" : ""
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* To-do list */}
        <ToDoList
          todos={filteredTodos}
          onToggleComplete={toggleComplete}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {/* Clear completed button */}
        {completedCount > 0 && (
          <div className="clear-completed">
            <button
              onClick={() => setTodos(todos.filter((todo) => !todo.completed))}
              className="clear-button"
            >
              Clear Completed ({completedCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
