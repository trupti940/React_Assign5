import { useEffect, useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  useEffect(() => {
    tasks.forEach((task) => {
      const now = new Date();
      const reminderDate = new Date(task.dueDate);
      reminderDate.setMinutes(reminderDate.getMinutes() - task.reminderTime);

      if (now < reminderDate) {
        const timeUntilReminder = reminderDate - now;
        setTimeout(() => {
          showNotification(task.title, task.dueDate);
        }, timeUntilReminder);
      }
    });
  }, [tasks]);

  const showNotification = (taskTitle, dueDate) => {
    if (Notification.permission === 'granted') {
      new Notification(`Reminder: ${taskTitle}`, {
        body: `Your task is due on ${dueDate.toLocaleString()}`,
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          showNotification(taskTitle, dueDate);
        }
      });
    }
  };

  return (
    <div>
      <TaskForm addTask={addTask} />
      <h2>Task List</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {new Date(task.dueDate).toLocaleString()}</p>
            <p>Reminder: {task.reminderTime} minutes before</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
