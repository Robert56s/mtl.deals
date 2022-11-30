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

<footer>
    
    <p>Copyright &copy; Devpractical.com</p>
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