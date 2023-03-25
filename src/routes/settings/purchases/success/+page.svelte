<script>
    import { onMount } from 'svelte';
    import toast from 'svelte-french-toast';

    let redirect;

    onMount(()=>{
        toast.success('Successfully bought!')
        setTimeout(function() {redirect.click()}, 1000)
    })
</script>

<!-- svelte-ignore a11y-missing-content -->
<a href="/settings/purchases" bind:this={redirect} style="display: none;"></a>