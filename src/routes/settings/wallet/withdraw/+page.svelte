<script>
    import toast from 'svelte-french-toast';

    export let data;

    let withAmt = 0.01
    let withAddy;
    let withErr = false

    const formatter = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 2});

    const withdrawLtc = async () => {
        const response = await fetch('/api/withdraw', {
          method: 'POST',
          body: JSON.stringify({withAmt: (withAmt*100000000), withAddy}),
          headers: {
            'content-type': 'application/json'
          }
        });

        let result = await response.json();
        console.log(result)

        if (result.message === "success") {
            withErr = false
            toast(`You withdrew ${formatter.format((withAmt)*data.ltcPrice)}`, {
				icon: '💸',
			})
            setTimeout(location.reload(), 5000)
        } else if (result.err == true) {
            withErr = result.message
        }
    }
</script>

<div class="withdraw">
    Withdraw Litecoin
    <img src="https://cdn.discordapp.com/attachments/828812665232425000/1084222672973594634/LTC-logo.png" alt="Litecoin Logo" class="ltcLogo">
</div>
<div class="withAddyContainer">
    <input type="text" class="withAddy" placeholder="Litecoin Address" bind:value={withAddy}>
</div>
<div class="withAmtContainer">
    <input type="number"  class="withAmt" step="0.00000001" bind:value="{withAmt}">
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <button class="button" on:click={withdrawLtc}>Withdraw</button>
</div>
{#if withErr}
<div class="err">{withErr}</div>
{/if}
<div class="amountContainer">
    Amount in your Wallet:
    <div class="amout">
        <input readonly type="text" class="ltc" value="{data.walAmt/100000000}">
    </div>
</div>

<style>
    .amountContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3rem;
        margin-top: 2rem;
    }
    .ltc {
        width: 10rem;
        padding: 12px 20px;
        margin: 8px 0;
        font-size: 1rem;
        border: 1px solid rgba(97, 97, 97, 0.753);
        border-radius: 4px;
        box-sizing: border-box;
        background-color: rgb(255, 255, 255);
        color: black;
        margin-left: 1rem;
    }
    .ltcLogo {
        margin-left: 1rem;
        aspect-ratio: 1/1;
        height: 3rem;
    }

    .withdraw {
        font-size: 1.6rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .withAddyContainer {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .withAddy {
        width: 23.2rem;
        padding: 12px 20px;
        margin: 8px 0;
        font-size: 1rem;
        border: 1px solid rgba(97, 97, 97, 0.753);
        border-radius: 4px;
        box-sizing: border-box;
        background-color: rgb(255, 255, 255);
        color: black;
    }

    .withAmtContainer {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .withAmt {
        width: 10rem;
        padding: 10px 18px;
        margin: 8px 0;
        font-size: 1rem;
        border: 1px solid rgba(97, 97, 97, 0.753);
        border-radius: 4px;
        box-sizing: border-box;
        background-color: rgb(255, 255, 255);
        color: black;
    }

    button {
        text-decoration: none;
        color: black;
        padding: 0.7rem 1rem;
        margin-inline: 1rem;
        background-color: rgb(219, 219, 219);
        border-radius: 0.3rem;
        transition: 0.3s;
        cursor: pointer;
        border: none;
        font-size: 1rem;
    }
    button:hover {
        background-color: rgb(180, 180, 180);
    }
    button:active {
        transform: scale(0.9);
    }
    .err {
        color: red;
        font-size: 0.8rem;
        text-align: center;
    }
</style>