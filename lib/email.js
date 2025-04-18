const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendMeetingInvite({ to, name, meetingLink, dateTime }) {
  const formattedDate = new Date(dateTime).toLocaleString();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: [to, process.env.COMPANY_EMAIL],
    subject: `Your Meeting with ${process.env.COMPANY_NAME} is Scheduled`,
    html: `
      <div>
        <h2>Meeting Confirmation</h2>
        <p>Hello ${name},</p>
        <p>Your meeting has been scheduled for ${formattedDate}.</p>
        <p>Meeting Link: <a href="${meetingLink}">Join Meeting</a></p>
        <p>We look forward to speaking with you!</p>
        <p>Best regards,<br/>${process.env.COMPANY_NAME}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}