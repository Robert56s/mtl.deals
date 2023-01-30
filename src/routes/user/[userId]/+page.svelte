<script>
    export let data
</script>

<div class="box">
    <div class="bar">
        
        <img class="avatar" src={data.profile.avatar_base64} alt="">
        
        <h1 class="username">{data.profile.username}</h1>
    </div>
</div>

<style>
    .box {
        flex: 1;
    }
    .bar {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .avatar {
        justify-self: center;
        height: 10rem;
        border-radius: 50%;
        aspect-ratio: 1/1;
    }
</style>