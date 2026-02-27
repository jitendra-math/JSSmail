<script>
	export let variant = 'default';
	
	const styles = {
		default: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
		blue: 'bg-ios-blue text-white',
		outline: 'border border-black/10 dark:border-white/10 text-gray-500',
		dot: 'w-2.5 h-2.5 bg-ios-blue rounded-full'
	};
</script>

{#if variant === 'dot'}
	<div class={styles.dot}></div>
{:else}
	<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide {styles[variant]}">
		<slot />
	</span>
{/if}
