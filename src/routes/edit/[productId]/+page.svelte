<script>
    import toast, { Toaster } from 'svelte-french-toast';
    export let data;
    
    let result;

    let fileinput, imgButton, redirect;

    let img = data.product.img_base64;
    let title = data.product.title;
    let description = data.product.description;
    let price = (data.product.price/100).toFixed(2);

	const onFileSelected = async (e) => {
        imgButton = "on"
        let image = e.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            img = e.target.result
        };
    }

    const saveEdit = async () => {

        const response = await fetch('/api/editoffer', {
          method: 'POST',
          body: JSON.stringify({image: img, title, description, price: price*100, id: data.product.id}),
          headers: {
            'content-type': 'application/json'
          }
        });

        result = await response.json();

        if (result.message === 'success') {
            toast.success('Successfully saved!')
            redirect.click()
        } else {
            toast.error("This didn't work.")
        }

    }
</script>

<Toaster></Toaster>
<div class="container">
    <div class="topbar">
        <h3>Edit Offer</h3>
        <a href="/settings/my-offers" bind:this={redirect}><img src="https://cdn.discordapp.com/attachments/828812665232425000/1059637389305331812/back2.png" alt="go back"></a>
    </div>
    <div class="main">
        <div class="view-img">
            <h2>Picture</h2>
            <img class="img" src="{img}" alt="img">
            
            <div class="upload" >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
                <input type="file" id="img" name="img" accept="image/png, image/jpeg image/jpg" enctype="multipart/form-data" on:change={(e)=>onFileSelected(e)} bind:this={fileinput}>
            </div>
        </div>
        <div class="view-info">
            <div class="form">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" placeholder="This is a title..." bind:value={title}>
                {#if result?.errors?.title}
                <div class="error">{result?.errors?.title[0]}</div>
                {/if}

                <label for="description" class="space">Description</label>
                <textarea name="description" id="description" placeholder="Describe your offer..." rows="7" bind:value={description}></textarea>
                {#if result?.errors?.description}
                <div class="error">{result?.errors?.description[0]}</div>
                {/if}

                <label class="space">
                    Price: 
                    <input type="number" name="price" id="price" step="0.01" bind:value={price}> $
                </label>
                {#if result?.errors?.price}
                <div class="error">{result?.errors?.price[0]}</div>
                {/if}
            </div>
        </div>
    </div>
    <div class="bottombar">
        <button on:click={saveEdit}>Save</button>
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
    
    
    .img {
        margin: 1rem;
        aspect-ratio: 16 / 9;
        object-fit: contain;
        width: 47vw;
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
    
    .view-info {
        flex: 0.5;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .view-info .form {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-inline: 2rem;
    }
    #title, #description {
        width: 100%;
        max-width: 40rem;
        font-size: 1rem;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    textarea {
        width: 100%!important;
    }
    #description {
        width: 10rem;
    }
    #price {
        width: 5rem;
        font-size: 1rem;
    }
    .space {
        margin-top: 4rem;
    }

    .bottombar {
        display: flex;
        justify-content: right;
        padding: 1rem;
    }
    .bottombar button {
        display: flex;
        color: white;
        padding: 1rem 2rem;
	  	margin: 1rem;
	  	background: #058a00;
        border-style: none;
	  	border-radius: 10px;
	  	transition: 0.3s;
    }
    .bottombar button:hover {
        background: #55c051;
    }
    .bottombar button:active {
        transform: scale(0.9);
    }

    .error {
        font-size: 0.7rem;
        color: rgb(219, 0, 0);
    }
</style>