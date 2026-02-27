<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { X } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	export let show = false;
	export let title = '';

	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}

	function handleKeydown(e) {
		if (e.key === 'Escape' && show) close();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if show}
	<div class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
		<div 
			class="absolute inset-0 bg-black/40 backdrop-blur-sm" 
			on:click={close}
			transition:fade={{ duration: 200 }}
		></div>

		<div 
			class="relative w-full max-w-lg bg-ios-bg dark:bg-ios-darkCard rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden"
			transition:fly={{ y: 300, duration: 300 }}
		>
			<div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mt-3 mb-1 sm:hidden"></div>

			<header class="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/5">
				<button on:click={close} class="text-ios-blue text-[17px] active:opacity-50 transition-opacity">
					Cancel
				</button>
				<h2 class="font-semibold text-[17px] text-black dark:text-white">{title}</h2>
				<div class="w-12">
					<slot name="action" />
				</div>
			</header>

			<div class="p-6 overflow-y-auto max-h-[80vh]">
				<slot />
			</div>
		</div>
	</div>
{/if}
