<script>
	export let data;
	// console.log(data)
    //https://codepen.io/AlaDyn172/pen/ZMeraJ
	import { PUBLIC_SERVER_URL } from '$env/static/public'

	import toast,{ Toaster } from 'svelte-french-toast';

	import { Shadow } from 'svelte-loading-spinners';

	import { navigating } from '$app/stores'
	import { loading } from '$lib/loading'

	$: $loading = !!$navigating

	import { invalidate } from "$app/navigation";
	import { supabaseClient } from "$lib/supabase";
	import { onMount } from 'svelte';

	import { io } from 'socket.io-client'
	
		
	let money = (data.money?.ltc/100000000)*data.ltcPrice
	
	$: money
	
	const formatter = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 2});

	onMount(() => {
		if (data.session) {
			
			const socket = io(`${PUBLIC_SERVER_URL}`)
		
			socket.on('conf', (body) => {
				if (body.conf == 0 && body.user_id == data.session.user.id) {
					toast(`${formatter.format((body.amount/100000000)*data.ltcPrice)} received, waiting for confirmation`, {
						icon: '💰',
					})
					console.log("0 conf hit client")
				} else if (body.conf == 1 && body.user_id == data.session.user.id){
					toast(`${formatter.format((body.amount/100000000)*data.ltcPrice)} was added to your balance`, {
						icon: '💰',
					})
					console.log("1 conf hit server")
					money += ((body.amount/100000000)*data.ltcPrice)
				}
			})

			socket.on('cob', (body) => {
				if (body.id.includes(data.session.user.id)) {
					if (body.id.indexOf(data.session.user.id) == 0){
						money -= Number(body.amount)
					} else {
						money += Number(body.amount)
					}
				}
			})
			
		}
		


		const subscribtion = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscribtion.unsubscribe();
		};
	});
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
    <title>mtl.deals - Best Online Marketplace in Montreal</title>
    <meta name="title" content="mtl.deals - Best Online Marketplace in Montreal" />
    <meta
      name="description"
      content="mtl.deals is an online marketplace where user in montreal can sell their items using crypto curencies."
    />
  
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://mtl.deals/" />
    <meta property="og:title" content="mtl.deals - Best Online Marketplace in Montreal" />
    <meta
      property="og:description"
      content="mtl.deals is an online marketplace where user in montreal can sell their items using crypto curencies."
    />
    <meta
      property="og:image"
      content="https://cdn.discordapp.com/attachments/828812665232425000/1099846968748015666/logo2.png"
    />
  
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://mtl.deals/" />
    <meta property="twitter:title" content="mtl.deals - Best Online Marketplace in Montreal" />
    <meta
      property="twitter:description"
      content="mtl.deals is an online marketplace where user in montreal can sell their items using crypto curencies"
    />
    <meta
      property="twitter:image"
      content="https://cdn.discordapp.com/attachments/828812665232425000/1099846968748015666/logo2.png"
    />
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

		@media screen and (max-width: 1045px) {
			html {
				font-size: 14px;
			}
		}
		@media screen and (max-width: 810px) {
			html {
				font-size: 12px;
			}
		}
		@media screen and (max-width: 629px) {
			html {
				font-size: 10px;
			}
		}
		@media screen and (max-width: 535px) {
			html {
				font-size: 8px;
			}
		}
	</style>
</svelte:head>

<div class="app">
	<Toaster></Toaster>
	<div class="page">
		<header>
			<a href="/"><img src="https://cdn.discordapp.com/attachments/828812665232425000/1099846968748015666/logo2.png" alt="" class="logo"></a>
			{#if data.session}
			<div class="right">
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="/settings/wallet" style="visibility: none; height: 100%; display: flex; align-items: center;">
					<div class="wallet">
						<div class="inside">
							<img src="https://cdn.discordapp.com/attachments/828812665232425000/1081777423135277136/image.png" alt="" class="walletIcon">
							<div class="cob">{formatter.format(money)}</div>
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
	.logo {
		height: 5rem;
	}
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
		min-width: 8rem;
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
		height: 3.125rem;
	}
	#aMenu {
		background-color: rgba(128, 128, 128, 0);
		padding: 0rem;
		margin-inline: 1rem;
		justify-self: right !important;
		transition: 0.1s;
	}
	#aMenu:active {
		transform: scale(0.9);
	}
</style>
