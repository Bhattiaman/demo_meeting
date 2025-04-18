import { getCalendarClient } from '@/utils/googleCalendar';

export async function POST(req) {
  const calendar = await getCalendarClient();
  const body = await req.json();

  const { email, name, time } = body; // expect this from form

  const event = {
    summary: `Meeting with ${name}`,
    description: 'Auto-scheduled meeting',
    start: {
      dateTime: time,
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: new Date(new Date(time).getTime() + 30 * 60 * 1000).toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    attendees: [
      { email },
      { email: process.env.COMPANY_EMAIL },
    ],
    conferenceData: {
      createRequest: {
        requestId: Math.random().toString(36).substring(7),
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  try {
    const res = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    return Response.json({ success: true, link: res.data.hangoutLink });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ success: false, error: error.message });
  }
}
