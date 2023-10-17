<script lang="ts">
	import { env } from "$env/dynamic/public";
	import { onMount } from 'svelte';

	let quotes: any[] = [];

	onMount(async () => {
		await fetch(`${env.PUBLIC_API_URL}/quote`)
			.then(res => res.json())
			.then(data => {
				quotes = data;
				console.log(quotes);
			});
	});
</script>

<section>
	<h1>
		This is the quotes app
	</h1>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
