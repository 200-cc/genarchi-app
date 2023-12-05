<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	import FormField from '@smui/form-field';
	import NewQuote from '$lib/NewQuote.svelte';
	import Quote from '$lib/Quote.svelte';
	import Textfield from '@smui/textfield';

	let quotes: any[] = [];

	let isNewQuoteDialogOpen = false;
	export let currentPage = 1;
	export let itemsPerPage = 5;
	function openNewQuoteDialog() {
		isNewQuoteDialogOpen = true;
	}
	function closeDialog() {
		isNewQuoteDialogOpen = false;
	}

	onMount(async () => {
		await fetch(
			`${env.PUBLIC_API_URL}/quote?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`
		)
			.then((res) => res.json())
			.then((data) => {
				quotes = data;
			});
	});

	function updateItemsPerPage(event) {
		event.preventDefault();
		currentPage = 1;
		let newQuotes: any[] = [];
		fetch(
			`${env.PUBLIC_API_URL}/quote?skip=${(currentPage - 1) * itemsPerPage}&take=${itemsPerPage}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				quotes = data;
				console.log(quotes);
			});
	}

	async function changementDePage(page: number) {
		let test = true;
		const res = await fetch(
			`${env.PUBLIC_API_URL}/quote?skip=${(page - 1) * itemsPerPage}&take=${itemsPerPage}`
		);

		if (!res.ok) test = false;
		else {
			const tmp = await res.json();
			if (tmp.length == 0) test = false;
			else {
				quotes = tmp;
			}
		}

		if (test) currentPage = page;
	}
</script>

<section>
	<div class="grid grid-cols-2">
		<div class="left-align">
			<button on:click={openNewQuoteDialog}>➕ Nouvelle citation</button>
		</div>
	</div>

	<div class="quotes">
		{#each quotes as quote (quote.id)}
			<Quote {quote} />
		{/each}
	</div>
	<div>
		{#if currentPage > 1}
			<button on:click={async () => await changementDePage(currentPage - 1)}
				>Page précédente ⬅️</button
			>
		{/if}
		<button on:click={async () => await changementDePage(currentPage + 1)}>➡️ Page suivante</button>
	</div>
	<form class="center-form" on:submit={updateItemsPerPage}>
		<div class="grid grid-rows-2 grid-cols-1">
			<p>Items par pages</p>
			<div class="grid grid-cols-2">
				<div class="col-span-1">
					<FormField>
						<Textfield type="number" bind:value={itemsPerPage} id="itemsPerPage" min="1" />
					</FormField>
				</div>
				<div class="col-span-1">
					<button on:click={async () => await changementDePage(currentPage)}>🔄</button>
				</div>
			</div>
		</div>
	</form>
</section>
<section>
	<NewQuote bind:isOpen={isNewQuoteDialogOpen} on:close={closeDialog} />
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

	.quotes {
		width: 100%;
	}

	.left-align {
		display: flex;
		align-items: center;
	}

	.center-form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
