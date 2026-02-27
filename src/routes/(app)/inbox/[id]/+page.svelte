<script>
	import Header from '$lib/components/layout/Header.svelte';
	import { formatFullDate } from '$lib/utils/dates';
	import { Trash2, Reply, Forward } from 'lucide-svelte';

	export let data;
	const { email } = data;
</script>

<Header title="Email" showBack={true} backUrl="/inbox" large={false}>
	<button slot="right" class="active:opacity-50">
		<Trash2 size={22} />
	</button>
</Header>

<div class="px-4 py-6 bg-ios-bg dark:bg-black min-h-screen">
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-black dark:text-white leading-tight mb-4">
			{email.subject}
		</h1>

		<div class="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-full bg-ios-blue flex items-center justify-center text-white font-bold text-lg">
					{email.from[0].toUpperCase()}
				</div>
				<div class="flex flex-col">
					<span class="font-semibold text-black dark:text-white">{email.from}</span>
					<span class="text-xs text-gray-500">{formatFullDate(email.receivedAt)}</span>
				</div>
			</div>
			<span class="text-xs font-medium text-ios-blue bg-ios-blue/10 px-2 py-1 rounded-md">To: Me</span>
		</div>
	</div>

	<div class="prose dark:prose-invert max-w-none text-[17px] leading-relaxed text-gray-800 dark:text-gray-200">
		{@html email.body}
	</div>

	<div class="fixed bottom-20 left-4 right-4 flex gap-3 pb-safe-bottom">
		<button class="flex-1 flex items-center justify-center gap-2 py-3 bg-black/5 dark:bg-white/10 rounded-xl text-ios-blue font-semibold active:scale-95 transition-all">
			<Reply size={18} /> Reply
		</button>
		<button class="flex-1 flex items-center justify-center gap-2 py-3 bg-black/5 dark:bg-white/10 rounded-xl text-ios-blue font-semibold active:scale-95 transition-all">
			<Forward size={18} /> Forward
		</button>
	</div>
</div>
