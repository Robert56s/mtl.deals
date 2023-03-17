<script>
    export let data;
</script>

<div class="main">
    {#each data.history as history }
    <div class="flex">
            <a class="top" href="https://live.blockcypher.com/ltc/tx/{history.tx}/" target="_blank" rel="noreferrer">
            <div class="card">
                <div>
                    {history.ltc_amount/100000000} Ltc {history.type} {#if history.type = 'withdraw'} to {history.destination} {/if} <br><br>
                    <p class="tx">
                        {history.tx}
                    </p>
                        
                </div>
            </div>
        </a>
    </div>

    {/each}
</div>

<style>
    .main {
        height: 60vh;
        overflow-y: scroll;
    }
    .top {
        text-decoration: none;
    }
    .flex {
        display: flex;
        justify-content: center;
    }
    .card {
        min-width: 32rem;
        color: #000000;
        display: flex;
        background-color: rgb(255, 255, 255);
        padding: 1rem;
        margin-top: 0.5rem;
        margin-inline: 0.5rem;
        border-radius: 0.5rem;
        border: solid #527380;
        text-align: center;
    }
    .tx {
        font-size: 0.9rem;
        color: #3a3a3a;
    }
    
</style>