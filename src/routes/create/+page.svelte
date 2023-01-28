<script>
    import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    export let data;
    export let form;

    let img, fileinput, imgButton;

    onMount(() => {
        if (form?.success) {
            toast.success('Username successfully saved!')
        }
    })

	const onFileSelected =(e)=>{
        imgButton = "on"
        let image = e.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            img = e.target.result
        };
    }

    const saveImg = async () => {

        if (!img) {
            return toast.error("This didn't work.")
        }
        const response = await fetch('/api/cimg', {
          method: 'POST',
          body: JSON.stringify({image: img}),
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

<Toaster></Toaster>
<div class="container">
    <div class="topbar">
        <h3>Create Offer</h3>
        <a href="/"><img src="https://cdn.discordapp.com/attachments/828812665232425000/1059637389305331812/back2.png" alt="go back"></a>
    </div>
    <div class="main">
        <div class="view-img">
            <h2>upload an image</h2>
            {#if img}
            <img class="img" src="{img}" alt="img">
            {:else}
            <img class="img" src="https://cdn.discordapp.com/attachments/828812665232425000/1068666821651218533/640px-IBM_PC_5150-640x437.jpg" alt="img">
            {/if}

            <div class="upload" >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
                <input type="file" id="img" name="img" accept="image/png, image/jpeg image/jpg" enctype="multipart/form-data" on:change={(e)=>onFileSelected(e)} bind:this={fileinput}>
                <button class="saveImg" class:imgButtonActive={imgButton === 'on'} >save avatar</button>
            </div>
        </div>
        <div class="view-info">
            dassda
        </div>
    </div>
    <div class="bottombar">

    </div>
</div>

<style>
    .container {
        flex: 1;
        display: flex;
        flex-flow: column;
        flex-wrap: wrap;
        width: 100%;
        background-color: #ffffff
    }
    
    .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-inline: 1rem;
    }
    .topbar h3 {
        margin: 1rem 2rem;
    }
    .topbar img {
        padding: 0.5rem 1rem;
        margin: 0.5rem 1rem;
        width: 2rem; 
    }
    .topbar img:hover {
        background-color: rgb(197, 197, 197);
        border-radius: 0.3rem;
        transition: 0.3s;
    }

    .main {
        flex: 1;
        display: flex;
    }
    .view-img {
        flex: 0.5;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .view-info {
        flex: 0.5;
    }


    .img {
        margin: 1rem;
        aspect-ratio: 16 / 9;
        object-fit: contain;
        width: 50vw;
        transition: 0.3s;
        border: solid
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
        border-color: white;
        border-radius: 0.3rem;
        transition: 0.3s;
    }
    .upload img:hover {
        border-color: rgb(134, 134, 134);
    }
    #img {
        display: none;
    }

    .saveImg {
        visibility: hidden;
        border-style: none;
        border-radius: 0.2rem;
        padding: 0.5rem 1rem;
        margin: 0.5rem;
        transition: 0.3s;
        cursor: pointer;
    }
    .imgButtonActive {
        visibility: visible !important;
    }
    
</style>