import { Template } from '$db/models/Template';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	try {
		const templates = await Template.find().sort({ createdAt: -1 }).lean();
		return {
			templates: JSON.parse(JSON.stringify(templates))
		};
	} catch (err) {
		return { templates: [] };
	}
};

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const content = data.get('content');

		if (!name || !content) {
			return fail(400, { message: 'Template name and content are required' });
		}

		try {
			const newTemplate = new Template({ name, content });
			await newTemplate.save();
			return { success: true };
		} catch (err) {
			return fail(500, { message: 'Failed to save template' });
		}
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		try {
			await Template.findByIdAndDelete(id);
			return { success: true };
		} catch (err) {
			return fail(500, { message: 'Failed to delete template' });
		}
	}
};
