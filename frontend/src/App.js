
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = () => {
    fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTask })
    })
      .then(response => response.json())
      .then(task => setTasks([...tasks, task]));
    setNewTask('');
  };

  const deleteTask = id => {
    fetch(`/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks(tasks.filter(task => task.id !== id)));
  };

  const toggleTaskCompletion = id => {
    fetch(`/tasks/${id}`, { method: 'PATCH' })
      .then(response => response.json())
      .then(updatedTask => {
        setTasks(tasks.map(task => 
          task.id === updatedTask.id ? updatedTask : task
        ));
      });
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
