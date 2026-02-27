import mongoose from 'mongoose';
import { env } from '$env/dynamic/private';

export async function start_mongo() {
	if (mongoose.connection.readyState === 1) return;

	try {
		await mongoose.connect(env.MONGODB_URI || '');
	} catch (err) {
		console.error('MongoDB Connection Error:', err);
	}
}

mongoose.connection.on('connected', () => console.log('MongoDB Connected'));
