import { Email } from '$db/models/Email';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { id } = params;

	try {
		const email = await Email.findByIdAndUpdate(
			id, 
			{ isRead: true }, 
			{ new: true }
		).lean();

		if (!email) {
			throw error(404, 'Email not found');
		}

		return {
			email: JSON.parse(JSON.stringify(email))
		};
	} catch (err) {
		throw error(500, 'Internal Server Error');
	}
};
