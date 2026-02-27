<script>
	import { enhance } from '$app/forms';
	import Header from '$lib/components/layout/Header.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import Editor from '$lib/components/ui/Editor.svelte';
	import { Plus, Trash2, LayoutTemplate } from 'lucide-svelte';

	export let data;
	let showModal = false;
	let name = '';
	let content = '';
</script>

<Header title="Templates">
	<button slot="right" on:click={() => (showModal = true)} class="active:opacity-50">
		<Plus size={26} strokeWidth={2.5} />
	</button>
</Header>

<div class="px-4 py-4 space-y-4 pb-32">
	{#if data.templates.length === 0}
		<div class="flex flex-col items-center justify-center py-20 text-gray-400">
			<LayoutTemplate size={48} class="mb-4 opacity-20" />
			<p class="text-lg">No templates yet</p>
			<p class="text-sm">Tap + to create your first one</p>
		</div>
	{:else}
		<div class="grid gap-4">
			{#each data.templates as template}
				<div class="bg-white dark:bg-ios-darkCard p-4 rounded-2xl border border-black/5 dark:border-white/5 flex items-center justify-between">
					<div class="flex flex-col">
						<span class="font-bold text-lg text-black dark:text-white">{template.name}</span>
						<span class="text-xs text-gray-500 uppercase tracking-widest font-semibold mt-1">HTML Template</span>
					</div>
					<div class="flex items-center gap-2">
						<form method="POST" action="?/delete" use:enhance>
							<input type="hidden" name="id" value={template._id} />
							<button class="p-2 text-ios-red active:opacity-50 transition-opacity">
								<Trash2 size={20} />
							</button>
						</form>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<Modal show={showModal} title="New Template" on:close={() => (showModal = false)}>
	<form 
		method="POST" 
		action="?/create" 
		class="space-y-6"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					showModal = false;
					name = '';
					content = '';
					await update();
				}
			};
		}}
	>
		<div class="space-y-1.5">
			<label class="text-xs font-semibold text-gray-400 uppercase ml-1 tracking-wider">Template Name</label>
			<input 
				name="name"
				bind:value={name}
				placeholder="e.g., Professional Signature"
				class="w-full p-4 bg-white dark:bg-black/20 rounded-xl border border-black/5 dark:border-white/10 outline-none focus:ring-2 focus:ring-ios-blue/50 transition-all"
			/>
		</div>

		<Editor bind:value={content} label="HTML Content" />

		<Button type="submit" variant="primary" class="w-full">
			Save Template
		</Button>
	</form>
</Modal>
