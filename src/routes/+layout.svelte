<script>
	export let data;

	import { invalidate } from "$app/navigation";
	import { supabaseClient } from "$lib/supabase";
	import { onMount } from 'svelte';

	onMount(() => {
		const subscribtion = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscribtion.unsubscribe();
		};
	});

	// const submitLogout = async ({ cancel }) => {
	// 	const { error } = await supabaseClient.auth.signOut();
	// 	if (error) {
	// 		console.log(error);
	// 	}
	// 	cancel();
	// }
</script>

<svelte:head>
	<style>
	  	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

	  	* {
	  		padding: 0;
	  		margin: 0;
	  		font-family: 'Roboto', sans-serif;
	  	}

	  	body {
	  	  	background-color: #ffffff;
	  	  	color: #000000;
	  	  	scrollbar-width: none;
	  	}

	  	/* width */
	  	::-webkit-scrollbar {
	  		width: 0;
	  	}
	</style>
</svelte:head>

<div class="app">
	<div class="page">
		<header>
			<a href="/"><h1>mtl.deals</h1></a>
			<nav class="buttons">
				<div class="ul">
					{#if data.session}
					<!-- fix this -->
					<form action="/api/logout" method="POST">
						<a href="/create" data-sveltekit-prefetch>create</a>
						<a href="/item/1" data-sveltekit-prefetch>items</a>
						<a href="/settings" data-sveltekit-prefetch>Settings</a>
						<button>Logout</button>
					</form>
					{:else}
					<a href="/login" class="login" data-sveltekit-prefetch> Login </a>
					<a href="/register" data-sveltekit-prefetch> Register </a>
					{/if}
				</div>
			</nav>
		</header>
		<main>
			
			<slot></slot>
		</main>
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	main {
		flex: 1;
		display:flex;
		flex-direction: column;
	}
	header {
	  	position: sticky;
	  	top: 0;
	  	display: flex;
	  	padding: 0.5rem 2rem;
		height: 3.5rem;
	  	justify-content: space-between;
	  	align-items: center;
	  	background: #242729;
		box-shadow: rgba(25, 25, 25, 0.5) 0px 0px 5px;
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

	button {
		background-color: #4CAF50;
		border-style: none;
		border-radius: 5px;
		padding: 0.5rem 1rem;
	}

	button:hover {
		background-color: #78af79;
	}


	/* //disabled button class
	.disabled {
  		opacity: 0.6;
  		cursor: not-allowed;
	} */
</style>
