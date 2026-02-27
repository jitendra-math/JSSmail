<script>
	export let value = '';
	export let placeholder = 'Start typing your HTML...';
	export let label = '';

	let textarea;

	function autoResize() {
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = textarea.scrollHeight + 'px';
		}
	}

	$: if (value && textarea) autoResize();
</script>

<div class="flex flex-col gap-1.5 w-full">
	{#if label}
		<label class="text-xs font-semibold text-gray-400 uppercase ml-1 tracking-wider">
			{label}
		</label>
	{/if}
	
	<div class="relative min-h-[200px] rounded-2xl bg-white dark:bg-ios-darkCard border border-black/5 dark:border-white/5 focus-within:ring-2 focus-within:ring-ios-blue/50 transition-all overflow-hidden">
		<textarea
			bind:this={textarea}
			bind:value
			{placeholder}
			on:input={autoResize}
			class="w-full h-full min-h-[200px] p-4 bg-transparent outline-none resize-none font-mono text-[15px] text-gray-800 dark:text-gray-200 leading-relaxed"
		></textarea>
	</div>
</div>
