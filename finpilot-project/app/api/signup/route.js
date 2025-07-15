import db from '../../../db/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password,firstName,lastName } = body;

    // Here you would typically validate the credentials and create a session
    // For demonstration, we will just return a success message
    if (email && password) {
      console.log(`User logged in with email: ${email}`);
      const [row]=await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if(row.length>0){
        return new Response(JSON.stringify({ error: 'User already exists' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }else{
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)', [firstName+" "+lastName,email, hashedPassword]);
        console.log(`User created with email: ${email}`);
      }
      return new Response(JSON.stringify({ message: 'Login successful' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error during signup:', error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}