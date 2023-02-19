<script>
    import { onMount } from 'svelte';
    import toast from 'svelte-french-toast';
    export let form;

    onMount(() => {
        if (form?.success) {
            toast.success('Success, check email for verification', {duration: 3000,})
            console.log('hit')
        }
    })
</script>

<div>
    <div class="buttons">
        <a href="/login">Login</a>
        <a href="/register" class="activeButton">Register</a>
    </div>
    <hr>
</div>
<form action="?/register" method="POST">
    <h2>Create an Account</h2>
    <label> Username
        <input name="username" type="username" placeholder="ex: bob">
        {#if form?.errors?.username}
        <div>{form?.errors?.username[0]}</div>
        {/if}
    </label>
    <label> Email
        <input name="email" type="email" placeholder="Your email..">
        {#if form?.errors?.email}
        <div>{form?.errors?.email[0]}</div>
        {/if}
    </label>
    <label> Password
        <input name="password" type="password"  placeholder="********">
        {#if form?.errors?.password}
        <div>{form?.errors?.password[0]}</div>
        {/if}
    </label>
    <label> Confirm Password
        <input name="passwordConfirm" type="password" placeholder="********">
        {#if form?.errors?.passwordConfirm}
        <div>{form?.errors?.passwordConfirm[0]}</div>
        {/if}
        {#if form?.passNotMatching}
        <div>The passwords did not match</div>
        {/if}
    </label>
    <label>
        <input class="checkbox" type="checkbox" name="tos">
        I agree and understand the Terms & Condistions*
        {#if form?.errors?.tos}
        <div>{form?.errors?.tos[0]}</div>
        {/if}
        {#if form?.errorSupabase}
        <div>{form?.errorSupabase}</div>
        {/if}
    </label>
    <button>Register</button>
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
        background-color: rgba(12, 30, 65, 0.486);
        color: white;
    }
    input.checkbox {
        width: auto;
    }
    
    form {
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
    label div {
        font-size: 0.7rem;
        color: rgb(219, 0, 0);
    }
</style>