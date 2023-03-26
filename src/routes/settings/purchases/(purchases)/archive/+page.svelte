<script>
    export let data;
    console.log(data.receipts)
    const formatter = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0});
</script>

<div class="main">
    {#each [... data.receipts].reverse() as receipt, i}
        
        <div class="card" id={i + 1} bin>
            <div class="view">
                <!-- svelte-ignore a11y-missing-attribute -->
                <img src={receipt.offers.img_link} class="image">
            </div>
            <div class="stuff">
                <div class="text">
                    <div class="left">
                        <div class="title">
                            {receipt.offers.title}
                        </div>
                        <div class="description">
                            {receipt.offers.description}
                        </div>
                    </div>
                    <div class="right">
                        <div class="price">
                            {formatter.format((receipt.offers.price/100))}
                        </div>
                        <div class="ltc">
                            {receipt.amount_ltc/100000000}
                            <img src="https://cdn.discordapp.com/attachments/828812665232425000/1084222672973594634/LTC-logo.png" alt="" class="ltcIcon">
                        </div>
                    </div>
                </div>
                <div class="icons">
                    <a href="/settings/purchases/chat/{receipt.chat_id}">
                        <img src="https://cdn.discordapp.com/attachments/828812665232425000/1089203367676485694/chat.png" alt="">
                    </a>
                </div>
            </div>
        </div>
        {/each}
</div>




<style>
    .main {
        overflow-x: hidden;
        overflow-y: auto;
        height: 63vh;
        max-width: 70rem;
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
    .view {
        border: solid black ;
        border-radius: 3px;
        display: flex;
    }
    .image {
        height: 10rem;
        aspect-ratio: 4/3;
        object-fit: contain;
    }

    .stuff {
        flex: 1;
        display: flex;
    }
    .text {
        flex: 1;
        display: flex;
        flex-flow: row wrap;
    }
    .left {
        flex: 0.8;
        display: flex;
        flex-direction: column;
        margin-inline: 2rem;
    }
    .title {
        font-size: 1.2rem;
        word-wrap:break-word;
    }
    .description {
        display: flex;
        flex-direction: column;
        color: #858585;
        word-wrap:break-word;
        margin-top: 0.5rem;
    }
    .right {
        flex: 0.2;
        display: flex;
        flex-direction: column;
        margin-inline: 2rem;
    }
    .price {
        color: green;
        white-space: nowrap;
    }
    .ltc {
        margin-top: 0.3rem;
        color: rgb(59, 80, 194);
        display: flex;
    }
    .ltcIcon {
        aspect-ratio: 1/1;
        height: 1rem;
        margin-left: 0.3rem;
    }
    
    .icons {
        flex: 0.1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

    }
    .icons a {
        all: unset;
        cursor: pointer;
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