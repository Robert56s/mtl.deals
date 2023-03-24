<script>
    export let data
    const formatter = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0});

</script>

<div class="box">
    <div class="bar">
        <div class="flex">
            <img class="avatar" src={data.profile.avatar_link} alt="">
            <h1 class="username">{data.profile.username}</h1>
        </div>
        <a href="/" data-sveltekit-prefetch><img src="https://cdn.discordapp.com/attachments/828812665232425000/1059637389305331812/back2.png" alt="go back" class="back"></a>
    </div>
    <div class="bigcard">
        <div class="grid">
            {#each [... data.offers].reverse() as offer, i}
            <a href="/item/{offer.id}" class="anchor">
                <div class="card">
                    <div class="view">
                        <img src={offer.img_link} alt="">
                    </div>
                    <div class="bottom">
                        <p class="title">
                            {offer.title}
                        </p>
                        <p class="price">
                            {formatter.format((offer.price/100))}
                        </p>
                    </div>
                </div>
            </a>
            {/each}
        </div>
    </div>
</div>

<style>
    .box {
        flex: 1;
        width: 100%;
        max-width: 70rem;
        align-self: center;
        display: flex;
        flex-direction: column;
    }
    .bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        margin-inline: 2rem;
    }
    .back {
        padding: 0.5rem 1rem;
        margin: 0.5rem 1rem;
        width: 3rem;
    }
    .back:hover {
        background-color: rgb(197, 197, 197);
        border-radius: 0.3rem;
        transition: 0.3s;
    }

    .avatar {
        justify-self: center;
        height: 7rem;
        border-radius: 50%;
        aspect-ratio: 1/1;
        margin-right: 2rem;
    }
    .bigcard {
        flex: 1;
        background-color: aliceblue;
        margin: 1rem;
        border-radius: 1rem;
    }
    .grid {
        margin-top: 1rem;
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
    .flex {
        display: flex;
        align-items: center;
    }
</style>