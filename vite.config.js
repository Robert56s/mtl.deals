import { sveltekit } from '@sveltejs/kit/vite';
import { webSocketServer } from './src/lib/socketServer';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()]
};

export default config;
