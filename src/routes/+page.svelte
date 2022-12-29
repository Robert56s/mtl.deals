<script>
export let data;
</script>

<main>
    {#if data.session}
        <p>Welcome, {data.session.user.email}</p>
    {:else}
        {#each data.products as product}
        <div class="div">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
        </div>
        {/each}
    {/if}
</main>

<footer>
    <p>Copyright &copy; mtl.deals</p>
</footer>

<style>
    main {
        min-height: 100rem;
    }

    div {
        padding: 2rem 2rem;
    }

    footer{
        text-align: center;
        padding: 1rem;
        margin: 1rem;

    }
    
</style>