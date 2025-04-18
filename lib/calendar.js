const { google } = require('googleapis');

const calendar = google.calendar({
  version: 'v3',
  auth: process.env.GOOGLE_CALENDAR_API_KEY
});

export async function createCalendarEvent({ email, name, dateTime }) {
  const event = {
    summary: `Meeting with ${name}`,
    description: `Scheduled meeting with ${name} (${email})`,
    start: {
      dateTime: dateTime,
      timeZone: 'UTC',
    },
    end: {
      dateTime: new Date(new Date(dateTime).getTime() + 30 * 60000).toISOString(),
      timeZone: 'UTC',
    },
    attendees: [
      { email: email },
      { email: process.env.COMPANY_EMAIL }
    ],
    conferenceData: {
      createRequest: {
        requestId: Math.random().toString(36).substring(2, 15),
        conferenceSolutionKey: {
          type: 'hangoutsMeet'
        }
      }
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all'
    });
    
    return {
      meetingLink: response.data.hangoutLink,
      calendarEvent: response.data
    };
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
}