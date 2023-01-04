<script>
    export let form;
    let fileinput;
</script>

<!-- svelte-ignore a11y-missing-content -->
<a class="a" href="/" bind:this={fileinput} data-sveltekit-prefetch></a>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="page" on:click={()=>{fileinput.click();}}>
</div>
<div class="box">
    <div>
        <div class="buttons">
            <a href="/login" class="activeButton">Login</a>
            <a href="/register">Register</a>
        </div>
        <hr>
    </div>
    <form action="?/login" method="POST">
        <h2>Login to an Account</h2>
        <label>
            Email
            <input name="email" type="email">
        </label>
        <label>
            Password
            <input name="password" type="password">
        </label>
        {#if form?.error}
        <div class="error">{form?.error}</div>
        {/if}
        <button>Login</button>
    </form>
</div>
    
<style>
    input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    
    .a {
        display: none;
    }
    .page {
        top: 0px;
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: rgba(129, 129, 129, 0.233);
    }
    .box {
        display: flex;
        flex-direction: column;
        width: 30rem;
        height: 36.5625rem;
        padding: 1rem;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: rgb(218, 218, 224);
        border-radius: 0.5rem;
        border-style: solid;
        border-color: rgb(65, 65, 141);
    }
    form {
        flex: 1;
        padding-inline: 2rem;
        display: flex;
        flex-direction: column;
        margin: 1rem;
    }
    
    h2 {
        margin-top: 1rem;
        text-align: center;
    }

    label {
        margin: 0.3rem;
    }

    .buttons {
        display: flex;
    }

    .buttons a {
        flex: 1;
        text-align: center;
        padding: 1rem;
        color: inherit;
        text-decoration: none;
        transition: 0.3s;
    }

    .buttons a:hover {
        background-color: rgb(207, 207, 207);
    }

    .activeButton {
        background-color: rgb(185, 185, 185) !important;
    }

    hr {
        border: 0.05rem solid black;
    }

    button {
        margin-top: 1rem;
        background: rgb(120, 121, 121);
        display: flex;
        padding: 0.5rem 1rem;
        align-self: center;
        opacity: 1;
        transition: 0.3s;
        border: none;
        border-radius: 5px;
    }

    button:hover {
        background: rgb(165, 165, 165);
    }

    button:active {
        transform: scale(0.9);
    }

    .error {    
        font-size: 0.7rem;
        color: rgb(219, 0, 0);  
    }
</style>