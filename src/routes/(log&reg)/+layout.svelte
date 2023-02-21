<script>
    import { onMount } from "svelte";
    import { fade, scale } from "svelte/transition";
        
</script>


<canvas id="stars" class="page" transition:fade/>

<!-- svelte-ignore a11y-missing-content -->
<a href="/" class="click"></a>
<div class="box" transition:scale={{ duration: 500, opacity: 0.5 }}>
    <slot />
</div>

<style>
    .click {
        height: 90vh;
        width: 100%;
    }
    .page {
        top: 0px;
        position:fixed;
        height: 100%;
        width: 100%;
        cursor: pointer;
        z-index: -1;
    }
    .box {
        color: white;
        display: flex;
        flex-direction: column;
        width: 30rem;
        height: 36.5625rem;
        padding: 1rem;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: rgb(37, 37, 37);
        border: solid;
        border-radius: 0.5rem;         
        border-color: rgb(65, 65, 141);
    }
</style>
