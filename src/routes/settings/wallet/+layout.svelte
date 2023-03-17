<script>
    import { io } from 'socket.io-client'
    import { onMount } from 'svelte';
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
        <a href="/settings/wallet/history" class="nav" class:active={current === '/history'} on:click={() => current = '/history'}>History</a>

    </div>
    <slot></slot>
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
        border-radius: 0.5rem;
        margin-inline: 0.5rem;
    }
    .bar a:hover {
        color: rgb(80, 80, 80);
        background-color: rgb(204, 204, 204);
        
    }

    .active { 
        color: rgb(80, 80, 80) !important; 
        background-color: rgb(189, 189, 189) !important;
        
    }
</style>