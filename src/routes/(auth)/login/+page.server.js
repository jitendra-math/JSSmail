import { fail, redirect } from '@sveltejs/kit';
import { MASTER_PASSWORD } from '$env/static/private';

export const load = async ({ locals }) => {
	if (locals.session) {
		throw redirect(303, '/inbox');
	}
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password');

		if (password !== MASTER_PASSWORD) {
			return fail(401, { message: 'Invalid Master Password' });
		}

		const session = {
			user: 'JS Originals Admin',
			authenticatedAt: new Date().toISOString()
		};

		cookies.set('session', JSON.stringify(session), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7
		});

		throw redirect(303, '/inbox');
	}
};
