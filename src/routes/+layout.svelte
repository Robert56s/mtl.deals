<script>
</script>

<div class="navbar">
  <a href="/"><h1>mtl.deals</h1></a>
  <nav class="buttons">
    <div class="ul">
      <a href="/" data-sveltekit-prefetch>
      Home
      </a>
      <a href="/about" data-sveltekit-prefetch>
      About
      </a>
      <a href="/" data-sveltekit-prefetch>
      Setting
      </a>
    </div>
  </nav>
</div>

<slot></slot>

<style>

.navbar {
  position: sticky;
  top: 0;
  display: flex;
  padding: 0.5rem 2rem;
  justify-content: space-between;
  align-items: center;
  background: rgb(36, 39, 41);
}
nav .ul {
  display: flex;
  list-style: none;
}

a {
  text-decoration: none;
  color: white;
}
nav a {
  padding: 1rem;
  margin: 1rem;
  background: #003554;
  border-radius: 15px;
  transition: 0.3s;
}

nav a:hover {
  transform: scale(1.1);
  background: #006494;
}


</style>