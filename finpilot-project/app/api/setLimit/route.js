import db from '../../../db/db.js';

export async function POST(request) {
    try {
        const { limit,account } = await request.json();
        if (typeof limit !== 'number' || limit <= 0) {
            return new Response(JSON.stringify({ error: 'Invalid limit value' }), { status: 400 });
        }

        // Here you would typically save the limit to a database or state management system
        await db.execute('UPDATE accounts SET acc_limit = ? WHERE acc_name = ?', [limit, account]); // Example query
        // For this example, we will just return the limit back
        return new Response(JSON.stringify({ success: true, limit }), { status: 200 });
    } catch (error) {
        console.error('Error setting limit:', error);
        return new Response(JSON.stringify({ error: 'Failed to set limit' }), { status: 500 });
    }
}