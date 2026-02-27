import { RESEND_API_KEY } from '$env/static/private';

export async function sendEmail({ from, to, subject, html }) {
	try {
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${RESEND_API_KEY}`
			},
			body: JSON.stringify({
				from: from || 'JSS Mail <mail@jssoriginals.com>',
				to: Array.isArray(to) ? to : [to],
				subject,
				html
			})
		});

		const result = await response.json();

		if (!response.ok) {
			return { 
				success: false, 
				error: result.message || 'Failed to dispatch email' 
			};
		}

		return { success: true, id: result.id };
	} catch (err) {
		return { success: false, error: err.message };
	}
}
