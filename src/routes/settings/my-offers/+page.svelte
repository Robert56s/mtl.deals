<script>

    export let data;
    let anchor;
</script>

<div class="container">
    <div class="bar">
        <a href="/create">New Offer</a>
    </div>
    <div class="main">
        {#each [... data.products].reverse() as product, i}
        <a href="/item/{product.id}" class="anchor">
            <div class="card" id={i + 1} bin>
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
                            $ {(product.price/100).toFixed(2)}
                        </div>
                    </div>
                    <div class="bottom">
                        {product.description}
                    </div>
                </div>
            </div>
        </a>
        
        {/each}
    </div>
</div>

<style>
    .bar {
        display: flex;
        justify-content: left;
        align-items: center;

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

    .anchor {
        text-decoration: none;
        color: inherit;
    }
    .card {
        background-color: rgb(255, 255, 255);
        display: flex;
        width: 40rem;
        padding: 1rem;
        margin: 1rem;
        border-radius: 5px;
        transition: 0.2s;
    }
    .card:hover {
        background-color: rgb(219, 219, 219);
    }
    
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-x: hidden;
        overflow-y: auto;
        height: 40rem;
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
        display: flex;
        width: 100%;
        flex-direction: column;
    }
    .top {
        flex: 0.3;
        display: flex;
        padding-inline: 2rem;
        justify-content: space-between;
        align-items: center;
    }
    .title {
        font-size: 1.2rem;
    }
    .price {
        color: green;
    }
    .bottom {
        flex: 0.7;
        color: #858585;
        text-align: left;
        padding: 0.5rem 2rem;
    }
    
</style>