/* eslint-disable */

export const dynamic = 'force-static';

const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
import { NextResponse } from 'next/server';

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
    maxResults: 400,
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = response.data.items;
  return events;
}

async function createEvent(
  fullname: string,
  email: string,
  passcode: string,
  mobileNumber: string,
  alternativeNumber: string,
  selectedDate: string,
  selectedTime: string,
  message: string,
) {
  const nextHour = (parseInt(selectedTime.split(':')[0], 10) + 1).toString();
  const endHour = [nextHour, selectedTime.substring(3)].join(':');

  try {
    const event = {
      summary: `Phone Loop  - ${fullname}`,
      location: 'PhoneLooP, 32 Elizabeth St, North Perth WA 6006, Australia',
      description: `Message: ${!message.length ? 'No message' : message}.\nPasscode: ${passcode}.\nEmail: ${email}.\nPhone: ${mobileNumber}.\nAlt. Phone: ${alternativeNumber}.\n`,
      start: {
        dateTime: `${selectedDate}T${selectedTime}:00-03:00`,
        timeZone: 'Australia/Perth',
      },
      end: {
        dateTime: `${selectedDate}T${endHour}:00-03:00`,
        timeZone: 'Australia/Perth',
      },
      reminders: {
        useDefault: false,
      },
      colorId: '2',
    };

    // Llamada a la API para crear el evento
    const response = await calendarApi.events.insert({
      calendarId: CALENDAR_ID,
      resource: event,
    });

    // console.log('Evento creado con éxito:');
    // console.log(`ID del evento: ${response.data.id}`);
    // console.log(`Link: ${response.data.htmlLink}`);
  } catch (error) {
    return { 'Error al crear el evento:': error };
  }
}

export async function GET() {
  const events = await listEvents();
  const eventList = [];

  for (const event in events) {
    const date = events[event].start.dateTime.substring(0, 10);
    const startTime = events[event].start.dateTime.substring(11, 16);

    eventList.push({ date, startTime });
  }

  const groupedByDate = eventList.reduce((acc: any, item: any) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item.startTime);
    return acc;
  }, {});

  return Response.json(groupedByDate);
}

export async function POST(request: any) {
  try {
    const body = await request.json();

    const {
      fullname,
      email,
      passcode,
      mobileNumber,
      alternativeNumber,
      selectedDate,
      selectedTime,
      message,
    } = body;

    if (
      !fullname ||
      !email ||
      !passcode ||
      !mobileNumber ||
      !alternativeNumber ||
      !selectedDate ||
      !selectedTime
    ) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 },
      );
    }

    try {
      createEvent(
        fullname,
        email,
        passcode,
        mobileNumber,
        alternativeNumber,
        selectedDate,
        selectedTime,
        message,
      );
    } catch (err) {
      return NextResponse.json(
        { error: 'An error occurred processing the request.' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        fullname,
        email,
        passcode,
        mobileNumber,
        alternativeNumber,
        selectedDate,
        selectedTime,
        message,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred processing the request.' },
      { status: 500 },
    );
  }
}
