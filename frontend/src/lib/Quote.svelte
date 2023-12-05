<script lang="ts">
	import { env } from '$env/dynamic/public';
	import Button from '@smui/button';

	export let quote: any;

	let quoteText = quote.text;
	let quoteAuthor = quote.author;
	// cast quote like as number
	let quoteLikes = quote.likes as number;

	function deleteQuote() {
		fetch(`${env.PUBLIC_API_URL}/quote/${quote.id}`, {
			method: 'DELETE'
		})
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	function likeQuote() {
		fetch(`${env.PUBLIC_API_URL}/quote/${quote.id}/like`, {
			method: 'POST'
		})
			.then(() => {
				quoteLikes++;
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
</script>

<div class="main-card">
	<div class="grid grid-rows-2 quote-card">
		<div class="quote-text-main">
			<p class="quote-sign">"</p>
			<p class="quote-text">{quoteText}</p>
			<p class="quote-sign">"</p>
		</div>
		<div class="quote-author">~ {quoteAuthor}</div>
	</div>
	<div class="interractions">
		<div>
			<div class="flex justify-center items-center">
				<p>{quoteLikes}</p>
				<p>{' '}</p>
				<button on:click={likeQuote}> ❤️ </button>
			</div>
		</div>
		<p>{' · '}</p>
		<div class="delete-button">
			<button on:click={deleteQuote}> 🗑️ </button>
		</div>
	</div>
</div>

<style lang="scss">
	.main-card {
		width: 100%;
		margin-top: 2vh;
		margin-bottom: 2vh;
	}
	.interractions {
		color: #555;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.quote-card {
		background-color: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		width: 100%;
		margin: 0.5rem auto;
		padding: 0.5rem;
	}

	.quote-text-main {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0.1rem;
		padding: 0.1rem;
		padding-left: 5vw;
		padding-right: 5vw;
	}

	.quote-text {
		margin-left: 0.5vw;
		padding-left: 0.5vw;
		padding-right: 0.5vw;
		margin-right: 0.5vw;
		color: #555;
		font-style: italic;
		text-align: center;
	}

	.quote-sign {
		color: #555;
		font-size: 5vh;
		font-style: normal;
	}

	.quote-author {
		color: #555;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin: 0.1rem;
		padding: 0.1rem;
		padding-right: 3vw;
	}
</style>
