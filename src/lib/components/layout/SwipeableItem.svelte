<script>
	import { createEventDispatcher } from 'svelte';
	import { Trash2 } from 'lucide-svelte';

	export let threshold = 100;

	const dispatch = createEventDispatcher();

	let startX = 0;
	let currentX = 0;
	let isSwiping = false;

	function handleTouchStart(e) {
		startX = e.touches[0].clientX;
		isSwiping = true;
	}

	function handleTouchMove(e) {
		if (!isSwiping) return;
		const x = e.touches[0].clientX;
		const diff = x - startX;
		
		if (diff < 0) {
			currentX = diff;
		}
	}

	function handleTouchEnd() {
		isSwiping = false;
		if (Math.abs(currentX) > threshold) {
			currentX = -window.innerWidth;
			dispatch('delete');
		} else {
			currentX = 0;
		}
	}
</script>

<div class="relative overflow-hidden bg-ios-red w-full">
	<div 
		class="absolute inset-0 flex items-center justify-end px-6 text-white"
		style="opacity: {Math.min(Math.abs(currentX) / 50, 1)}"
	>
		<Trash2 size={24} />
	</div>

	<div
		class="relative bg-ios-bg dark:bg-black transition-transform duration-200 ease-out"
		style="transform: translateX({currentX}px)"
		on:touchstart={handleTouchStart}
		on:touchmove={handleTouchMove}
		on:touchend={handleTouchEnd}
	>
		<slot />
	</div>
</div>
