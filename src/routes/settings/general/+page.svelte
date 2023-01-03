<script>
    export let data;

    let  avatar, fileinput, result, classActive;
	
	const onFileSelected =(e)=>{
        classActive = "yes"
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
<div class="user">
    <div class="userAvatar" >
        {#if avatar}
        <img class="avatar" src="{avatar}" alt="avatar">
        {:else}
        <img class="avatar" src="{data.avatar}" alt="avatar">
        {/if}
        <div class="upload" >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg image/jpg" enctype="multipart/form-data" on:change={(e)=>onFileSelected(e)} bind:this={fileinput}>
        </div>
    </div>
    <div class="edit">
        <h1>User Info</h1>
        <form action="?/accupdate" method="post">
            <label for="username">
                username
                <input name="username" type="username" value="{data.username}">
            </label>
            <button>save</button>
        </form>
            <label for="email">
                email
                <input readonly name="email" type="email" value="{data.session.user.email}">
            </label>
    </div>
</div>
<div class="save">
    <button class:buttonActive={classActive === 'yes'} on:click={saveAvatar} >save avatar</button>
</div>

<style>
    .user {
        display: flex;
        justify-content:space-evenly
    }

    .userAvatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }
    .avatar {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        transition: 0.3s;
    }
    .upload img {
        cursor: pointer;
        width: 50px;
        height: 50px;
    }
    #avatar {
        display: none;
    }

    .save {
        visibility: hidden;
    }
    .buttonActive {
        visibility: visible;
    }
</style>