<script>
    import { scale } from 'svelte/transition';
    import { io } from 'socket.io-client'
    import { onDestroy, onMount } from 'svelte';
    export let data;
    
    
    const formatter = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0});
    
    let messages
    $: messages = [].concat(data.messages)

    let sendMessage;

    const handleSend = async () => {

        if (sendMessage == "" || !sendMessage) return

        socket.emit("send-message", {
            message: sendMessage,
            sender_id: {
                id: data.profile.id,
                username: data.profile.username,
                avatar_link: data.profile.avatar_link
            },
            chat_id: data.receipt.chat_id
        }, data.receipt.chat_id)

        const response = fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender_id: data.session.user.id,
                chat_id: data.receipt.chat_id,
                message: sendMessage
            })
        })
        sendMessage = ""
        const result = await response.json();
    }

    const handleKeydown = async (e) => {
        if (e.key == "Enter") {
            handleSend()
        }
    }
    
    let socket;
    onMount(() => {
        let last = document.querySelector('#bite');
        last.scrollTop = last.scrollHeight;

        socket = io('http://localhost:8080')
        socket.emit('join-room', data.receipt.chat_id)
        socket.on("receive-message", (body) => {
            messages = [...messages, body]
            setTimeout(()=>{
                let last = document.querySelector('#bite');
                last.scrollTop = last.scrollHeight;
            }, 100)
        })
        
    })
    onDestroy(() => {
        socket = ""
    })

</script>
<div class="marde">
    <div class="topbar">
        <img src="{data.receipt.offers.img_link}" alt="" class="offerImg">
        <div class="text">
            <div class="title">
                {data.receipt.offers.title}
            </div>
            <div class="description">
                {data.receipt.offers.description}
            </div>
            <a href="/user/{data.receipt.seller_id.id}">
                <div class="seller">
                    {#if data.receipt.buyer_id.id == data.session.user.id}
                    Seller: {data.receipt.seller_id.username}
                    <img src="{data.receipt.seller_id.avatar_link}" alt="" class="profileIcon">
                    {:else}
                    buyer_id: {data.receipt.buyer_id.username}
                    <img src="{data.receipt.buyer_id.avatar_link}" alt="" class="profileIcon">
                    {/if}
                </div>
            </a>
        </div>
        <div class="money">
            <div class="price">
                {formatter.format(data.receipt.offers.price/100)}
            </div>
            <div class="ltc">
                {data.receipt.amount_ltc/100000000}
                <img src="https://cdn.discordapp.com/attachments/828812665232425000/1084222672973594634/LTC-logo.png" alt="" class="ltcIcon">
            </div>
        </div>
        <div class="icons">
            {#if data.receipt.active == false}
            <button onclick="history.back()" >
                <img src="https://cdn.discordapp.com/attachments/828812665232425000/1059637389305331812/back2.png" alt="">
            </button>
            {:else if data.receipt.buyer_id.id == data.session.user.id}
            <a href="/settings/purchases">
                <img src="https://cdn.discordapp.com/attachments/828812665232425000/1059637389305331812/back2.png" alt="">
            </a>
            {:else if data.receipt.seller_id.id == data.session.user.id}
            <a href="/settings/my-offers">
                <img src="https://cdn.discordapp.com/attachments/828812665232425000/1059637389305331812/back2.png" alt="">
            </a>
            {/if}
        </div>
    </div>
    <div class="chat" id="bite">
        {#each messages as message}
        <div class="field">
            <div class="bubble" transition:scale={{duration:100}}>
                <a href="/user/{message.sender_id.id}">
                    <img src="{message.sender_id?.avatar_link}" alt="" class="profileIcon">
                </a>
                {message.message}
            </div>
        </div>
        {/each}
    </div>
    <div class="bottombar">
        {#if data.receipt.active}
        <input type="text" bind:value={sendMessage} on:keydown={handleKeydown}>
        <button class="send" on:click={handleSend}>
            <img class="sendIcon" src="https://cdn.discordapp.com/attachments/828812665232425000/1089298084133089390/3682321.png" alt="">
        </button>
        {:else}
        <div class="archived">
            This purchases has been archived
        </div>
        {/if}
    </div>
</div>

<style>
    .archived {
        flex: 1;
        text-align: center;
    }
    a {
        all: unset;
        cursor: pointer;
    }
    .marde {
        height: 90vh;
        flex: 1;
        background-color: #e7e7e7;
        border-radius: 0.3rem;
        display: flex;
        flex-direction: column;
        scroll-snap-align: end;
    }
    .seller {
        display: flex;
        align-items: center;
        padding-top: 1rem;
    }
    .seller img {
        margin-left: 0.5rem;
    }

    .chat {
        flex:0.9;
        width: 100%;
        background-color: #e7e7e7;
        overflow-x: hidden;
        overflow-y: auto;
        scroll-behavior: smooth;
    }
    .field {
        display: flex;
        padding-inline: 2rem;
        padding-top: 1rem;
    }
    .bubble {
        display: flex;
        align-items: center;
        background-color: #ffffff;
        padding: 0.8rem 1rem;
        border-radius: 1rem;
    }
    .profileIcon {
        width: 2rem;
        height: 2rem;
        display: inline-block;
        border-radius: 50%;
        margin-right: 1rem;
    }

    .bottombar {
        width: 100%;
        flex: 0.1;
        background: rgb(135,135,135);
        background: linear-gradient(0deg, rgb(204, 204, 204) 0%, rgba(231,231,231,1) 100%);
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
    }
    .bottombar input {
        width: 100%;
        font-size: 1rem;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 2px solid #949494;
        border-radius: 4px;
        box-sizing: border-box;
        margin-inline: 1rem;
        background-color: whitesmoke;
    }
    .sendIcon {
        aspect-ratio: 1/1;
        height: 2rem;
    }
    .send {
        all: unset;
        cursor: pointer;
        padding: 0.5rem;
        transition: 0.1s;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 1rem;
    }
    .send:hover {
        padding: 0.5rem;
        background-color: #bdbdbd;
        border-radius: 5px;
    }
    .send:active {
        transform: scale(0.9);
    }

    .topbar {
        display: flex;
        align-items: center;
        background-color: whitesmoke;
        padding: 0.3rem;
        border-radius: 0.5rem;
    }
    .offerImg {
        height: 7rem;
        aspect-ratio: 4/3;
        object-fit: contain;
        border: solid rgb(173, 173, 173);
        border-radius: 0.3rem;
    }
    .text {
        flex: 0.7;
        margin: 1rem;
        word-wrap: break-word;
    }
    .description {
        margin-top: 0.3rem;
        color: gray;
        word-wrap: break-word;
    }

    .money {
        flex: 0.1;
        margin: 1rem;
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
        flex: 0.2;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

    }
    .icons a, .icons button {
        all: unset;
        cursor: pointer;
        padding: 0.5rem;
        transition: 0.1s;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icons a:hover, .icons button:hover {
        padding: 0.5rem;
        background-color: #bdbdbd;
        border-radius: 5px;
    }
    .icons img {
        aspect-ratio: 1/1;
        height: 2.2rem;
    }
</style>