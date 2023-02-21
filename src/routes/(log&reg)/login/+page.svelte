<script>
    export let form;
</script>

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

<style>
    input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid rgba(97, 97, 97, 0.753);
        border-radius: 4px;
        box-sizing: border-box;
        background-color: rgb(255, 255, 255);
    }
    hr {
        border: 0.1rem solid rgb(65, 65, 141) !important;
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
        background-color: rgba(207, 207, 207, 0.233);
    }
    .activeButton {
        background-color: rgba(131, 132, 187, 0.733) !important;
    }
    hr {
        border: 0.05rem solid black;
    }
    button {
        margin-top: 1rem;
        background: #004974de;
        display: flex;
        padding: 0.7rem 1.2rem;
        align-self: center;
        opacity: 1;
        transition: 0.3s;
        border: none;
        border-radius: 5px;
        color: white;
    }
    button:hover {
        background: #006594e0;
    }
    button:active {
        transform: scale(0.9);
    }
    .error {    
        font-size: 0.7rem;
        color: rgb(219, 0, 0);  
    }
</style>