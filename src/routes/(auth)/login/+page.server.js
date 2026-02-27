import { fail, redirect } from '@sveltejs/kit';
import { MASTER_PASSWORD, JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password');

		if (password !== MASTER_PASSWORD) {
			return fail(401, { message: 'Ghalat Password hai bhai!' });
		}

		// JWT Sign kar rhe hain
		const token = jwt.sign(
			{ user: 'JS Originals Admin' }, 
			JWT_SECRET, 
			{ expiresIn: '7d' }
		);

		cookies.set('session', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		throw redirect(303, '/inbox');
	}
};
