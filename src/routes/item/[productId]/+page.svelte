<script>
    export let data;
</script>

<div class="box">
    <div class="content">
        <div class="bar">
            <div class="bart">
                <h2>{data.product.title}</h2>
                <div class="price">${(data.product.price/100).toFixed(2)}</div>
            </div>
            <div class="user">
                <h3 class="username">{data.product.username}</h3>
                <a href="/user/{data.product.user_id}"><img class="avatar" src={data.product.avatar} alt="avatar"></a>
            </div>
        </div>
        <div class="main">
            <div class="view">
                <img class="picture" src={data.product.img_base64.img_1} alt="">
            </div>
            <div class="description">
                <h3>Description:</h3>
                <p>{data.product.description}</p>
            </div>
        </div>
    </div>
    <div class="buy">
        hi
    </div>
</div>

<style>
    .box {
        display: flex;
        flex-flow: row wrap;
        
    }
    .bar {
        max-width: 50rem;
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
        background-color: rgb(0, 195, 255);
        border-radius: 1rem;
    }
    .username {
        margin-right: 0.3rem;
    }
    .avatar {
        height: 4rem;
        border-radius: 50%;
    }

    .main {
        max-width: 50rem;
        display: flex;
        flex-direction: column;
    }
    .view {
        flex: 1;
        min-width: 30rem;
        background-color: aliceblue;
        display: flex;
        height: 20rem;
        justify-content: center;
        align-items: center;
    }
    .picture {
        height: 80%;
    }
    .description {
        flex: 0.5;
        padding: 1rem;
    }
    .description p {
        margin-top: 0.5rem;
    }



    .buy {
        flex: 1;
        max-width: 30rem;
    }
</style>