import { start_mongo } from '$lib/server/db/mongo';
import { JWT_SECRET } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

start_mongo();

export const handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session');
	
	if (token) {
		try {
			// Token verify kar rhe hain
			const decoded = jwt.verify(token, JWT_SECRET);
			event.locals.session = decoded;
		} catch (err) {
			// Agar token nakli nikla toh session uda do
			event.cookies.delete('session', { path: '/' });
			event.locals.session = null;
		}
	}

	const isProtectedRoute = event.url.pathname.startsWith('/inbox') || 
							 event.url.pathname.startsWith('/compose');

	if (isProtectedRoute && !event.locals.session) {
		throw redirect(303, '/login');
	}

	return await resolve(event);
};
