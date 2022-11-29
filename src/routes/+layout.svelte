<div class="navbar">
  <a href="/"><h1>mtl.deals</h1></a>
  <nav class="buttons">
    <ul>
      <li>
        <a href="/" data-sveltekit-prefetch>Home</a>
      </li>
      <li>
        <a href="/about" data-sveltekit-prefetch>About</a>
      </li>
      <li>
        <a href="/" data-sveltekit-prefetch>Setting</a>
      </li>
    </ul>
  </nav>
</div>

<slot></slot>

<style>

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: grey;
  }

</style>