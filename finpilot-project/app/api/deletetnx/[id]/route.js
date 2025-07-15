import db from '../../../../db/db.js'
import { NextResponse } from 'next/server';
export async function DELETE(request) {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();
    if (!id) {
        return new Response('Transaction ID is required', { status: 400 });
    }
    try {
        await db.execute('DELETE FROM transactions WHERE id = ?', [id]);
        return NextResponse.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
    }
}