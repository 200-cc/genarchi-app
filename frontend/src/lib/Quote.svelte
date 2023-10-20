<script lang="ts">
    import Button from "@smui/button";
    import IconButton, { Icon } from '@smui/icon-button';
    import {env} from "$env/dynamic/public";

    export let quote: any;

    let quoteText = quote.text;
    let quoteAuthor = quote.author;
    let quoteLikes = quote.likes;

    let snackbarOpen = false;

    function deleteQuote() {
        fetch(`${env.PUBLIC_API_URL}/quote/${quote.id}`, {
            method: 'DELETE',
        })
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
</script>

<div class="quote-card">
    <div class="text-author">
        <p class="quote-text">"{quoteText}"</p>
        <p class="quote-author">{quoteAuthor}</p>
        <Button class="delete-button" on:click={deleteQuote} variant="raised">Supprimer</Button>
    </div>
    <div class="quote-likes">
        <p>{quoteLikes}</p>
        <button class="like-button">
            ❤️
        </button>
    </div>
</div>

<style lang="scss">
  .quote-card {
    background-color: #fff;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  }

  .text-author {
    padding: 5px;
    margin-bottom: 5px;
    width: 80%;
    display: flex;
    flex-direction: column;
  }

  .quote-text {
    font-style: italic;
    font-size: 20px;
    width: 100%;
    margin: 0;
  }

  .quote-author {
    font-size: 20px;
    width: 100%;
    color: #555;
    margin-top: 5px;
  }

  .quote-likes {
    justify-content: flex-end;
    font-size: 40px;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    letter-spacing: -4px;
    width: 20%;
  }

  .like-button {
    background-color: transparent;
    cursor: pointer;
    font-size: 40px;
    border: none;
    text-align: center;
  }
</style>
