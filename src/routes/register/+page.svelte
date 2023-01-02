<script>
    export let form;
</script>

<div class="box">
    <div class="buttons">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    <hr>
    <h2>Create an Account</h2>
    <form action="?/register" method="POST">
        <h4>Username</h4>
        <label>
            <input name="username" type="username">
            {#if form?.errors?.username}
            <div>{form?.errors?.username[0]}</div>
            {/if}
        </label>
        <h4>Email</h4>
        <label>
            <input name="email" type="email">
        </label>
        <h4>Password</h4>
        <label>
            <input name="password" type="password">
        </label>
        <h4>Confirm Password</h4>
        <label>
            <input name="passwordConfirm" type="passwordConfirm">
        </label>
        <label>
            <input type="checkbox" name="tos">
            I agree and understand the Terms & Condistions*
        </label>
        <button>Register</button>
    </form>
    <hr>
    <h2>or</h2>
    
</div>

<style>
    .box {
        padding: 2rem;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: rgb(184, 184, 184);
        border-radius: 16px;
    }
    form {
        display: flex;
        flex-direction: column;
        margin: 1rem;
    }

    h2 {
        margin: 1rem;
        text-align: center;
    }
    h4 {
        margin-inline: 1rem;
    }
    label {
        margin: 1rem;
        flex: 1;
    }

    button {
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

</style>