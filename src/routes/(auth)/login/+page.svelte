<script>
	import { enhance } from '$app/forms';
	import { fade, fly } from 'svelte/transition';
	import Button from '$lib/components/ui/Button.svelte';
	import { Lock, ChevronRight, AlertCircle } from 'lucide-svelte';

	export let form;
	let loading = false;
	let password = '';
</script>

<div class="fixed inset-0 flex flex-col items-center justify-center p-6 bg-ios-bg dark:bg-black">
	<div 
		in:fly={{ y: 20, duration: 800 }}
		class="w-full max-w-sm space-y-8"
	>
		<div class="text-center space-y-2">
			<div class="inline-flex items-center justify-center w-20 h-20 bg-ios-blue rounded-[2rem] shadow-xl mb-4">
				<Lock class="text-white" size={32} />
			</div>
			<h1 class="text-3xl font-bold tracking-tight text-black dark:text-white">
				Secure Access
			</h1>
			<p class="text-gray-500 dark:text-gray-400 font-medium">
				Enter your master password
			</p>
		</div>

		<form 
			method="POST" 
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					update();
				};
			}}
			class="space-y-4"
		>
			<div class="relative group">
				<input 
					type="password" 
					name="password"
					bind:value={password}
					placeholder="••••••••"
					class="w-full px-5 py-4 bg-white dark:bg-ios-darkCard rounded-2xl border border-black/5 dark:border-white/10 outline-none focus:ring-4 focus:ring-ios-blue/10 transition-all text-center text-2xl tracking-[0.5em] placeholder:tracking-normal placeholder:text-sm"
					required
				/>
				
				{#if form?.message}
					<div 
						in:fade
						class="flex items-center justify-center gap-2 mt-4 text-ios-red text-sm font-semibold"
					>
						<AlertCircle size={16} />
						{form.message}
					</div>
				{/if}
			</div>

			<Button 
				type="submit" 
				variant="primary" 
				class="w-full py-4 rounded-2xl flex items-center justify-center gap-2"
				disabled={loading || !password}
			>
				{loading ? 'Verifying...' : 'Continue'}
				<ChevronRight size={20} />
			</Button>
		</form>

		<p class="text-center text-xs text-gray-400 font-medium pt-4">
			Protected by JSS Originals Security
		</p>
	</div>
</div>
