import { createCalendarEvent } from '@/lib/calendar';
import { sendMeetingInvite } from '@/lib/email';

export async function POST(request) {
  try {
    const { name, email, preferredDate, preferredTime } = await request.json();
    
    // Combine date and time
    const dateTime = new Date(`${preferredDate}T${preferredTime}:00Z`).toISOString();
    
    // Create calendar event
    const { meetingLink } = await createCalendarEvent({
      email,
      name,
      dateTime
    });
    
    // Send email invites
    await sendMeetingInvite({
      to: email,
      name,
      meetingLink,
      dateTime
    });
    
    return Response.json({ 
      success: true,
      meetingLink 
    });
    
  } catch (error) {
    console.error('Error scheduling meeting:', error);
    return Response.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}