<script lang="ts">
	import {env} from "$env/dynamic/public";
	import {onMount} from 'svelte';
	import Quote from "$lib/Quote.svelte";

	let quotes: any[] = [];

	export let currentPage = 1;
	export let itemsPerPage = 5;

	onMount(async () => {
		await fetch(`${env.PUBLIC_API_URL}/quote?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`)
				.then(res => res.json())
				.then(data => {
					quotes = data;
				});
	});

	function updateItemsPerPage(event) {
		event.preventDefault();
		currentPage = 1;
		let newQuotes: any[] = [];
		fetch(`${env.PUBLIC_API_URL}/quote?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`)
				.then(res => res.json())
				.then(data => {
					console.log(data);
					quotes = data;
					console.log(quotes);
				});

		// for (let i = quotes.length - 1; i >= 0; i--)
		// 	quotes.pop();
		// console.log(quotes);
		// newQuotes.forEach((quote, index) => {
		// 	myQuotes.push(quote);
		// });
	}

	async function changementDePage(page: number) {
		let test = true;
		const res = await fetch(`${env.PUBLIC_API_URL}/quote?skip=${(page - 1) * itemsPerPage}&take=${itemsPerPage}`);

		if (!res.ok)
			test = false;
		else {
			const tmp = await res.json();
			if (tmp.length == 0)
				test = false;
			else {
				// for (let i = quotes.length - 1; i >= 0; i--)
				// 	quotes.pop();
				// console.log(quotes);
				// tmp.forEach((quote, index) => {
				// 	quotes.push(quote);
				// });
				console.log(tmp);
				quotes = tmp;
				console.log(quotes);
			}
		}

		if (test)
			currentPage = page;
	}
</script>

<section>
	<div>
		<form on:submit={updateItemsPerPage}>
			<label for="itemsPerPage">Nombre d'items par page:</label>
			<input type="number" bind:value={itemsPerPage} id="itemsPerPage" min="1" />
			<button type="submit">Mettre à jour</button>
		</form>
	</div>
	<div>
		{#each quotes as quote (quote.id)}
			<Quote {quote} />
		{/each}
	</div>
	<div>
		{#if currentPage > 1}
			<button on:click={async () => await changementDePage(currentPage - 1)}>Page précédente</button>
		{/if}
		<button on:click={async () => await changementDePage(currentPage + 1)}>Page suivante</button>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 2.5%; /* Fait commencer le contenu en haut de la section */
	}

	div {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		align-items: center;
		padding: 10px;
		margin-bottom: 10px;
	}

</style>
