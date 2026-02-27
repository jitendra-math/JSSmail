<script>
	import { ChevronLeft } from 'lucide-svelte';
	import { goBack } from '$lib/utils/pwa';

	export let title = '';
	export let showBack = false;
	export let backUrl = '';
	export let backLabel = 'Back';
	export let large = true;
</script>

<header class="sticky top-0 z-40 w-full bg-ios-bg/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 pt-safe-top">
	<div class="px-4 h-11 flex items-center justify-between">
		<div class="flex-1 flex items-center">
			{#if showBack}
				{#if backUrl}
					<a href={backUrl} class="flex items-center text-ios-blue -ml-2 active:opacity-50 transition-opacity">
						<ChevronLeft size={28} strokeWidth={2} />
						<span class="text-[17px] -ml-1">{backLabel}</span>
					</a>
				{:else}
					<button on:click={() => window.history.back()} class="flex items-center text-ios-blue -ml-2 active:opacity-50 transition-opacity">
						<ChevronLeft size={28} strokeWidth={2} />
						<span class="text-[17px] -ml-1">{backLabel}</span>
					</button>
				{/if}
			{/if}
		</div>

		<div class="flex-1 text-center">
			{#if !large}
				<h2 class="text-[17px] font-semibold tracking-tight truncate px-2 text-black dark:text-white">
					{title}
				</h2>
			{/if}
		</div>

		<div class="flex-1 flex justify-end items-center gap-4 text-ios-blue">
			<slot name="right" />
		</div>
	</div>

	{#if large}
		<div class="px-4 pb-2 pt-1">
			<h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">
				{title}
			</h1>
		</div>
	{/if}
</header>
