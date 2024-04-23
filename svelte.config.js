import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.argv.includes('dev');

const config = {
    kit: {
        appDir: 'app', // Required as the default is _app
        adapter: adapter()
    },
	paths: {
		base: dev ? '' : "/languagereading",
	},
    preprocess: vitePreprocess(),
};
export default config;
