
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
export async function POST(request) {
    const refreshToken = request.headers.get('Authorization')?.split(' ')[1];
    if (!refreshToken) {
        return new Response(JSON.stringify({ error: 'Refresh token is required' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userEmail = decoded.email;

        // Generate a new access token
        const newAccessToken = jwt.sign({ email: userEmail }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const newRefreshToken = jwt.sign({ email: userEmail }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        const serialized = serialize('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'strict',
        });
        return new Response(JSON.stringify({ accessToken: newAccessToken }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Set-Cookie': serialized },
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
        return new Response(JSON.stringify({ error: 'Invalid refresh token' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}