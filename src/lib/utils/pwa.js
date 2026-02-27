import { browser } from '$app/environment';

export function isStandalone() {
	if (!browser) return false;
	
	return (
		window.matchMedia('(display-mode: standalone)').matches ||
		window.navigator.standalone ||
		document.referrer.includes('android-app://')
	);
}

export function goBack() {
	if (browser && window.history.length > 1) {
		window.history.back();
	} else if (browser) {
		// Agar history nahi hai toh fallback to inbox
		window.location.href = '/inbox';
	}
}

export function getPWADisplayMode() {
	if (!browser) return 'browser';
	
	if (window.matchMedia('(display-mode: standalone)').matches) {
		return 'standalone';
	}
	
	return 'browser';
}
