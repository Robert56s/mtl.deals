<script>
    export let data;
</script>
<div>
    <h1>Edit username</h1>
    <form action="/?accupdate" method="post">
        <h4>username</h4>
        <label for="username">
            <input type="username" value="{data.profiles.username}">
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
</style>