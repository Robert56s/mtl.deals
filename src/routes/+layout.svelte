<script>
	export let data;
	// console.log(data)
    //https://codepen.io/AlaDyn172/pen/ZMeraJ

	import { Toaster } from 'svelte-french-toast';

	import { Shadow } from 'svelte-loading-spinners';

	import { navigating } from '$app/stores'
	import { loading } from '$lib/loading'

	$: $loading = !!$navigating

	import { invalidate } from "$app/navigation";
	import { supabaseClient } from "$lib/supabase";
	import { onMount } from 'svelte';

	import { io } from 'socket.io-client'

	const socket = io('http://localhost:8080')

	socket.on('eventFromServer', (message) => {
		console.log(message)
	})
  
	onMount(() => {

		const subscribtion = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscribtion.unsubscribe();
		};
	});

	const formatter = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 2});
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
	<Toaster></Toaster>
	<div class="page">
		<header>
			<a href="/"><h1>mtl.deals</h1></a>
			{#if data.session}
			<div class="right">
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="#" style="visibility: none; height: 100%; display: flex; align-items: center;">
					<div class="wallet">
						<div class="inside">
							<img src="https://cdn.discordapp.com/attachments/828812665232425000/1081777423135277136/image.png" alt="" class="walletIcon">
							<div class="cob">{formatter.format(data?.money.ltc)}</div>
						</div>
					</div>
				</a>
				
				<a href="/settings" id="aMenu">
					<img class="menu" src="https://cdn.discordapp.com/attachments/828812665232425000/1078114678368108604/Pngtreeuser_icon_4479727.png" alt="menuIcon">
				</a>

			</div>
			
			{:else}
			<nav class="buttons">
				<div class="ul">
					<a href="/login" class="login" data-sveltekit-prefetch>Login</a>
					<a href="/register" data-sveltekit-prefetch>Register</a>
				</div>
			</nav>
			{/if}
		</header>
		<main>
			{#if $loading}
				<div class="loading">
					<Shadow size="20" color="#000000" unit="px" duration="0.8s"/>
				</div>	
			{/if}
			<slot></slot>
		</main>
	</div>
</div>

<style>

	.right {
		display: flex;
		align-items: center;
	}

	.inside {
		flex: 1;
		display: flex;
		margin-inline: 0.5rem;
		align-items: center;
		justify-content: space-between;
	}

	.walletIcon {
		aspect-ratio: 1/1;
		height: 1.5rem;
		margin-right: 0.8rem;
	}

	.wallet {
		display: flex;
		width: 8rem;
		height: 2.5rem;
		background: rgb(42,111,150);
		background: radial-gradient(circle, rgba(42,111,150,1) 38%, rgba(0,73,116,1) 100%); 
		justify-self: center;
		border-radius: 0.3rem;
		border-style: solid;
		border-color: #004974;
		align-items: center;
	}
	.inside {
		display: flex;
	}

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
	  	background: rgba(0, 0, 0, 0.849);
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

	/* button {
		background-color: #4CAF50;
		border-style: none;
		border-radius: 5px;
		padding: 0.5rem 1rem;
	}

	button:hover {
		background-color: #78af79;
	} */


	/* //disabled button class
	.disabled {
  		opacity: 0.6;
  		cursor: not-allowed;
	} */

	.loading {
		position: fixed;
		bottom: 3rem;
		right: 3rem;
	}

	.menu {
		aspect-ratio: 1/1;
		height: 50px;
	}
	#aMenu {
		background-color: rgba(128, 128, 128, 0);
		padding: 0rem;
		margin-inline: 1rem;
		justify-self: right !important;
	}
</style>
