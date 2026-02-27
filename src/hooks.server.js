import { start_mongo } from '$lib/server/db/mongo';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

start_mongo();

export const handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session');
	
	if (token) {
		try {
			const decoded = jwt.verify(token, env.JWT_SECRET || 'fallback-secret');
			event.locals.session = decoded;
		} catch (err) {
			event.cookies.delete('session', { path: '/' });
			event.locals.session = null;
		}
	}

	const isProtectedRoute = event.url.pathname.startsWith('/inbox') || 
							 event.url.pathname.startsWith('/compose') ||
							 event.url.pathname.startsWith('/templates');

	if (isProtectedRoute && !event.locals.session) {
		throw redirect(303, '/login');
	}

	return await resolve(event);
};
