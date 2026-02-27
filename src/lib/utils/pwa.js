import { browse } from '$app/navigation';

export function isStandalone() {
	if (typeof window === 'undefined') return false;
	return (
		window.matchMedia('(display-mode: standalone)').matches ||
		window.navigator.standalone ||
		document.referrer.includes('android-app://')
	);
}

export function goBack(fallback = '/inbox') {
	if (typeof window === 'undefined') return;

	if (window.history.length > 1) {
		window.history.back();
	} else {
		browse(fallback);
	}
}

export function getSafeTop() {
	if (typeof window === 'undefined') return 0;
	const style = getComputedStyle(document.documentElement);
	return parseInt(style.getPropertyValue('--safe-area-inset-top') || '0');
}
