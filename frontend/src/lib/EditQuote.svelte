<!-- CreateQuoteDialog.svelte -->
<script lang="ts">
	import { env } from '$env/dynamic/public';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';

	export let isOpen: boolean;
	export let quote: string;
	// console.log(quoteText);
</script>

<div class="dialog">
	<Dialog
		open={isOpen}
		scrimClickAction=""
		aria-labelledby="simple-title"
		aria-describedby="simple-content"
		fullscreen
	>
		<Content>
			<Title>Modifier une citation</Title>
			<Textfield
				bind:value={quote.text}
				style="width: 100%; height: 30vh; margin-bottom: 10px; margin-top: 10px;"
				textarea
			/>
		</Content>
		<Actions>
			<Button
				on:click={() => {
					isOpen = false;
				}}
			>
				Annuler
			</Button>
			<Button
				on:click={() =>
					fetch(`${env.PUBLIC_API_URL}/quote/${quote.id}`, {
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							text: quote.text,
							author: quote.author
						})
					}).then(() => {
						isOpen = false;
					})}
				color="primary"
			>
				Modifier
			</Button>
		</Actions>
	</Dialog>
</div>

<style>
	.dialog {
		display: flex;
		flex-direction: column;
		width: 60%;
		align-content: flex-start;
	}
</style>
