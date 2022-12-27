<script>
    export let data;
</script>
<div>
    <img src="{data.avatar}" alt="avatar">
    <h1>Edit username</h1>
    <form action="?/accupdate" method="post">
        <h4>username</h4>
        <label for="username">
            <input name="username" type="username" value="{data.username}">
        </label>
        <button>save</button>
        
    </form>
</div>

<style>
    h1 {
        padding: 1rem;
    }
    form {
        padding: 1rem;
    }
    
    button {
        margin: 0.5rem;
        padding: 0.5rem 1rem;
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
</style>