<script>
    import toast from 'svelte-french-toast';
    export let data;
    console.log(data)
    let price = 0.01;

    const formatter = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0});

    const buy = async () => {
        const response = await fetch('/api/buy', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.product.id,
                price: (data.product.price/100),
                seller_id: data.product.seller_id
            })
        })
        const result = await response.json();

        if (result.message === 'success') {
            window.location.replace("/settings/purchases")
        } else {
            toast.error(result.message)
        }
    }

</script>

<div class="container">
    <div class="box">
        <div class="content">
            <div class="bar">
                <div class="bart">
                    <h2>{data.product.title}</h2>
                    <div class="price">{formatter.format((data.product.price/100))}</div>
                </div>
                <a href="/user/{data.product.user_id}">
                    <div class="user">
                        <h3 class="username">{data.product.username}</h3>
                        <img class="avatar" src={data.product.avatar} alt="avatar">
                    </div>
                </a>
            </div>
            <div class="main">
                <div class="view">
                    <img class="picture" src={data.product.img_link} alt="">
                </div>
                <div class="description">
                    <h3>Description:</h3>
                    <p>{data.product.description}</p>
                </div>
            </div>
        </div>
        <div class="bottombar">
            <form action="" method="post">
                <label for="price">Enter a bid amount: <b>$</b></label>
                <input type="itemId" name="itemId" style="display: none;" bind:value={data.product.id}>
                <input type="number" name="price" id="price" step="0.01" bind:value={price}>
                <button class="bid">Bid</button>
            </form>
            or
            <button class="buy" on:click={buy}>
                Buy
            </button>
        </div>
    </div>
</div>


<style>
    a {
        text-decoration: none;
        color: rgb(51, 51, 51);
    }
    .container {
        flex: 1;
        display: flex;
        justify-content: center;
    }
    .box {
        flex: 1;
        max-width: 60rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .bar {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .price {
        color: green;
        font-size: 1.5rem;
    }

    .user {
        padding: 0.3rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(207, 207, 207);
        border-radius: 1rem;
        transition: 0.3s;
    }
    .user:hover {
        background-color: rgb(177, 177, 177);
    }
    .username {
        margin-right: 0.3rem;
    }
    .avatar {
        aspect-ratio: 1/1;
        height: 4rem;
        border-radius: 50%;
    }

    .main {
        display: flex;
        flex-direction: column;
    }
    .view {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-style: solid;
        border-radius: 5px;
    }
    .picture {
        object-fit: contain;
        aspect-ratio: 16 / 9;
        width: 50rem;
    }
    .description {
        flex: 0.5;
        padding: 1rem;
    }
    .description p {
        margin-top: 0.5rem;
    }

    .bottombar {
        justify-self: bottom;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding-bottom: 1rem;
    }
    .buy, .bid {
        height: 3rem;
        display: flex;
        color: white;
        padding: 1rem 2rem;
	  	margin: 1rem;
	  	background: #058a00;
        border-style: none;
	  	border-radius: 10px;
	  	transition: 0.3s;
        cursor: pointer;
    }
    .buy:hover, .bid:hover {
        background: #55c051;
    }
    .buy:active, .bid:active {
        transform: scale(0.9);
    }

    form {
        display: flex;
        align-items: center;
    }
    label, input {
        display: block;
    }

    label {
        margin-right: 0.2rem;
    }
    b {
        font-size: 1.3rem;
    }
    form input {
        width: 6rem;
        max-width: 40rem;
        font-size: 1rem;
        padding: 12px 3px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    
</style>