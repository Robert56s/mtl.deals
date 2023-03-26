<script>
    export let data;
</script>

<div class="container">
    <div class="bar">
        <div class="title">
            Open Chats
        </div>
        <div class="content">
            {#each data.receipts as chat}
            <a href="/chat/{chat.chat_id}">
                <div class="bubble">
                    <img src="{chat.seller_id.avatar_link}" alt="" class="icon">
                    {chat.seller_id.username} for <br> {chat.offers.title}
                </div>
            </a>
            {/each}
        </div>
    </div>
    <slot></slot>
</div>

<style>
    a {
        all: unset;
        cursor: pointer;
    }

    .container {
        flex: 1;
        width: 100vw;
        display: flex;
    }
    .bar {
        width: 25vw;
        background-color: white;
    }
    .title {
        font-size: 2rem;
        text-align: center;
        margin: 1rem;
    }
    .content {
        margin: 1rem;
    }
    .bubble {
        display: flex;
        align-items: center;
        background-color: thistle;
        margin-top: 1.5rem;
        border-radius: 1rem;
    }
    .icon {
        aspect-ratio: 1/1;
        height: 2.5rem;
        margin: 0.5rem;
        border-radius: 50%;
    }
</style>