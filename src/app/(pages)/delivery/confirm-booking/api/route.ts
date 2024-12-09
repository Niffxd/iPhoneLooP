/* eslint-disable */

export const dynamic = 'force-static';

const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
import { NextRequest } from 'next/server';

const calendarId = process.env.NEXT_PUBLIC_CALENDAR_ID;

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const KEY_FILE_PATH = './src/app/api/credentials.json';
const CALENDAR_ID = calendarId;

const auth = new GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES,
});

const authClient = await auth.getClient();
const calendarApi = google.calendar({ version: 'v3', auth: authClient });

async function listEvents() {
  const response = await calendarApi.events.list({
    calendarId: CALENDAR_ID,
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = response.data.items;

  // if (events.length) {
  //   console.log('Próximos eventos:');
  //   events.forEach((event: any) => {
  //     const start = event.start.dateTime || event.start.date;
  //     console.log(`${start} - ${event.summary}`);
  //   });
  // } else {
  //   console.log('No hay próximos eventos.');
  // }

  return events;
}

async function createEvent() {
  try {
    const event = {
      summary: 'Reunión de equipo',
      location: 'PhoneLooP, 32 Elizabeth St, North Perth WA 6006, Australia',
      description: 'Discutir avances del proyecto',
      start: {
        dateTime: '2024-12-10T10:00:00-05:00',
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: '2024-12-10T11:00:00-05:00',
        timeZone: 'America/New_York',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    // Llamada a la API para crear el evento
    const response = await calendarApi.events.insert({
      calendarId: CALENDAR_ID,
      resource: event,
    });

    console.log('Evento creado con éxito:');
    console.log(`ID del evento: ${response.data.id}`);
    console.log(`Link: ${response.data.htmlLink}`);
  } catch (error) {
    console.error('Error al crear el evento:', error);
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl;

  // createEvent();
  const eventsList = await listEvents();

  return Response.json({ events: eventsList });
}
