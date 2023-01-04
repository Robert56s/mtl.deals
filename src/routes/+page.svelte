<script>
    export let data;
</script>

<div class="main">
    {#each data.products as product}
    <div class="div">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
    </div>
    {/each}
    <footer>
        Copyright © mtl.deals 2022 
    </footer>
</div>

<style>
    .main {
        padding-inline: 2rem;
    }
	.main .div {
		margin-top: 2rem;
	}
    .main footer{
        text-align: center;
        padding: 1rem;
        margin-top: 2rem;
    }
</style>