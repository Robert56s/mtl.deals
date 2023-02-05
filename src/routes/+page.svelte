<script>
    export let data;
</script>

<div class="main">
    <div class="section">
        <div class="grid">
            {#each [... data.products].reverse() as product, i}
            <a href="/item/{product.id}" class="anchor">
                <div class="card">
                    <div class="view">
                        <img src={product.img_base64} alt="">
                    </div>
                    <div class="bottom">
                        <p class="title">
                            {product.title}
                        </p>
                        <p class="price">
                            $ {(product.price/100).toFixed(2)}
                        </p>
                    </div>
                </div>
            </a>
            {/each}
        </div>
    </div>
</div>

<style>
    .main {
        display: flex;
        justify-content: center;
        flex: 1;
        padding-inline: 2rem;
        background-color: whitesmoke;
    }

    .section {
        justify-content: center;
        width: 60rem;
    }
    .grid {
        flex: 1;
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(auto-fill, 15rem);
        grid-auto-rows: 19rem;
    }
    .anchor {
        background-color: white;
        display: flex;
        margin: 1rem;
        text-decoration: none;
        color: rgb(86, 21, 102);
        border-radius: 5px;
        box-shadow: rgba(153, 153, 153, 0.5) 0px 0px 5px;
        transition: 0.2s;
    }
    .anchor:hover {
        box-shadow: rgba(25, 25, 25, 0.5) 0px 0px 5px;
        color: rgb(48, 90, 145);
    }
    .card {
        flex: 1;
        display:flex;
        flex-direction: column;
        
    }
    .view {
        border-radius: 5px;
    }
    .view img {
        aspect-ratio: 4/3;
        object-fit:cover;
        width: 13rem;
        border-radius: 5px;
    }
    .bottom {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .title {
        margin: 1rem;
        width: 11rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap:break-word;
        
    }
    .price {
        display: flex;
        text-align: end;
        color: green;
        padding-inline: 1rem 0.5rem;
        padding-bottom: 1rem;
        justify-self: flex-end;
    }
    

</style>