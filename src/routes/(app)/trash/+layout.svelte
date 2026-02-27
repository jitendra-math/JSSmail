<script>
	import BottomNav from '$lib/components/layout/BottomNav.svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
</script>

<div class="flex flex-col min-h-screen bg-ios-bg dark:bg-black">
	<main class="flex-1 pb-20">
		{#key $page.url.pathname}
			<div in:fade={{ duration: 200, delay: 100 }} out:fade={{ duration: 100 }}>
				<slot />
			</div>
		{/key}
	</main>

	<BottomNav />
</div>
