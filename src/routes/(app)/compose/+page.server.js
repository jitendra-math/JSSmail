import { fail, redirect } from '@sveltejs/kit';
import { sendEmail } from '$lib/server/services/resend';
import { Template } from '$db/models/Template';

export const load = async () => {
	const templates = await Template.find().lean();
	return {
		templates: JSON.parse(JSON.stringify(templates))
	};
};

export const actions = {
	send: async ({ request }) => {
		const data = await request.formData();
		const to = data.get('to');
		const subject = data.get('subject');
		const html = data.get('html');

		if (!to || !subject || !html) {
			return fail(400, { message: 'All fields are required' });
		}

		const result = await sendEmail({
			from: 'mail@jssoriginals.com',
			to,
			subject,
			html
		});

		if (result.success) {
			throw redirect(303, '/inbox');
		}

		return fail(500, { message: result.error });
	}
};
