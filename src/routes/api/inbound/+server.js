import { json } from '@sveltejs/kit';
import { Email } from '$db/models/Email';
import { WEBHOOK_SECRET } from '$env/static/private';
import { sanitize } from '$lib/server/services/sanitizer';

export const POST = async ({ request, url }) => {
    // URL se secret nikaalna
    const secret = url.searchParams.get('secret');

    // Verification check
    if (secret !== WEBHOOK_SECRET) {
        return json({ error: 'Unauthorized: Invalid Webhook Secret' }, { status: 401 });
    }

    try {
        const payload = await request.json();
        
        // Incoming email data nikaalna
        const { from, subject, text, html, createdAt } = payload;

        const newEmail = new Email({
            from,
            subject,
            body: sanitize(html || text),
            receivedAt: createdAt || new Date(),
            isRead: false,
            isDeleted: false
        });

        await newEmail.save();
        return json({ success: true, message: 'Email stored securely' });
    } catch (err) {
        return json({ error: 'Failed to process inbound email' }, { status: 500 });
    }
};
