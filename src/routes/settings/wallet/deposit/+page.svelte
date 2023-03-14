<script>
    import toast from 'svelte-french-toast';
    
    export let data;

    $: walletMoney = data.money.addy

    const copyAddy = () => {
        // Get the text field
        let copyText = document.getElementById("addy");
        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
        // Alert the copied text
        toast.success("Address copied to clipboard")
    }
</script>

<div class="deposit">
    Deposit Litcoin
    <img src="https://cdn.discordapp.com/attachments/828812665232425000/1084222672973594634/LTC-logo.png" alt="Litecoin Logo" class="ltcLogo">
</div>
<div class="qrContainer">
    <img src="https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl={data.money.addy}" alt="" class="qr">
</div>
<div class="addyContainer">
    <input readonly type="text" class="addy" id="addy" value="{walletMoney}" on:click={copyAddy} >
</div>

<style>
    .deposit {
        font-size: 1.6rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ltcLogo {
        margin-left: 1rem;
        aspect-ratio: 1/1;
        height: 3rem;
    }

    .qrContainer {
        display: flex;
        justify-content: center;
    }
    .qr {
        aspect-ratio: 1/1;
        height: 14rem;
        border-radius: 2rem;
    }


    .addyContainer {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
    }
    .addy {
        width: 23.2rem;
        padding: 12px 20px;
        margin: 8px 0;
        font-size: 1rem;
        border: 1px solid rgba(97, 97, 97, 0.753);
        border-radius: 4px;
        box-sizing: border-box;
        background-color: rgb(255, 255, 255);
        color: black;
        cursor: pointer;
    }
</style>