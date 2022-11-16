<script>

</script>

<div class="navbar">
  <a href="/"><img src="/logo.png" alt="logo"></a>
  <div class="button">
    <a href="/" data-sveltekit-prefetch>Home</a>
    <a href="/about" data-sveltekit-prefetch>About</a>
    <a href="/" data-sveltekit-prefetch>Setting</a>
  </div>
</div>

<slot></slot>

<style>
  img{
    max-height: 150px;
  }
  
  /* The navigation bar */
.navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}

/* Links inside the navbar */
.navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change background on mouse-over */
.button a:hover {
  background: #ddd;
  color: black;
}

</style>