import nodemailer from 'nodemailer';


export async function POST(request) {
    const { user_email, currentLimit } = await request.json();
    if (!user_email || !currentLimit) {
        return new Response(JSON.stringify({ error: 'Email and limit are required' }), { status: 400 });
    }

    try {
        // Create a transporter using your email service credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
            },
        });
        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user_email,
            subject: 'Account Limit Notification',
            text: `Dear User,

    We wanted to inform you that you have reached your set transaction limit of ${currentLimit}. At this time, you will not be able to add additional transactions.

    If you have any questions or need to increase your limit, please contact our support team.

    Thank you for using our service.

    Best regards,
    The FinPilot Team`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: 'Limit email sent successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error sending limit email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send limit email' }), { status: 500 });
    }
}