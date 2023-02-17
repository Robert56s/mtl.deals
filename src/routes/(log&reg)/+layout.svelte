<script>
    import { scale } from 'svelte/transition';
    let anchor;
</script>

<!-- svelte-ignore a11y-missing-content -->
<a href="/" bind:this={anchor} data-sveltekit-prefetch></a>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="page" on:click={()=>{anchor.click();}}>
</div>
<div class="box" transition:scale="{{duration: 500, opacity: 0.5}}">
    <slot></slot>
</div>

<style>
    a {
        display: none;
    }
    .page {
        top: 0px;
        position: fixed;
        height: 100%;
        width: 100%;
    }
    .box {
        display: flex;
        flex-direction: column;
        width: 30rem;
        height: 36.5625rem;
        padding: 1rem;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: rgb(218, 218, 224);
        border-radius: 0.5rem;
        border-style: solid;
        border-color: rgb(65, 65, 141);
    }
</style>