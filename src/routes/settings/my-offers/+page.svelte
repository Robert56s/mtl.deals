<script>
    import toast from 'svelte-french-toast';
  import { each } from 'svelte/internal';
    export let data;

    const formatter = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0});
    
    const handleDelete = async (id) => {
        
        const response = await fetch('/api/deleteoffer', {
          method: 'POST',
          body: JSON.stringify({id}),
          headers: {
            'content-type': 'application/json'
          }
        });

        let result = await response.json();

        console.log(result)

        if (result.message === 'success', {
            
        }) {
            toast.success('Successfully deleted!')
            location.reload() 
        } else {
            toast.error("This didn't work.")
        }
    }

</script>


<div class="container">
    <div class="bar">
        <a href="/create">New Offer</a>
    </div>
    <div class="main">
        {#each [... data.products].reverse() as product, i}
        {#if product.active}
        <a href="/item/{product.id}" class="anchor">
            <div class="card" id={i + 1} bin>
                <div class="view">
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img src={product.img_link} class="image">
                </div>
                <div class="stuff">
                    <div class="text">
                        <div class="top">
                            <div class="title">
                                {product.title}
                            </div>
                            <div class="price">
                                {formatter.format((product.price/100))}
                            </div>
                        </div>
                        <div class="bottom">
                            {product.description}
                        </div>
                    </div>
                    <div class="icons">
                        <a href="/edit/{product.id}">
                            <img src="https://cdn.discordapp.com/attachments/828812665232425000/1071303113685872661/Edit_icon_the_Noun_Project_30184.svg.png" alt="">
                        </a>
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a href="#" on:click={handleDelete(product.id)}>
                            <img src="https://cdn.discordapp.com/attachments/828812665232425000/1071303152583856148/3405244.png" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </a>
        {/if}
        {/each}
        {#each [... data.receipts].reverse() as receipt, i}
        <a href="/chat/{receipt.chat_id}" class="anchor">
            <div class="card" id={i + 1} bin>
                <div class="view">
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img src={receipt.offers.img_link} class="image">
                </div>
                <div class="stuff">
                    <div class="text">
                        <div class="top">
                            <div class="title">
                                {receipt.offers.title}
                            </div>
                            <div class="price">
                                {formatter.format((receipt.offers.price/100))}
                            </div>
                        </div>
                        <div class="bottom">
                            {receipt.offers.description}
                            <div class="status">
                                {#if receipt.active}
                                Status: Sold, waiting for buyer confirmation
                                {:else}
                                Status: sold
                                {/if}
                            </div>
                        </div>
                    </div>
                    <div class="icons">
                        {#if receipt.active}
                        <a href="/chat/{receipt.chat_id}">
                            <img src="https://cdn.discordapp.com/attachments/828812665232425000/1089203367676485694/chat.png" alt="">
                        </a>
                        {:else}
                        <button>
                            Archive
                        </button>
                        {/if}
                    </div>
                </div>
            </div>
        </a>
        {/each}
    </div>
</div>

<style>
    .status {
        margin-top: 1rem;
        color: black;
    }

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
        background: #e2e2e2;
    }
    .bar a:active {
        transform: scale(0.9);
    }

    .anchor {
        flex: 1;
        display: flex;
        text-decoration: none;
        color: inherit;
    }
    .card {
        flex: 1;
        background-color: rgb(255, 255, 255);
        display: flex;
        padding: 1rem;
        margin: 1rem;
        border-radius: 5px;
        transition: 0.2s;
    }
    .card:hover {
        background-color: rgb(235, 235, 235);
    }
    
    .main {
        
        overflow-x: hidden;
        overflow-y: auto;
        height: 63vh;
        max-width: 70rem;
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

    .stuff {
        flex: 1;
        display: flex;
    }
    .text {
        flex: 0.9;
    }
    .top {
        flex: 0.3;
        display: flex;
        margin-inline: 2rem;
        justify-content: space-between;
    }
    .title {
        font-size: 1.2rem;
        word-wrap:break-word;
    }
    .price {
        color: green;
        white-space: nowrap;
    }
    .bottom {
        color: #858585;
        word-wrap:break-word;
        margin: 0.5rem 2rem;
    }
    
    .icons {
        flex: 0.1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

    }
    .icons a {
        padding: 1rem;
        transition: 0.1s;
    }
    .icons a:hover {
        padding: 1rem;
        background-color: #bdbdbd;
        border-radius: 5px;
    }
    .icons img {
        aspect-ratio: 1/1;
        height: 2rem;
    }
</style>