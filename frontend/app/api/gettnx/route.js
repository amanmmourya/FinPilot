import { NextResponse } from 'next/server';
import db from '../../../db/db.js'
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request) {
    const { email } = await request.json();
    const token = cookies().get('accessToken');
    console.log('Received token:', token.value);
    if (!token) {
        console.error('No token found in cookies');
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    try {
        const decoded = jwt.verify(token.value, process.env.ACCESS_TOKEN_SECRET);
        if (decoded.email !== email) {
            console.error('Token userId does not match requested userId');
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });
        }
        console.log('Token verified successfully for user:', decoded.email);
        const allTransactions = await db.execute(
            'SELECT * FROM transactions WHERE user_email=?',
            [email]
        );
        return NextResponse.json({ transactionsArray: allTransactions[0] });
    } catch (error) {
        console.error('Token verification failed:', error);
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    
}
