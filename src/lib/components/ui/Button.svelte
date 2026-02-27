<script>
	export let type = 'button';
	export let variant = 'primary';
	export let disabled = false;
	export let loading = false;

	const baseStyles = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:active:scale-100';
	
	const variants = {
		primary: 'bg-ios-blue text-white shadow-md py-3 px-6 text-[17px]',
		secondary: 'bg-black/5 dark:bg-white/10 text-ios-blue py-3 px-6 text-[17px]',
		danger: 'bg-ios-red text-white py-3 px-6 text-[17px]',
		ghost: 'text-ios-blue p-2 hover:bg-ios-blue/5'
	};
</script>

<button
	{type}
	{disabled}
	class="{baseStyles} {variants[variant]} {$$props.class || ''}"
	on:click
>
	{#if loading}
		<div class="flex items-center gap-2">
			<svg class="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
			<span>Processing...</span>
		</div>
	{:else}
		<slot />
	{/if}
</button>
