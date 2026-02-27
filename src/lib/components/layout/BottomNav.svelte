<script>
	import { page } from '$app/stores';
	import { Inbox, Send, LayoutTemplate, Trash2, PenSquare } from 'lucide-svelte';

	const navItems = [
		{ href: '/inbox', icon: Inbox, label: 'Inbox' },
		{ href: '/compose', icon: PenSquare, label: 'Compose' },
		{ href: '/templates', icon: LayoutTemplate, label: 'Templates' },
		{ href: '/trash', icon: Trash2, label: 'Trash' }
	];

	$: currentPath = $page.url.pathname;
</script>

<nav class="fixed bottom-0 left-0 right-0 z-50">
	<div class="bg-ios-card/80 dark:bg-ios-darkCard/80 backdrop-blur-2xl border-t border-black/5 dark:border-white/5 pb-safe-bottom">
		<div class="flex items-center justify-around h-16">
			{#each navItems as item}
				<a
					href={item.href}
					class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors {currentPath.startsWith(item.href) ? 'text-ios-blue' : 'text-gray-400 dark:text-gray-500'}"
				>
					<svelte:component this={item.icon} size={24} strokeWidth={currentPath.startsWith(item.href) ? 2.5 : 2} />
					<span class="text-[10px] font-medium">{item.label}</span>
				</a>
			{/each}
		</div>
	</div>
</nav>
