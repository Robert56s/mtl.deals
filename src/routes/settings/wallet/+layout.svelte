<script>
    import { io } from 'socket.io-client'
    import { onMount } from 'svelte';
    export let data;
    import {page} from '$app/stores'

    let current = $page.url.pathname.substr($page.url.pathname.lastIndexOf('/'))

    onMount(() => {
        const socket = io('http://localhost:8080')
		
		socket.on('walletEvent', (message) => {
			console.log(message)
		})
    })

</script>

<div class="container">
    <div class="bar">
        <a href="/settings/wallet/deposit" class="nav" class:active={current === '/deposit'} on:click={() => current = '/deposit'}>Deposit</a>
        <a href="/settings/wallet/withdraw" class="nav" class:active={current === '/withdraw'} on:click={() => current = '/withdraw'}>Withdraw</a>
    </div>
    <slot></slot>
    <div class="amountContainer">
        Amount in your Wallet:
        <div class="amout">
            <input readonly type="text" class="ltc" value="{data.money.ltc/100000000}">
        </div>
    </div>
</div>

<style>
    
    .container {
        display: flex;
        flex-direction: column;
    }

    .bar {
        display: flex;
        background-color: rgb(224, 224, 224);
        padding: 0.5rem;
        border-radius: 0.5rem;
        margin-bottom: 2rem;
    }

    .bar a {
        flex: 0.5;
        transition: 0.3s;
        color: grey;
        text-decoration: inherit;
        padding: 1rem;
        text-align: center;
        border-radius: 1rem;
        margin-inline: 1rem;
    }
    .bar a:hover {
        color: rgb(80, 80, 80);
        background-color: rgb(204, 204, 204);
        
    }

    .active { 
        color: rgb(80, 80, 80) !important; 
        background-color: rgb(189, 189, 189) !important;
        
    }

    .amountContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3rem;
        margin-top: 2rem;
    }
    .ltc {
        width: 10rem;
        padding: 12px 20px;
        margin: 8px 0;
        font-size: 1rem;
        border: 1px solid rgba(97, 97, 97, 0.753);
        border-radius: 4px;
        box-sizing: border-box;
        background-color: rgb(255, 255, 255);
        color: black;
        margin-left: 1rem;
    }
</style>