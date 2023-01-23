<div class="container">
    <div class="bar">
        <h3>Create Offer</h3>
        <a href="/"><img src="https://cdn.discordapp.com/attachments/828812665232425000/1059637389305331812/back2.png" alt="go back"></a>
    </div>
    <div class="main">
        <div class="view">
            <h4>upload an image</h4>
            <img src="" alt="">
        </div>
    </div>
</div>

<style>
    .container {
        flex: 1;
        display: flex;
        flex-flow: column;
        width: 100%;
        background-color: #ffffff
    }
    
    .bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-inline: 1rem;
    }
    .bar h3 {
        margin: 1rem 2rem;
    }
    .bar img {
        padding: 0.5rem 1rem;
        margin: 0.5rem 1rem;
        width: 2rem; 
    }
    .bar img:hover {
        background-color: rgb(197, 197, 197);
        border-radius: 0.3rem;
        transition: 0.3s;
    }

    .main {
        flex: 1;
        display: flex;
        justify-content: center;
    }
</style>