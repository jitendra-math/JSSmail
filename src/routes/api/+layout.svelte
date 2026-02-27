<script>
	import { page } from '$app/stores';
	import { Inbox, FileText, PenSquare, Trash2 } from 'lucide-svelte';

	$: currentPath = $page.url.pathname;

	const navItems = [
		{ name: 'Inbox', path: '/inbox', icon: Inbox },
		{ name: 'Templates', path: '/templates', icon: FileText },
		{ name: 'Compose', path: '/compose', icon: PenSquare },
		{ name: 'Trash', path: '/trash', icon: Trash2 }
	];
</script>

<div class="h-[100dvh] flex flex-col bg-ios-bg dark:bg-black w-full overflow-hidden">
	<main class="flex-1 overflow-y-auto overflow-x-hidden pt-safe-top pb-[calc(env(safe-area-inset-bottom)+4rem)] relative">
		<slot />
	</main>

	<nav class="fixed bottom-0 w-full bg-ios-card/80 dark:bg-ios-darkCard/80 backdrop-blur-xl border-t border-black/5 dark:border-white/10 pb-safe-bottom z-50">
		<div class="flex items-center justify-around h-16 px-2">
			{#each navItems as item}
				<a
					href={item.path}
					class="flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors {currentPath.startsWith(item.path) ? 'text-ios-blue' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}"
				>
					<svelte:component this={item.icon} size={24} strokeWidth={currentPath.startsWith(item.path) ? 2.5 : 2} />
					<span class="text-[10px] font-medium tracking-wide">{item.name}</span>
				</a>
			{/each}
		</div>
	</nav>
</div>
