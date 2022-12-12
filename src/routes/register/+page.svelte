<div class="box">
    <div class="buttons">
        buttons
    </div>
    <hr>
    <h2>Create an Account</h2>
    <form action="/login" method="post">
        <h4>Email</h4>
        <label>
            <input name="email" type="email">
        </label>
        <h4>Password</h4>
        <label>
            <input name="password" type="password">
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
        background: rgb(223, 223, 223);
        border-radius: 16px;
    }
    form {
        display: flex;
        flex-direction: column;
        margin: 1rem;
    }
    label {
        margin: 1rem;
        flex: 1;
    }

</style>