import { NextResponse } from 'next/server';
import db from '../../../db/db.js';
export async function POST(request){
    const {user_email, title, category, type, amount, date,description,currentAccount} = await request.json();
    if(!user_email || !title || !category || !type || !amount || !currentAccount){
        return new Response('All fields are required', {status: 400});
    }
    try {
        await db.execute(
            'INSERT INTO transactions (user_email, title, category, type, amount, description,account) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [user_email, title, category, type, amount, description,currentAccount]
        );
        const idTnx=await db.query('SELECT id FROM transactions WHERE user_email = ? AND title = ? AND amount = ? ORDER BY id DESC LIMIT 1', [user_email, title, amount]);
        return NextResponse.json({message: 'Transaction added successfully',idTnx});
    } catch (error) {
        console.error('Error adding transaction:', error);
        return NextResponse.json({error: 'Failed to add transaction'}, {status: 500});
    }
}