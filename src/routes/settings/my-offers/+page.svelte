<script>
    export let data;
</script>


<div class="container">
    <div class="bar">
        <a href="/create">New Offer</a>
    </div>
    <div class="main">
        {#each data.products as product}
        <div class="card">
            <div class="view">
                <!-- svelte-ignore a11y-missing-attribute -->
                <img src={product.img_base64} class="image">
            </div>
            <div class="text">
                <div class="top">
                    <div class="title">
                        {product.title}
                    </div>
                    <div class="price">
                        {(product.price/100).toFixed(2)}
                    </div>
                </div>
                <div class="bottom">
                    {product.description}
                </div>
            </div>
        </div>
        {/each}
    </div>
</div>

<style>
    .container {
        
    }
    .bar {
        display: flex;
        justify-content: left;
        align-items: center;
        background-color: grey;
    }
    .bar a {
        text-decoration: none;
	    color: rgb(77, 77, 77);
        padding: 1rem 2rem;
	  	margin: 1rem;
	  	background: #cecece;
	  	border-radius: 6px;
	  	transition: 0.3s;
    }
    .bar a:hover {
        background: #dadada;
    }
    .bar a:active {
        transform: scale(0.9);
    }

    .card {
        background-color: rgb(134, 140, 151);
        display: flex;
        padding: 1rem;
        margin: 1rem;
        border-radius: 5px;
    }
    .view {
        border: solid black ;
        border-radius: 3px;
        display: flex;
    }
    .image {
        height: 8rem;
        aspect-ratio: 1/1;
        object-fit: contain;
    }

    .text {
        flex: 1;
        display: flex;
        flex-direction: column;
        background-color: aliceblue;
    }
    .top {
        flex: 0.3;
        background: blanchedalmond;
    }
    .bottom {
        flex: 0.7;
    }
</style>