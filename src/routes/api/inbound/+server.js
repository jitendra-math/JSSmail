import { json } from '@sveltejs/kit';
import DOMPurify from 'isomorphic-dompurify';
import { connectToDatabase } from '$db/mongo';
import { Email } from '$db/models/Email';

export async function POST({ request }) {
    try {
        const payload = await request.json();

        if (payload.type !== 'email.received') {
            return json({ success: true, message: 'Ignored non-receive event' });
        }

        const emailData = payload.data;

        await connectToDatabase();

        const cleanHtml = DOMPurify.sanitize(emailData.html || '');
        const rawText = emailData.text || '';
        const snippet = rawText.replace(/\s+/g, ' ').substring(0, 100).trim();

        let fromName = '';
        let fromAddress = emailData.from;

        const fromMatch = emailData.from.match(/(.*)<(.*)>/);
        if (fromMatch) {
            fromName = fromMatch[1].trim().replace(/"/g, '');
            fromAddress = fromMatch[2].trim();
        }

        const newEmail = new Email({
            from: {
                name: fromName,
                address: fromAddress
            },
            to: Array.isArray(emailData.to) ? emailData.to[0] : emailData.to,
            subject: emailData.subject || '(No Subject)',
            body: {
                html: cleanHtml,
                text: rawText,
                snippet: snippet
            },
            folder: 'inbox',
            isRead: false
        });

        await newEmail.save();

        return json({ success: true, id: newEmail._id });
    } catch (error) {
        return json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}
