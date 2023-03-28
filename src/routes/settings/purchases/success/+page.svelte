<script>
    import { onMount } from "svelte";
    import toast from 'svelte-french-toast';

    let redirect;

    onMount(()=>{
        setTimeout(()=>{
            toast.success('Successfully bought!\nYou can now chat with the seller!', { duration: 3000 })
            redirect.click()
        },1000)
    })
</script>

<!-- svelte-ignore a11y-missing-content -->
<a href="/settings/purchases" style="display: none;" bind:this={redirect}></a>