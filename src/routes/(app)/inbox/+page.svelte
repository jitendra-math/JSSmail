<script>
	import { invalidateAll } from '$app/navigation';
	import Header from '$lib/components/layout/Header.svelte';
	import SwipeableItem from '$lib/components/layout/SwipeableItem.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { formatRelativeDate } from '$lib/utils/dates';
	import { Search } from 'lucide-svelte';

	export let data;
	let searchQuery = '';

	$: filteredEmails = data.emails.filter(email => 
		email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
		email.from.toLowerCase().includes(searchQuery.toLowerCase())
	);

	async function handleDelete(id) {
		const formData = new FormData();
		formData.append('id', id);

		const response = await fetch('?/deleteEmail', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			invalidateAll();
		}
	}
</script>

<Header title="Inbox" />

<div class="px-4 mb-4">
	<div class="relative flex items-center bg-black/5 dark:bg-white/10 rounded-xl px-3 py-2">
		<Search size={18} class="text-gray-400 mr-2" />
		<input 
			type="text" 
			placeholder="Search Mail" 
			bind:value={searchQuery}
			class="w-full bg-transparent outline-none text-[17px] text-black dark:text-white placeholder:text-gray-400"
		/>
	</div>
</div>

<div class="flex flex-col border-t border-black/5 dark:border-white/5 bg-white dark:bg-black">
	{#if filteredEmails.length === 0}
		<div class="flex flex-col items-center justify-center py-20 text-gray-400">
			<p class="text-lg">No Messages</p>
		</div>
	{:else}
		{#each filteredEmails as email (email._id)}
			<SwipeableItem on:delete={() => handleDelete(email._id)}>
				<a 
					href="/inbox/{email._id}" 
					class="flex flex-col gap-1 p-4 border-b border-black/5 dark:border-white/5 active:bg-black/5 dark:active:bg-white/5 transition-colors"
				>
					<div class="flex justify-between items-start">
						<span class="font-bold text-[17px] text-black dark:text-white truncate pr-4">
							{email.from.split('<')[0] || email.from}
						</span>
						<div class="flex items-center gap-2">
							<span class="text-[15px] text-gray-500">{formatRelativeDate(email.receivedAt)}</span>
						</div>
					</div>
					
					<div class="flex justify-between items-center">
						<span class="text-[15px] font-semibold text-black dark:text-white truncate">
							{email.subject}
						</span>
						{#if !email.isRead}
							<Badge variant="dot" />
						{/if}
					</div>

					<p class="text-[15px] text-gray-500 line-clamp-2 leading-snug">
						{email.body.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
					</p>
				</a>
			</SwipeableItem>
		{/each}
	{/if}
</div>
