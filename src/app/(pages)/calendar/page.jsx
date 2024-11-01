import FullCalendar from '@fullcalendar/react'; // eslint-disable-line
import dayGridPlugin from '@fullcalendar/daygrid' // eslint-disable-line
import interactionPlugin from '@fullcalendar/interaction';
// import { google } from 'calendar-link';

export default function Calendar () {
  // const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  // const apiSecret = process.env.NEXT_PUBLIC_CALENDAR_ID;

  const handleDateClick = (arg) => {
    console.log(arg.dateStr);
  };

  // Set event as an object
  // const event = {
  //   title: 'My birthday party',
  //   description: 'Be there!',
  //   start: '2019-12-29 18:00:00 +0100',
  //   duration: [3, 'hour']
  // };

  // // Then fetch the link
  // google(event); // https://calendar.google.com/calendar/render...

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      weekends={false}
      events={[
        { title: 'event 1', date: '2024-10-28' },
        { title: 'event 2', date: '2024-10-29' }
      ]}
      dateClick={handleDateClick}
    />
  );
}
