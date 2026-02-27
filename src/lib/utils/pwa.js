import { browser } from '$app/environment';

export function isStandalone() {
	if (!browser) return false;
	
	return (
		window.matchMedia('(display-mode: standalone)').matches ||
		window.navigator.standalone ||
		document.referrer.includes('android-app://')
	);
}

export function getPWADisplayMode() {
	if (!browser) return 'browser';
	
	if (window.matchMedia('(display-mode: standalone)').matches) {
		return 'standalone';
	}
	if (window.matchMedia('(display-mode: minimal-ui)').matches) {
		return 'minimal-ui';
	}
	if (window.matchMedia('(display-mode: fullscreen)').matches) {
		return 'fullscreen';
	}
	
	return 'browser';
}
