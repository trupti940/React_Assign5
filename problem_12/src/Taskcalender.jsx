import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useState } from 'react';

function TaskCalendar() {
  const [events, setEvents] = useState([]);

  const addTaskToCalendar = (task) => {
    setEvents([...events, {
      title: task.title,
      start: task.dueDate,
    }]);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
}

export default TaskCalendar;
