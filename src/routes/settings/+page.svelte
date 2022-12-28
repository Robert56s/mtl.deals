<script>
    export let data;
</script>
<div>
    <form action="?/avatarupdate" method="post">
        <label for="avatar">Choose a profile picture:</label>
        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg">
        <img src="{data.avatar}" alt="avatar">
        <button>submit</button>
    </form>
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