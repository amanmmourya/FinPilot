import db from '../../../db/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Here you would typically validate the credentials and create a session
    // For demonstration, we will just return a success message
    if (email && password) {
      const [row] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
      if (row) {
        const isPasswordValid = await bcrypt.compare(password, row[0].password);
        if (isPasswordValid) {
          return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        } else {
          // Logic to create a session or token can go here
          // For now, we will just log the email
          const accessToken = jwt.sign({ email: row[0].email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
          const refreshToken = jwt.sign({ email: row[0].email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
          console.log(`User logged in with email: ${email}`);
          const accessCookie = serialize('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'strict',
          });
          const refreshCookie = serialize('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'strict',
          });
          return new Response(JSON.stringify({ message: 'Login successful', name: row.name }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Set-Cookie': [accessCookie,refreshCookie] },
          });
        }
        console.log(`User logged in with email: ${email}`);
      } else {
        return new Response(JSON.stringify({ error: 'User not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

    } else {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.log('Error during login:', error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}