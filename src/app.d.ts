declare global {
	namespace App {
		interface Locals {
			session: {
				user: string;
				authenticatedAt: string;
			} | null;
		}
		interface PageData {
			session?: {
				user: string;
				authenticatedAt: string;
			} | null;
		}
		interface Error {}
		interface Platform {}
	}
}

export {};
