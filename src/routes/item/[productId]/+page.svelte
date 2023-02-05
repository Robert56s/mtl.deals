<script>
    export let data;
</script>

<div class="container">
    <div class="box">
        <div class="content">
            <div class="bar">
                <div class="bart">
                    <h2>{data.product.title}</h2>
                    <div class="price">${(data.product.price/100).toFixed(2)}</div>
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
                    <img class="picture" src={data.product.img_base64} alt="">
                </div>
                <div class="description">
                    <h3>Description:</h3>
                    <p>{data.product.description}</p>
                </div>
            </div>
        </div>
        <div class="buy">
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
        background-color: aliceblue;
        display: flex;
        height: 20rem;
        justify-content: center;
        align-items: center;
        aspect-ratio: 16 / 9;
    }
    .picture {
        height: 80%;
        object-fit: contain;
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
        background-color: brown;
    }
</style>