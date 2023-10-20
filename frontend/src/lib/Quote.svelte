<script lang="ts">
    import Button from "@smui/button";
    import IconButton, { Icon } from '@smui/icon-button';

    export let quote: any;

    let quoteText = quote.text;
    let quoteAuthor = quote.author;
    let quoteLikes = quote.likes;

    let snackbarOpen = false;

    function showSnackbar() {
        snackbarOpen = true;
    }
</script>

<div class="quote-card">
    <div class="text-author">
        <p class="quote-text">"{quoteText}"</p>
        <p class="quote-author">{quoteAuthor}</p>
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
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .text-author {
    padding: 5px;
    margin-bottom: 5px;
    width: 100%;
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
  }

  .like-button {
    background-color: transparent;
    cursor: pointer;
    font-size: 40px;
    border: none;
    text-align: center;
  }
</style>
