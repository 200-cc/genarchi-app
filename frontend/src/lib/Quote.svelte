<script lang="ts">
    export let quote: any;

    let quoteText = quote.text;
    let quoteAuthor = quote.author;
    let quoteLikes = quote.likes;
</script>

<div>
    <p>{quoteText}</p>
    <p>{quoteAuthor}</p>
    <p>{quoteLikes} likes !</p>
</div>

<style lang="scss">
  div {
        background-color: #fff;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        width: 100%;
    }
</style>