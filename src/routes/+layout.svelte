<script>
</script>

<div class="navbar">
  <a href="/"><h1>mtl.deals</h1></a>
  <nav class="buttons">
    <div class="ul">
      <a href="/about" class="login" data-sveltekit-prefetch>
      Login
      </a>
      <a href="/" data-sveltekit-prefetch>
      Register
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
  background: #242729;
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
  padding: 1rem 2rem;
  margin: 1rem;
  background: #004974;
  border-radius: 10px;
  transition: 0.3s;
}

.login {
  background: none;
}

.login:hover { 
  background: #43494d;
}

nav a:hover {
  background: #006494;
}

nav a:active {
  transform: scale(0.9);

}

</style>