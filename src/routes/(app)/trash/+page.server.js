import { Email } from '$db/models/Email';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	try {
		const deletedEmails = await Email.find({ isDeleted: true })
			.sort({ receivedAt: -1 })
			.lean();

		return {
			emails: JSON.parse(JSON.stringify(deletedEmails))
		};
	} catch (err) {
		return { emails: [] };
	}
};

export const actions = {
	restore: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		try {
			await Email.findByIdAndUpdate(id, { isDeleted: false });
			return { success: true };
		} catch (err) {
			return fail(500, { message: 'Failed to restore' });
		}
	},
	deleteForever: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		try {
			await Email.findByIdAndDelete(id);
			return { success: true };
		} catch (err) {
			return fail(500, { message: 'Failed to delete permanently' });
		}
	}
};
