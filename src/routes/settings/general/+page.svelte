<script>
    export let data;

    let  avatar, fileinput, result;
	
	const onFileSelected =(e)=>{
        let image = e.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            avatar = e.target.result
        };
    }

    async function saveAvatar() {
        
        const response = await fetch('/api/avatar', {
          method: 'POST',
          body: JSON.stringify({image: avatar}),
          headers: {
            'content-type': 'application/json'
          }
        });

        result = await response.json();
    }
</script>
<div>
    
    <label for="avatar">Choose a profile picture:</label>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg image/jpg" enctype="multipart/form-data" on:change={(e)=>onFileSelected(e)} bind:this={fileinput}>
    {#if avatar}
    <img class="avatar" src="{avatar}" alt="avatar">
    {:else}
    <img class="avatar" src="{data.avatar}" alt="avatar">
    {/if}
    <button on:click={saveAvatar}>submit</button>
    
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

    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .upload {
        cursor: pointer;
        width: 50px;
        height: 50px
    }

    #avatar {
        display: none;
    }
</style>