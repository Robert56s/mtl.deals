<div class="container">
    <div class="name">
        Settings
    </div>
    <div class="main">
        <div class="navbar">

        </div>
        <slot></slot>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-flow: column;
        width: 100%;
    }
    .name {
        padding: 2rem 4rem;
        background-color: aliceblue;
    }
    .main {
        flex: 1;
        display: flex;
        background-color: blanchedalmond;
    }
    .navbar {
        width: 10rem;
        padding: 1rem;
        margin: 1rem;
        background-color: cadetblue;
    }
</style>