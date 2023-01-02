<script>
    let current = 'general';
</script>

<div class="container">
    <div class="name">
        Settings
    </div>
    <div class="main">
        <div class="navbar">
            <div class="card">
                <a href="/settings/general" class:active={current === 'general'} on:click={() => current = 'general'}>General</a>
                <a href="/settings/general" class:active={current === 'offers'} on:click={() => current = 'offers'}>Offers</a>
                <a href="/settings/general" class:active={current === 'security'} on:click={() => current = 'security'}>Security</a>
                <a href="/settings/general" class:active={current === 'other'} on:click={() => current = 'other'}>Other</a>
                <a href="/settings/general" class:active={current === 'misc'} on:click={() => current = 'misc'}>Misc</a>
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
    }
    .name {
        padding: 2rem 4rem;
    }
    .main {
        flex: 1;
        display: flex;
        background-color: blanchedalmond;
        justify-content: center;
    }
    .navbar {
        width: 10rem;
        padding-inline: 0.5rem;
        margin: 1rem;
        
    }
    .card {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        display: flex;
        flex-direction: column;
        background-color: aliceblue;
        border-radius: 0.5rem;
        transition: 0.3s;
    }
    .card a {
        transition: 0.3s;
        color: grey;
        text-decoration: inherit;
        padding: 1rem;
    }
    .card a:hover {
        color: rgb(80, 80, 80);
        background-color: rgb(189, 189, 189);
        
    }
    .content {
        background-color: aliceblue;
        width: 70rem;
        padding: 1rem;
        margin: 1rem;
        border-radius: 0.5rem;
    }
    .active { 
        color: rgb(80, 80, 80) !important; 
        background-color: rgb(189, 189, 189);
        
    }
</style>