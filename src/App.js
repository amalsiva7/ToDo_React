import React, { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState('');

  const addTodo = () => {
    const trimmedTodo = toDo.trim();
    if (trimmedTodo) {
      const isDuplicate = toDos.some(todo => todo.text.toLowerCase() === trimmedTodo.toLowerCase());
      if (isDuplicate) {
        alert('Todo already exists');
      } else {
        setTodos([...toDos, { id: Date.now(), text: trimmedTodo, status: false, isEditing: false }]);
        setTodo('');
      }
    } else {
      alert('Todo cannot be empty');

    }
  };

  const deleteCheckedTodos = () => {
    setTodos(toDos.filter(todo => !todo.status));
  };

  const handleCheckboxChange = (id, checked) => {
    setTodos(toDos.map(todo => (todo.id === id ? { ...todo, status: checked } : todo)));
  };

  const startEditing = (id) => {
    setTodos(toDos.map(todo => (todo.id === id ? { ...todo, isEditing: true } : todo)));
  };

  const handleEditChange = (id, text) => {
    setTodos(toDos.map(todo => (todo.id === id ? { ...todo, text } : todo)));
  };

  const saveEdit = (id) => {
    setTodos(toDos.map(todo => (todo.id === id ? { ...todo, isEditing: false } : todo)));
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => (
          <div key={obj.id} className="todo">
            <div className="left">
              <input
                onChange={(e) => handleCheckboxChange(obj.id, e.target.checked)}
                checked={obj.status}
                type="checkbox"
                name=""
                id=""
              />
              {obj.isEditing ? (
                <input
                  value={obj.text}
                  onChange={(e) => handleEditChange(obj.id, e.target.value)}
                  onBlur={() => saveEdit(obj.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      saveEdit(obj.id);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <p onDoubleClick={() => startEditing(obj.id)}>{obj.text}</p>
              )}
            </div>
            <div className="right">
              <i onClick={deleteCheckedTodos} className="fas fa-times"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
