<!-- CreateQuoteDialog.svelte -->
<script lang="ts">
    import {env} from "$env/dynamic/public";
    import Dialog, { Title, Content, Actions } from '@smui/dialog'
    import Button, { Label } from '@smui/button'
    import Textfield from '@smui/textfield'

    let text = '';
    let author = '';

    export let isOpen;

    async function createQuote() {
        if (text.length > 0 && author.length > 0) {
            fetch(`${env.PUBLIC_API_URL}/quote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    text,
                    author,
                })
            }).then(() => {
                isOpen = false;
                text = '';
                author = '';
                window.location.href = '/';
            });
        }
    }
</script>

<div class="dialog">
    <Dialog open={isOpen}
            scrimClickAction=""
            aria-labelledby="simple-title"
            aria-describedby="simple-content"
    >
        <Title>Créer une nouvelle citation</Title>
        <Content>
            <Textfield label="Citation" bind:value={text} required />
            <br />
            <Textfield label="Auteur" bind:value={author} required />
        </Content>
        <Actions>
            <Button on:click={() => {
          isOpen = false
        }}>
                Annuler
            </Button>
            <Button on:click={
                fetch(`${env.PUBLIC_API_URL}/quote`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text,
                        author,
                    })
                }).then(() => {
                    isOpen = false;
                    text = '';
                    author = '';
                    window.location.reload();
                })} color="primary">
                Créer
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