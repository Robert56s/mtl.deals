<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    export let data;

    let current

    function getPath(currentPath) {
        current = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    }

    $: getPath($page.url.pathname);

</script>

<div class="container">
    <div class="bar">
        <div class="title">
            Open Chats
        </div>
        <div class="content">
            {#each data.receipts as chat}
            <a href="/chat/{chat.chat_id}" on:click={()=>{current = chat.chat_id}}>
                <div class="bubble" class:active={current === `${chat.chat_id}`}>
                    {#if chat.buyer_id.id == data.session.user.id}
                    <img src="{chat.seller_id.avatar_link}" alt="" class="icon">
                    {chat.seller_id.username} - Buying {chat.offers.title}
                    {:else}
                    <img src="{chat.seller_id.avatar_link}" alt="" class="icon">
                    {chat.buyer_id.username} - Selling {chat.offers.title}
                    {/if}
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
        background-color: rgb(233, 217, 233);
        margin-top: 1.5rem;
        border-radius: 0.5rem;
        transition: 0.3s;
    }
    .bubble:hover {
        background-color: thistle;
    }
    .bubble:active {
        transform: scale(0.9);
    }
    .active {
        background-color: rgb(197, 165, 197) !important;
    }

    .icon {
        aspect-ratio: 1/1;
        height: 2.5rem;
        margin: 0.5rem;
        border-radius: 50%;
    }
</style>