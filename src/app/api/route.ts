const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

const calendarId = process.env.NEXT_PUBLIC_CALENDAR_ID;

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// Ruta al archivo JSON descargado de la cuenta de servicio
const KEY_FILE_PATH = './src/app/api/credentials.json';

// ID del calendario con el que deseas trabajar (puede ser "primary" o un ID específico)
const CALENDAR_ID = calendarId;

// Configura la autenticación
const auth = new GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES,
});

const authClient = await auth.getClient();
const calendarApi = google.calendar({ version: 'v3', auth: authClient });

async function listEvents() {
  const response = await calendarApi.events.list({
    calendarId: CALENDAR_ID,
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = response.data.items;

  if (events.length) {
    console.log('Próximos eventos:');
    events.forEach((event: any) => {
      const start = event.start.dateTime || event.start.date;
      console.log(`${start} - ${event.summary}`);
    });
  } else {
    console.log('No hay próximos eventos.');
  }
}

async function createEvent() {
  try {
    // Detalles del evento
    const event = {
      summary: 'Reunión de equipo',
      location: 'PhoneLooP, 32 Elizabeth St, North Perth WA 6006, Australia',
      description: 'Discutir avances del proyecto',
      start: {
        dateTime: '2024-12-10T10:00:00-05:00', // Fecha y hora de inicio (formato ISO 8601)
        timeZone: 'America/New_York', // Zona horaria
      },
      end: {
        dateTime: '2024-12-10T11:00:00-05:00', // Fecha y hora de fin
        timeZone: 'America/New_York',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // Recordatorio por correo 24 horas antes
          { method: 'popup', minutes: 10 }, // Recordatorio emergente 10 minutos antes
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

export async function GET(request: Request) {
  createEvent();
  listEvents();
}
