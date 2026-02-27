import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export function formatRelativeDate(date) {
	if (!date) return '';
	const d = new Date(date);

	if (isToday(d)) {
		return format(d, 'h:mm a');
	}

	if (isYesterday(d)) {
		return 'Yesterday';
	}

	return format(d, 'MMM d');
}

export function formatFullDate(date) {
	if (!date) return '';
	const d = new Date(date);
	return format(d, 'MMMM d, yyyy @ h:mm a');
}

export function timeAgo(date) {
	if (!date) return '';
	return formatDistanceToNow(new Date(date), { addSuffix: true });
}
