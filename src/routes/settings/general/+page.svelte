<script>
    import { onMount } from 'svelte';
    import toast from 'svelte-french-toast';
    export let data;
    export let form;

    let avatar, fileinput, avatarButton, usernameButton;

    onMount(() => {
        if (form?.success) {
            toast.success('Username successfully saved!')
        }
    })

	const onFileSelected =(e)=>{
        avatarButton = "on"
        let image = e.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            avatar = e.target.result
        };
    }

    const saveAvatar = async () => {

        if (!avatar) {
            return toast.error("This didn't work.")
        }
        const response = await fetch('/api/avatar', {
          method: 'POST',
          body: JSON.stringify({image: avatar}),
          headers: {
            'content-type': 'application/json'
          }
        });

        let result = await response.json();

        if (result.message === 'success') {
            toast.success('Successfully saved!')
        } else {
            toast.error("This didn't work.")
        }

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
            <button class="saveAvatar" class:avatarButtonActive={avatarButton === 'on'} on:click={saveAvatar}>save avatar</button>
            
        </div>
    </div>
    <div class="userInfo">
        <h1>User Info</h1>
        <form action="?/accupdate" method="post">
            <label for="username">
                <div>username</div>
                <input name="username" type="username" value="{data.username}" on:input={() => {usernameButton = 'on'}}>
                <img class="editIcon" src="https://cdn.discordapp.com/attachments/828812665232425000/1060304137037807736/Edit_icon_the_Noun_Project_30184.svg.png" alt="edit icon">
            </label>
            <button class:usernameButtonActive={usernameButton === 'on'}>save</button>
        </form>
        <div class="email">
            <label for="email">
                <div>email</div>
                <input readonly name="email" type="email" value="{data.session.user.email}">
            </label>
        </div>
    </div>
</div>

<style>
    .user {
        display: flex;
        justify-content:space-around
    }

    .userAvatar {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .avatar {
        aspect-ratio: 1/1;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        transition: 0.3s;
    }
    .upload {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items:center
    }
    .upload img {
        margin-top: 0.2rem;
        cursor: pointer;
        width: 3.125rem;
        height: 3.125rem;
        border-style: solid;
        border-color: aliceblue;
        border-radius: 0.3rem;
        transition: 0.3s;
    }
    .upload img:hover {
        border-color: rgb(134, 134, 134);
    }
    #avatar {
        display: none;
    }

    .saveAvatar {
        visibility: hidden;
        border-style: none;
        border-radius: 0.2rem;
        padding: 0.5rem 1rem;
        margin: 0.5rem;
        transition: 0.3s;
        cursor: pointer;
    }
    .avatarButtonActive {
        visibility: visible !important;
    }

    .userInfo form button {
        visibility: hidden;
        border-style: none;
        border-radius: 0.2rem;
        padding: 0.5rem 1rem;
        margin-left: 0.2rem;
        transition: 0.3s;
        cursor: pointer;
    }
    .usernameButtonActive {
        visibility: visible !important;
    }

    .userInfo {
        flex:0.7;
        display: flex;
        flex-direction: column;
    }
    .userInfo form, .userInfo div {
        margin-top: 1rem;
    }
    .editIcon {
        height: 1rem;
        position: fixed;
        transform: translateX(-2rem) translateY(0.8rem);
        cursor: text;
        z-index: 0;
    }
    .userInfo input {
        font-size: 0.9rem;
        color: rgb(44, 44, 44);
        padding: 0.5rem 1rem;
        margin-top: 0.2rem;
        min-width: 15rem;
        display: inline-block;
        border: 2px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

</style>