<script>
export let data;
const { products } = data;
</script>

<main>
    {#each products as product}
    <div class="div">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
    </div>
    {/each}
</main>

<style>
    main {
        min-height: 100rem;
    }

    div {
        padding: 1rem 2rem;
    }
    
</style>