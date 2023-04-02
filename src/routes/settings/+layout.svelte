<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import toast from 'svelte-french-toast';

    let current;
    
    onMount(() => {
        if ($page.url.search == '?bought') {
            toast.success('Successfully bought!\nYou can now chat with the seller!', { duration: 3000 })
            current = 'purchases'
        }
    })


    function getPath(currentPath) {
        current = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    }

    $: getPath($page.url.pathname);
    
</script>

<div class="container">
    <div class="bar">
        <h3>Settings</h3>
        <a href="/" data-sveltekit-prefetch><img src="https://cdn.discordapp.com/attachments/828812665232425000/1059637389305331812/back2.png" alt="go back"></a>
    </div>
    <div class="main">
        <div class="navbar">
            <div class="card">
                <a href="/settings/general" class:active={current === 'general'} on:click={() => current = 'general'}>General</a>
                <a href="/settings/my-offers" class:active={current === 'my-offers'} on:click={() => current = 'my-offers'}>My Offers</a>
                <a href="/settings/purchases" class:active={current === 'purchases' || current === 'archive'} on:click={() => current = 'purchases'}>Purchases</a>
                <a href="/settings/wallet" class:active={current === 'deposit' || current === 'withdraw' || current === 'history'} on:click={() => current = 'wallet'}>Wallet</a>
                <a href="/about" class:active={current === 'about'} on:click={() => current = 'about'}>Misc</a>
            </div>
        </div>
        <div class="content">
            <slot></slot>
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
        margin-inline: 2rem;
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
    .navbar {
        width: 10rem;
        padding-inline: 0.5rem;
        margin: 1rem;
        margin-top: 0rem;
        
    }
    .card {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        display: flex;
        flex-direction: column;
        background-color: aliceblue;
        border-radius: 0.5rem;
        transition: 0.3s;
        width: 7rem;
    }
    .card a {
        transition: 0.3s;
        color: grey;
        text-decoration: inherit;
        padding: 1rem;
    }
    .card a:hover {
        color: rgb(80, 80, 80);
        background-color: rgb(224, 224, 224);
        
    }
    .content {
        background-color: aliceblue;
        width: 70rem;
        padding: 1rem;
        margin: 1rem;
        margin-top: 0rem;
        border-radius: 0.5rem;
    }
    .active { 
        color: rgb(80, 80, 80) !important; 
        background-color: rgb(189, 189, 189) !important;
        
    }
</style>