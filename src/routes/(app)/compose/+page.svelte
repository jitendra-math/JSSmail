<script>
	import { enhance } from '$app/forms';
	import Header from '$lib/components/layout/Header.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Editor from '$lib/components/ui/Editor.svelte';
	import { LayoutTemplate, Send } from 'lucide-svelte';

	export let data;
	export let form;

	let to = '';
	let subject = '';
	let html = '';
	let loading = false;

	function applyTemplate(templateHtml) {
		html = templateHtml;
	}
</script>

<Header title="New Message" showBack={true} backUrl="/inbox" large={false}>
	<div slot="right">
		<form method="POST" action="?/send" use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				loading = false;
				update();
			};
		}}>
			<input type="hidden" name="to" value={to} />
			<input type="hidden" name="subject" value={subject} />
			<input type="hidden" name="html" value={html} />
			<button type="submit" disabled={loading} class="active:opacity-50 text-ios-blue font-bold disabled:opacity-30">
				<Send size={22} />
			</button>
		</form>
	</div>
</Header>

<div class="px-4 py-4 space-y-4 bg-ios-bg dark:bg-black min-h-screen pb-32">
	{#if form?.message}
		<div class="p-3 bg-ios-red/10 text-ios-red rounded-xl text-sm font-medium">
			{form.message}
		</div>
	{/if}

	<div class="bg-white dark:bg-ios-darkCard rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
		<div class="flex items-center px-4 py-3 border-b border-black/5 dark:border-white/5">
			<span class="text-gray-400 w-12 font-medium">To:</span>
			<input 
				type="email" 
				bind:value={to}
				class="flex-1 bg-transparent outline-none text-black dark:text-white"
				placeholder="recipient@example.com"
			/>
		</div>
		<div class="flex items-center px-4 py-3">
			<span class="text-gray-400 w-12 font-medium">Sub:</span>
			<input 
				type="text" 
				bind:value={subject}
				class="flex-1 bg-transparent outline-none text-black dark:text-white"
				placeholder="Subject line"
			/>
		</div>
	</div>

	<div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
		{#each data.templates as template}
			<button 
				on:click={() => applyTemplate(template.content)}
				class="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-ios-blue/10 text-ios-blue rounded-full text-xs font-bold whitespace-nowrap active:scale-95 transition-transform"
			>
				<LayoutTemplate size={14} />
				{template.name}
			</button>
		{/each}
	</div>

	<Editor bind:value={html} label="Message Body (HTML)" />
</div>
