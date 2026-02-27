<script>
	import { enhance } from '$app/forms';
	import Header from '$lib/components/layout/Header.svelte';
	import { formatRelativeDate } from '$lib/utils/dates';
	import { Trash2, RotateCcw, ArchiveX } from 'lucide-svelte';

	export let data;
</script>

<Header title="Trash" />

<div class="flex flex-col bg-white dark:bg-black min-h-screen pb-32">
	{#if data.emails.length === 0}
		<div class="flex flex-col items-center justify-center py-20 text-gray-400">
			<ArchiveX size={48} class="mb-4 opacity-20" />
			<p class="text-lg">Trash is Empty</p>
		</div>
	{:else}
		<div class="px-4 py-2 bg-ios-bg dark:bg-black/50 border-b border-black/5 dark:border-white/5">
			<p class="text-[13px] text-gray-500 text-center italic">
				Messages in the trash will stay here until deleted permanently.
			</p>
		</div>

		{#each data.emails as email (email._id)}
			<div class="flex flex-col gap-1 p-4 border-b border-black/5 dark:border-white/5 transition-colors">
				<div class="flex justify-between items-start">
					<span class="font-bold text-[17px] text-black dark:text-white truncate">
						{email.from.split('<')[0] || email.from}
					</span>
					<span class="text-[15px] text-gray-500">{formatRelativeDate(email.receivedAt)}</span>
				</div>
				
				<span class="text-[15px] font-semibold text-black dark:text-white truncate">
					{email.subject}
				</span>

				<div class="flex gap-4 mt-3">
					<form method="POST" action="?/restore" use:enhance class="flex-1">
						<input type="hidden" name="id" value={email._id} />
						<button class="w-full flex items-center justify-center gap-2 py-2 bg-ios-blue/10 text-ios-blue rounded-lg text-sm font-bold active:scale-95 transition-transform">
							<RotateCcw size={16} /> Restore
						</button>
					</form>

					<form method="POST" action="?/deleteForever" use:enhance class="flex-1">
						<input type="hidden" name="id" value={email._id} />
						<button class="w-full flex items-center justify-center gap-2 py-2 bg-ios-red/10 text-ios-red rounded-lg text-sm font-bold active:scale-95 transition-transform">
							<Trash2 size={16} /> Delete Forever
						</button>
					</form>
				</div>
			</div>
		{/each}
	{/if}
</div>
