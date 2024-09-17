import { useState } from 'react';

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reminderTime, setReminderTime] = useState(5); // Default 5 minutes

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      title,
      description,
      dueDate: new Date(dueDate),
      reminderTime: reminderTime || 5,
    });
    setTitle('');
    setDescription('');
    setDueDate('');
    setReminderTime(5);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Task Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Reminder Time (minutes before):</label>
        <input
          type="number"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          min="1"
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
