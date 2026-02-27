import { Email } from '$db/models/Email';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	try {
		const emails = await Email.find({ isDeleted: false })
			.sort({ receivedAt: -1 })
			.lean();

		return {
			emails: JSON.parse(JSON.stringify(emails))
		};
	} catch (err) {
		return { emails: [] };
	}
};

export const actions = {
	deleteEmail: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		if (!id) return fail(400, { message: 'Missing ID' });

		try {
			await Email.findByIdAndUpdate(id, { isDeleted: true });
			return { success: true };
		} catch (err) {
			return fail(500, { message: 'Failed to delete' });
		}
	}
};
