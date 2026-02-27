import { start_mongo } from '$lib/server/db/mongo';
import { redirect } from '@sveltejs/kit';

start_mongo().then(() => {
	console.log('MongoDB connection initialized');
}).catch(err => {
	console.error('MongoDB failed to start:', err);
});

export const handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');
	
	if (session) {
		event.locals.session = JSON.parse(session);
	}

	const isProtectedRoute = event.url.pathname.startsWith('/(app)') || 
							 event.url.pathname.startsWith('/inbox') ||
							 event.url.pathname.startsWith('/compose') ||
							 event.url.pathname.startsWith('/templates') ||
							 event.url.pathname.startsWith('/trash');

	if (isProtectedRoute && !event.locals.session) {
		throw redirect(303, '/login');
	}

	const response = await resolve(event);
	return response;
};
