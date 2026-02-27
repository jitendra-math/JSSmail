<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fade, scale } from 'svelte/transition';
	import Button from '$lib/components/ui/Button.svelte';

	export let data;

	onMount(() => {
		if (data.session) {
			goto('/inbox');
		}
	});
</script>

<div class="fixed inset-0 flex flex-col items-center justify-between p-8 bg-ios-bg dark:bg-black overflow-hidden">
	<div class="flex-1 flex flex-col items-center justify-center gap-6" in:fade={{ duration: 800 }}>
		<div 
			class="w-24 h-24 bg-gradient-to-br from-ios-blue to-blue-400 rounded-[2.5rem] shadow-2xl flex items-center justify-center"
			in:scale={{ start: 0.8, duration: 1000, delay: 200 }}
		>
			<svg class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
			</svg>
		</div>
		
		<div class="text-center space-y-2">
			<h1 class="text-4xl font-bold tracking-tight text-black dark:text-white">
				JSS Mail
			</h1>
			<p class="text-gray-500 dark:text-gray-400 text-lg font-medium">
				Private Premium Email
			</p>
		</div>
	</div>

	<div class="w-full max-w-sm pb-safe-bottom" in:fade={{ duration: 600, delay: 800 }}>
		{#if !data.session}
			<Button variant="primary" class="w-full py-4 rounded-2xl" on:click={() => goto('/login')}>
				Get Started
			</Button>
		{:else}
			<div class="flex justify-center py-6">
				<div class="flex space-x-2">
					<div class="h-2 w-2 bg-ios-blue rounded-full animate-bounce"></div>
					<div class="h-2 w-2 bg-ios-blue rounded-full animate-bounce [animation-delay:0.2s]"></div>
					<div class="h-2 w-2 bg-ios-blue rounded-full animate-bounce [animation-delay:0.4s]"></div>
				</div>
			</div>
		{/if}
	</div>
</div>
