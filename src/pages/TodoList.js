import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const fetchTasks = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No userId found in localStorage');
      return;
    }

    try {
      const res = await axios.get('https://todo-backend-c53w.onrender.com/api/tasks', {
        params: { userId },
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.response?.data || error);
    }
  };

  const addTask = async () => {
    const userId = localStorage.getItem('userId');
    if (!taskText || !userId) {
      alert('Task text or user ID is missing!');
      return;
    }

    console.log("Sending to backend:", { task: taskText, userId });

    try {
      await axios.post('https://todo-backend-c53w.onrender.com/api/tasks', {
        task: taskText,
        userId,
      });

      setTaskText('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error.response?.data || error);
      alert(error.response?.data?.msg || 'Failed to add task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://todo-backend-c53w.onrender.com/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Tasks</h2>
      <input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter new task"
        className="form-control mb-2"
      />
      <button onClick={addTask} className="btn btn-primary mb-3">Add Task</button>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            {task.task}
            <button onClick={() => deleteTask(task._id)} className="btn btn-danger btn-sm">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
